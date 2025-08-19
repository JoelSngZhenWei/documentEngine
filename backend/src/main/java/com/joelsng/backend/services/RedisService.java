package com.joelsng.backend.services;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisTestService {
    private final StringRedisTemplate redisTemplate;

    public RedisTestService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String testWrite() {
        redisTemplate.opsForValue().set("testKey", "helloRedis");
        return redisTemplate.opsForValue().get("testKey");
    }
}
