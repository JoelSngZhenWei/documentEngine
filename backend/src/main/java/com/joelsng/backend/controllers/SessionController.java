package com.joelsng.backend.controllers;

import com.joelsng.backend.payload.response.JwtResponse;
import com.joelsng.backend.services.RedisService;
import com.joelsng.backend.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    private final RedisService redisService;

    public SessionController(RedisService redisService) {
        this.redisService = redisService;
    }

    @GetMapping("/me")
    public ResponseEntity<JwtResponse> getCurrentUser(
            @CookieValue("token") String token) {

        JwtResponse session = redisService.getSession(token);

        return session != null
                ? ResponseEntity.ok(session)
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{token}")
    public ResponseEntity<JwtResponse> getSession(@PathVariable String token) {
        JwtResponse session = redisService.getSession(token);
        return session != null ? ResponseEntity.ok(session) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{token}")
    public ResponseEntity<Void> deleteSession(@PathVariable String token) {
        redisService.deleteSession(token);
        return ResponseEntity.noContent().build();
    }
}
