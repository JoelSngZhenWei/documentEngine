package com.joelsng.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URI;
import java.nio.file.*;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path baseDir;
    private static final Set<String> ALLOWED_EXT =
            Set.of("pdf","doc","docx","xls","xlsx","png","jpg","jpeg");

    // constructor
    public FileStorageService(@Value("${app.upload.base-dir:uploads}") String baseDir) {
        this.baseDir = Paths.get(baseDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.baseDir);
        } catch (Exception e) {
            throw new RuntimeException("Could not create upload directory: " + this.baseDir, e);
        }
    }

    public StoredFile store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty.");
        }

        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "file" : file.getOriginalFilename());
        if (original.contains("..")) {
            throw new IllegalArgumentException("Invalid file name.");
        }

        // check extension
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0 && dot < original.length() - 1) {
            ext = original.substring(dot + 1).toLowerCase();
        }
        if (!ext.isEmpty() && !ALLOWED_EXT.contains(ext)) {
            throw new IllegalArgumentException("Unsupported file type: ." + ext);
        }

        String storedName = UUID.randomUUID().toString() + (ext.isEmpty() ? "" : "." + ext);
        Path target = baseDir.resolve(storedName);

        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file.", e);
        }

        long size;
        String sha256;
        try {
            size = Files.size(target);
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            try (InputStream fin = Files.newInputStream(target)) {
                byte[] buf = new byte[8192];
                int n;
                while ((n = fin.read(buf)) > 0) md.update(buf, 0, n);
            }
            sha256 = HexFormat.of().formatHex(md.digest());
        } catch (Exception e) {
            throw new RuntimeException("Failed to compute metadata.", e);
        }

        // Local absolute path you can pass to FastAPI
        String absolutePath = target.toString();
        return new StoredFile(original, storedName, absolutePath, size, sha256);
    }

    public record StoredFile(String originalName,
                             String storedName,
                             String absolutePath,
                             long sizeBytes,
                             String sha256) {}
}
