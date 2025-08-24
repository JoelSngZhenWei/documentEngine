package com.joelsng.backend.payload.request;

import java.util.Map;

public class ExtractionRequest {
    private String jobId;
    // pairsToObject() sends { [key]: string | string }
    private Map<String, String> fields;

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public Map<String, String> getFields() {
        return fields;
    }

    public void setFields(Map<String, String> fields) {
        this.fields = fields;
    }
}