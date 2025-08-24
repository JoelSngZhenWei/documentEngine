package com.joelsng.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joelsng.backend.models.ExtractionJob;
import com.joelsng.backend.models.OcrJob;
import com.joelsng.backend.payload.request.ExtractionRequest;
import com.joelsng.backend.repository.ExtractionJobRepository;
import com.joelsng.backend.repository.OcrJobRepository;
import com.joelsng.backend.services.RedisService;
import jakarta.annotation.security.PermitAll;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@PermitAll
@RequestMapping("api/extraction")
public class ExtractionController {
    private static final Logger log = LoggerFactory.getLogger(ExtractionController.class);
    private final OcrJobRepository ocrJobRepository;
    private final RedisService redisService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private ExtractionJobRepository extractionJobRepository;

    @Value("${ocrservice.extract.url}")
    private String ocrServiceExtractUrl;

    public ExtractionController(OcrJobRepository ocrJobRepository, RedisService redisService) {
        this.ocrJobRepository = ocrJobRepository;
        this.redisService = redisService;
    }

    @PostMapping(value = "/extract", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> extract(@RequestBody ExtractionRequest req) {
        if (req.getJobId() == null || req.getJobId().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "jobId is required");

        redisService.setExtractionProcessing(req.getJobId());

        OcrJob job = ocrJobRepository.findById(req.getJobId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "OCR job not found"));
        List<String> text = job.getText() == null ? List.of() : job.getText();

        // make payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("jobId", req.getJobId());
        payload.put("text", text);
        if (req.getFields() != null) {
            payload.put("fields", req.getFields());
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        restTemplate.postForEntity(ocrServiceExtractUrl, requestEntity, Void.class);

        return ResponseEntity.ok(Map.of("jobId", req.getJobId()));
    }

    @PostMapping("/processed")
    public ResponseEntity<?> extractionProcessed(@RequestBody Map<String, Object> payload) {
        String jobId = (String) payload.get("jobId");
        if (jobId == null || jobId.isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "jobId is required");

        @SuppressWarnings("unchecked")
        Map<String, Object> extractedInfo = (Map<String, Object>) payload.get("extracted_info");
        if (extractedInfo == null) extractedInfo = Map.of();

        redisService.setExtractionResult(jobId, extractedInfo);

        ExtractionJob job = extractionJobRepository.findById(jobId)
                .orElseGet(() -> { var j = new ExtractionJob(); j.setJobId(jobId); return j; });
        job.setJobId(jobId);
        job.setStatus((String) payload.get("status"));
        ObjectMapper mapper = new ObjectMapper();
        try {
            job.setOutput(mapper.writeValueAsString(extractedInfo)); // completely replaces prior output
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize extracted info for job {}", jobId, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        extractionJobRepository.save(job);

        System.out.println("Saved Extraction job " + jobId + " into db");

        return ResponseEntity.ok(Map.of("received", true));
    }

    @GetMapping("/status/{jobId}")
    public ResponseEntity<?> status(@PathVariable String jobId) {
        try {
            String json = redisService.getExtractionStatus(jobId);
            Map<String, Object> response = new ObjectMapper().readValue(json, new TypeReference<Map<String, Object>>() {
            });
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to parse status"));
        }
    }
}
