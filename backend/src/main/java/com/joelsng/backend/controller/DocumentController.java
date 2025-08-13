package com.joelsng.backend.controller;

import com.joelsng.backend.dto.ExtractRequest;
import com.joelsng.backend.service.FileStorageService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequestMapping("api/v1/document")
public class DocumentController {
    private final RestTemplate restTemplate;
    private final FileStorageService storage;

    public DocumentController(RestTemplate restTemplate, FileStorageService storage) {
        this.restTemplate = restTemplate;
        this.storage = storage;
    }

    @PostMapping("/ocrService")
    public ResponseEntity<String> extract(@RequestBody ExtractRequest request) {
        String fastApiUrl = "http://localhost:8000/extract";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ExtractRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                fastApiUrl,
                HttpMethod.POST,
                entity,
                String.class
        );
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> upload(@RequestPart("file") MultipartFile file) {
        FileStorageService.StoredFile saved = storage.store(file);
        UploadResponse body = new UploadResponse(
                saved.originalName(),
                saved.storedName(),
                saved.absolutePath(),
                saved.sizeBytes(),
                saved.sha256()
        );
        return ResponseEntity
                .created(URI.create("/api/v1/document/files/" + saved.storedName()))
                .body(body);
    }

    public record UploadResponse(String originalName,
                                 String storedName,
                                 String absolutePath,
                                 long sizeBytes,
                                 String sha256) {}
}
