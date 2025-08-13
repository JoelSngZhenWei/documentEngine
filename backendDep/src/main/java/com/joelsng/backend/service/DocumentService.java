package com.joelsng.backend.service;

import com.joelsng.backend.entity.Document;
import com.joelsng.backend.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
//        map this to a class to return for security
    }

    public Document getDocumentById(long id){
        return documentRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Document with id " + id + " not found"));
    }

    public void insertDocument(Document document) {
        documentRepository.save(document);
    }
}