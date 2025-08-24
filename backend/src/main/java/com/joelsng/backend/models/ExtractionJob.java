package com.joelsng.backend.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "extraction_jobs")
public class ExtractionJob {
    @Id
    private String jobId;

    @Column(columnDefinition = "TEXT")
    private String status; //"done", "processing"

    @Lob
    @Column(name = "output", columnDefinition = "TEXT")
    private String output;

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

    public String getOutput() {
        return output;
    }

    public void setOutput(String Output) {
        this.output = output;
    }

    public ExtractionJob(String jobId, String status, String output) {
        this.jobId = jobId;
        this.status = status;
        this.output = output;
    }

    public ExtractionJob() {
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ExtractionJob that = (ExtractionJob) o;
        return Objects.equals(jobId, that.jobId) && Objects.equals(status, that.status) && Objects.equals(output, that.output);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobId, status, output);
    }
}
