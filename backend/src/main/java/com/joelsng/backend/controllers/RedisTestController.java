package com.joelsng.backend.controllers;

import com.joelsng.backend.services.RedisTestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedisTestController {
    private final RedisTestService service;

    public RedisTestController(RedisTestService service) {
        this.service = service;
    }

    @GetMapping("/test-redis")
    public String testRedis() {
        return service.testWrite();
    }
}