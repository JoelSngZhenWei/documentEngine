package com.joelsng.backend.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ocr_jobs")
public class OcrJob {
    @Id
    private String jobId;

    @Column(columnDefinition = "TEXT")
    private String status; //"done", "processing"

    @ElementCollection
    @CollectionTable(name = "ocr_job_pages", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "page_text", columnDefinition = "TEXT")
    private List<String> text;

    public OcrJob() {}

    public OcrJob(String jobId, String status, List<String> text) {
        this.jobId = jobId;
        this.status = status;
        this.text = text;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getText() {
        return text;
    }

    public void setText(List<String> text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        OcrJob ocrJob = (OcrJob) o;
        return Objects.equals(jobId, ocrJob.jobId) && Objects.equals(status, ocrJob.status) && Objects.equals(text, ocrJob.text);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobId, status, text);
    }
}
