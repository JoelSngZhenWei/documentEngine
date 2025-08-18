package com.joelsng.backend.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
        throws IOException, ServletException {
        logger.error("Unauthorised error: {}", authException.getMessage());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String body = """
            {"timestamp":"%s","status":401,"error":"Unauthorized",
             "message":"%s","path":"%s"}
            """.formatted(java.time.Instant.now(),
                    safe(authException.getMessage()),
                    request.getRequestURI());

            response.getWriter().write(body);
            response.getWriter().flush();
        }

    private String safe(String s) {
        return s == null ? "" : s.replace("\"","\\\"");
    }
}
