package com.joelsng.backend.dto;

import java.util.Map;
import java.util.Objects;

public class ExtractRequest {
    private String pdf_path;
    private Map<String, String> field_descriptions;

    public ExtractRequest(String pdf_path, Map<String, String> field_descriptions) {
        this.pdf_path = pdf_path;
        this.field_descriptions = field_descriptions;
    }

    public String getPdf_path() {
        return pdf_path;
    }

    public void setPdf_path(String pdf_path) {
        this.pdf_path = pdf_path;
    }

    public Map<String, String> getField_descriptions() {
        return field_descriptions;
    }

    public void setField_descriptions(Map<String, String> field_descriptions) {
        this.field_descriptions = field_descriptions;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ExtractRequest that = (ExtractRequest) o;
        return Objects.equals(pdf_path, that.pdf_path) && Objects.equals(field_descriptions, that.field_descriptions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pdf_path, field_descriptions);
    }
}
