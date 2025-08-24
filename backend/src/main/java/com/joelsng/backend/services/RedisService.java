package com.joelsng.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joelsng.backend.payload.response.JwtResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${backend.app.jwtExpirationMs}")
    private long jwtExpirationMs;

    public RedisService(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    // Session Management

    public void saveSession(JwtResponse jwtResponse) {
        try {
            String sessionJson = objectMapper.writeValueAsString(jwtResponse);

            redisTemplate.opsForValue().set(
                    jwtResponse.getToken(),
                    sessionJson,
                    jwtExpirationMs,
                    TimeUnit.MILLISECONDS
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public JwtResponse getSession(String token) {
        try {
            String sessionJson = redisTemplate.opsForValue().get(token);
            return sessionJson != null
                    ? objectMapper.readValue(sessionJson, JwtResponse.class)
                    : null;
        } catch (Exception e) {
            throw new RuntimeException("Error reading session from Redis", e);
        }
    }

    public void deleteSession(String token) {
        try {
            redisTemplate.delete(token);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting session from Redis", e);
        }
    }

    // OCR Jobs
    public void setOcrProcessing(String jobId) {
        redisTemplate.opsForValue().set("ocr:job:" + jobId, "{\"status\":\"processing\"}", 10, TimeUnit.MINUTES);
    }

    public void setOcrResult(String jobId, List<String> text) {
        try {
            String json = objectMapper.writeValueAsString(
                    Map.of("status", "done", "text", text)
            );
            redisTemplate.opsForValue().set("ocr:job:" + jobId, json, 1, TimeUnit.HOURS);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getOcrStatus(String jobId) {
        String result = redisTemplate.opsForValue().get("ocr:job:" + jobId);
        if (result == null) {
            return "{\"status\":\"not_found\"}";
        }
        return result;
    }


    // Extraction Jobs
    public void setExtractionProcessing(String jobId) {
        redisTemplate.opsForValue().set(
                "extract:job:" + jobId,
                "{\"status\":\"processing\"}",
                10, TimeUnit.MINUTES
        );
    }

    public void setExtractionResult(String jobId, Map<String, Object> extractedInfo) {
        try {
            if (extractedInfo == null) extractedInfo = Map.of();
            String json = objectMapper.writeValueAsString(
                    Map.of("status", "done", "extracted_info", extractedInfo)
            );
            redisTemplate.opsForValue().set(
                    "extract:job:" + jobId,
                    json,
                    1, TimeUnit.HOURS
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getExtractionStatus(String jobId) {
        String result = redisTemplate.opsForValue().get("extract:job:" + jobId);
        if (result == null) {
            return "{\"status\":\"not_found\"}";
        }
        return result;
    }
}
