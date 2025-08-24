package com.joelsng.backend.repository;

import com.joelsng.backend.models.OcrJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OcrJobRepository extends JpaRepository<OcrJob, String> {
}
