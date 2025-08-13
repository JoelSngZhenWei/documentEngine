package com.joelsng.backend.controller;

import com.joelsng.backend.entity.Document;
import com.joelsng.backend.service.DocumentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/document")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getSoftwareEngineers() {
        return documentService.getAllDocuments();
    }

    @GetMapping("{id}")
    public Document getDocumentById(@PathVariable long id) {
        return documentService.getDocumentById(id);
    }

    @PostMapping
    public void addDocument(@RequestBody Document document) {
        documentService.insertDocument(document);
    }
}
