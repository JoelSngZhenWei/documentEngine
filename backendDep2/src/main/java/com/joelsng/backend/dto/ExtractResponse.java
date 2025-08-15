package com.joelsng.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.Map;
import java.util.Objects;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ExtractResponse {

    private String extractedText;
    private Map<String, String> extractedInfo;

    public ExtractResponse() {}

    public ExtractResponse(String extractedText, Map<String, String> extractedInfo) {
        this.extractedText = extractedText;
        this.extractedInfo = extractedInfo;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public Map<String, String> getExtractedInfo() {
        return extractedInfo;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }

    public void setExtractedInfo(Map<String, String> extractedInfo) {
        this.extractedInfo = extractedInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ExtractResponse that = (ExtractResponse) o;
        return Objects.equals(extractedText, that.extractedText) && Objects.equals(extractedInfo, that.extractedInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(extractedText, extractedInfo);
    }

}
