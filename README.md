# Info Miner – Document OCR & Extraction

A full-stack document processing tool that lets you:
- Upload PDFs
- Run OCR for text extraction
- Extract structured information based on custom fields

Built with:
- **Frontend**: Next.js + shadcn/ui  
- **Backend**: Spring Boot + PostgreSQL + Redis  
- **OCR Service**: FastAPI + Docling  
- **Deployment**: Docker Compose  

---

## 🚀 Getting Started

### 1. Environment Variables
This project uses **three separate env configs**:  

#### Frontend (`frontend/.env`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

NEXT_PUBLIC_BACKEND_LOGIN=/api/auth/signin
NEXT_PUBLIC_BACKEND_SIGNUP=/api/auth/signup
NEXT_PUBLIC_BACKEND_LOGOUT=/api/auth/logout
NEXT_PUBLIC_BACKEND_ME=/api/session/me

NEXT_PUBLIC_BACKEND_OCR=/api/ocr/upload
NEXT_PUBLIC_BACKEND_STATUS=/api/ocr/status

NEXT_PUBLIC_BACKEND_EXTRACTION=/api/extraction/extract
NEXT_PUBLIC_BACKEND_STATUS_EXTRACTION=/api/extraction/status
````

#### OCR Service (`ocrService/.env`)

```env
GOOGLE_API_KEY=your_google_api_key_here
SPRING_CALLBACK_URL_OCR=http://backend:8080/api/ocr/processed
SPRING_CALLBACK_URL_EXTRACT=http://backend:8080/api/extraction/processed
```

#### Backend (`backend/src/main/resources/application.properties`)

```properties
spring.application.name=backend

spring.datasource.url=jdbc:postgresql://postgres:5432/testdb
spring.datasource.username=joelsng
spring.datasource.password=password

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true

spring.data.redis.host=redis
spring.data.redis.port=6379

backend.app.jwtSecret========================JoelSng=Spring===========================
backend.app.jwtExpirationMs=86400000

ocrservice.ocr.url=http://ocr-service:8000/document
ocrservice.extract.url=http://ocr-service:8000/extract

logging.level.org.springframework.security=DEBUG
logging.level.com.joelsng.backend.jwt=DEBUG
```

---

### 2. Start with Docker Compose

From the root of the project:

```bash
docker compose up --build
```

This will start:

* **frontend** → Next.js app (port 3000)
* **backend** → Spring Boot API (port 8080)
* **ocr-service** → FastAPI OCR/Extraction (port 8000)
* **postgres** → Database (port 5432)
* **redis** → Cache/session store (port 6379)

---

### 3. Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Upload a PDF** → runs OCR through the OCR Service.
3. **Preview text** → view OCR output page by page.
4. **Extract fields** → define custom key-value fields, submit to backend, view structured results.

---

## 🛠 Development Notes

* **Frontend** communicates with backend using relative API paths defined in `.env`.
* **Backend** talks to **OCR Service** inside the Docker network (`http://ocr-service:8000/...`).
* **OCR Service** calls back into backend at the URLs defined in `SPRING_CALLBACK_URL_OCR` and `SPRING_CALLBACK_URL_EXTRACT`.
* PostgreSQL & Redis are networked services in the same Docker Compose stack.

## 📄 License

MIT – free to use and modify, attribution appreciated.