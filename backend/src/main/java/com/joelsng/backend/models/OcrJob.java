package com.joelsng.backend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    private String fileName;

    private String filePath;

    private String dateTime;

    private Long userId;

    public OcrJob() {}

    public Long getUserId() {
        return userId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        OcrJob ocrJob = (OcrJob) o;
        return Objects.equals(jobId, ocrJob.jobId) && Objects.equals(status, ocrJob.status) && Objects.equals(text, ocrJob.text) && Objects.equals(fileName, ocrJob.fileName) && Objects.equals(filePath, ocrJob.filePath) && Objects.equals(dateTime, ocrJob.dateTime) && Objects.equals(userId, ocrJob.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobId, status, text, fileName, filePath, dateTime, userId);
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public OcrJob(String jobId, String status, List<String> text) {
        this.jobId = jobId;
        this.status = status;
        this.text = text;
        this.fileName = fileName;
        this.filePath = filePath;
        this.dateTime = dateTime;
    }

    public String getJobId() {
        return jobId;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getStatus() {
        return status;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public OcrJob(String jobId, String status, List<String> text, String fileName, String filePath, String dateTime, Long userId) {
        this.jobId = jobId;
        this.status = status;
        this.text = text;
        this.fileName = fileName;
        this.filePath = filePath;
        this.dateTime = dateTime;
        this.userId = userId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

}
