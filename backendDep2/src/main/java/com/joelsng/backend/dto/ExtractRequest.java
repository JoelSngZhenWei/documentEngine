package com.joelsng.backend.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.Map;
import java.util.Objects;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ExtractRequest {
    private String pdfPath;
    private Map<String, String> fieldDescriptions;

    public String getPdfPath() {
        return pdfPath;
    }

    public void setPdfPath(String pdfPath) {
        this.pdfPath = pdfPath;
    }

    public Map<String, String> getFieldDescriptions() {
        return fieldDescriptions;
    }

    public void setFieldDescriptions(Map<String, String> fieldDescriptions) {
        this.fieldDescriptions = fieldDescriptions;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ExtractRequest that = (ExtractRequest) o;
        return Objects.equals(pdfPath, that.pdfPath) && Objects.equals(fieldDescriptions, that.fieldDescriptions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pdfPath, fieldDescriptions);
    }
}
