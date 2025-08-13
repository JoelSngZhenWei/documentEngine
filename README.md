# documentEngine

```mermaid
flowchart LR
  subgraph FE[React Frontend]
    U[User]
  end

  subgraph GW[Spring Boot Gateway]
    C1[DocumentController\n/api/v1/document/upload]
    C2[DocumentController\n/api/v1/document/ocrService]
    Svc[FileStorageService\n(@Service)]
    RL[Rate Limiter / Idempotency\n(optional, Redis-backed)]
    Cache[Result Cache\n(optional, Redis)]
  end

  subgraph ST[Local Storage]
    Disk[(uploads/ ...)]
  end

  subgraph RS[Redis]
    RCache[[cache: extract result]]
    RIdem[[idemp: de-dup keys]]
    RJobs[[jobs: status/progress/result]]
    RRate[[rate: tokens]]
  end

  subgraph PY[FastAPI OCR/Extraction Service]
    FAPI[/POST /extract/]
    Q[Enqueue job (optional)\nCelery/RQ → Redis]
    W[Worker(s)\nOCR + LLM Extraction]
  end

  U -->|select file| C1
  C1 -->|Multipart upload| Svc
  Svc -->|save| Disk
  C1 -->|JSON: absolutePath + metadata| U

  U -->|POST JSON (pdf_path, fields)| C2
  C2 --> RL
  C2 --> Cache
  Cache -->|miss| FAPI
  Cache -->|hit| U

  FAPI -->|sync extract| C2
  C2 -->|return result| U
  C2 -->|write| RS
  RS <--> Cache
  RS <--> RL

  %% Optional async path
  C2 -.->|/extract/async| FAPI
  FAPI -.-> Q
  Q -.-> RJobs
  W -.->|process & update| RJobs
  U -.->|poll /jobs/{id}| C2
  C2 -.->|read status/result| RJobs
  C2 -.->|return status/result| U
```