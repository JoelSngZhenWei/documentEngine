package com.joelsng.backend.repository;

import com.joelsng.backend.models.ExtractionJob;
import com.joelsng.backend.models.OcrJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtractionJobRepository extends JpaRepository<ExtractionJob, String> {
}
