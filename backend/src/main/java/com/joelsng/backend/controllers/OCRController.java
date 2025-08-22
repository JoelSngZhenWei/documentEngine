package com.joelsng.backend.controllers;

import com.joelsng.backend.services.RedisService;
import com.joelsng.backend.utils.MultipartInputStreamFileResource;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@PermitAll
@RequestMapping("api/documents/")
public class DocumentController {
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ocrservice.ocr.url}")
    private String ocrServiceOcrUrl;

    @Autowired
    private RedisService redisService;

    @PostMapping(
            path = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> uploadDocument(@RequestPart("file") MultipartFile file) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<List<String>> response =
                    restTemplate.exchange(
                            ocrServiceOcrUrl,
                            HttpMethod.POST,
                            requestEntity,
                            new ParameterizedTypeReference<List<String>>() {}
                    );
//                    restTemplate.postForEntity(ocrServiceOcrUrl, requestEntity, List.class);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

}
