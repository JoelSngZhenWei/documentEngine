package com.joelsng.backend.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joelsng.backend.models.OcrJob;
import com.joelsng.backend.repository.OcrJobRepository;
import com.joelsng.backend.services.RedisService;
import com.joelsng.backend.services.UserDetailsImpl;
import com.joelsng.backend.utils.MultipartInputStreamFileResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/ocr/")
public class OCRController {
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ocrservice.ocr.url}")
    private String ocrServiceOcrUrl;

    @Autowired
    private RedisService redisService;

    @Autowired
    private OcrJobRepository ocrJobRepository;

    @PostMapping(
            path = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> uploadDocument(@RequestPart("file") MultipartFile file) {
        try {
            String jobId = UUID.randomUUID().toString();
            redisService.setOcrProcessing(jobId);

            Path tempDir = Paths.get("/ocr_upload");
            Files.createDirectories(tempDir);
            Path filePath = tempDir.resolve(jobId + "_" + file.getOriginalFilename());
            file.transferTo(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
            body.add("fileName", file.getOriginalFilename());
            body.add("filePath", filePath.toString());
            body.add("jobId", jobId);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            restTemplate.postForEntity(ocrServiceOcrUrl, requestEntity, Void.class);

            return ResponseEntity.ok(Map.of("jobId", jobId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/processed")
    public ResponseEntity<?> ocrProcessed(@RequestBody Map<String, Object> payload, Authentication authentication) {
        String jobId = (String) payload.get("jobId");

        @SuppressWarnings("unchecked")
        List<String> text = (List<String>) payload.get("text");

        String fileName = (String) payload.get("fileName");

        String filePath = (String) payload.get("filePath");

        redisService.setOcrResult(jobId, text);

        OcrJob job = new OcrJob();
        job.setJobId(jobId);
        job.setStatus((String) payload.get("status"));
        job.setText(text);
        job.setFileName(fileName);
        job.setFilePath(filePath);

        String now = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        job.setDateTime(now);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        job.setUserId(userDetails.getId());

        ocrJobRepository.save(job);
        System.out.println("Saved OCR job " + jobId + " (" + fileName + ") into db");

        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{jobId}")
    public ResponseEntity<?> status(@PathVariable String jobId) {
        try {
            String json = redisService.getOcrStatus(jobId);
            Map<String, Object> response = new ObjectMapper().readValue(
                    json, new TypeReference<Map<String, Object>>() {
                    }
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to parse status"));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> history() {
        try {
            List<OcrJob> jobs = ocrJobRepository.findAll(Sort.by(Sort.Direction.DESC, "dateTime"));
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    @DeleteMapping("/history/clear")
    public ResponseEntity<?> clearHistory() {
        try {
            // 1. Delete all DB entries (this also clears ocr_job_pages)
            ocrJobRepository.deleteAll();

            // 2. Delete all files from /ocr_upload
            Path uploadDir = Paths.get("/ocr_upload");
            if (Files.exists(uploadDir)) {
                try (var stream = Files.newDirectoryStream(uploadDir)) {
                    for (Path file : stream) {
                        Files.deleteIfExists(file);
                    }
                }
            }

            return ResponseEntity.ok(Map.of("status", "History cleared successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to clear history: " + e.getMessage()));
        }
    }

    @GetMapping("/file/{jobId}")
    public ResponseEntity<?> downloadFile(@PathVariable String jobId) {
        OcrJob job = ocrJobRepository.findById(jobId).orElseThrow();
        Path path = Paths.get(job.getFilePath());

        if (!Files.exists(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "File not found on server"));
        }

        FileSystemResource resource = new FileSystemResource(path.toFile());

        String mimeType;
        try {
            mimeType = Files.probeContentType(path);
        } catch (Exception e) {
            mimeType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + job.getFileName() + "\"")
                .body(resource);
    }


}
