from functools import lru_cache
from docling.document_converter import DocumentConverter
from app.config.settings import get_settings

@lru_cache
def get_converter() -> DocumentConverter:
    return DocumentConverter()

def read_pdf_markdown() -> str:
    settings = get_settings()
    doc = get_converter().convert(str(settings.pdf_path)).document
    return doc.export_to_markdown()
