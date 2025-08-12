from functools import lru_cache
from docling.document_converter import DocumentConverter

@lru_cache
def get_converter() -> DocumentConverter:
    return DocumentConverter()

def read_pdf_markdown(pdf_path) -> str:
    doc = get_converter().convert(str(pdf_path)).document
    return doc.export_to_markdown()
