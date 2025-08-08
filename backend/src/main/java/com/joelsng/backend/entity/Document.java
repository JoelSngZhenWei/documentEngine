package com.joelsng.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Document {

    @Id
    private long id;
    private String fileName;
    private String extension;
    private long size;

    public Document() {

    }

    public Document(long id, String fileName, String extension, long size) {
        this.id = id;
        this.fileName = fileName;
        this.extension = extension;
        this.size = size;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Document document = (Document) o;
        return id == document.id && size == document.size && Objects.equals(fileName, document.fileName) && Objects.equals(extension, document.extension);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fileName, extension, size);
    }


}
