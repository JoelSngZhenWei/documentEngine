from functools import lru_cache
from docling.document_converter import DocumentConverter

@lru_cache
def get_converter() -> DocumentConverter:
    return DocumentConverter()

def read_pdf_markdown(pdf_path) -> str:
    doc = get_converter().convert(str(pdf_path)).document
    pages_markdown = []
    for p in range(1,len(doc.pages)+1):
        md = doc.export_to_markdown(page_no = p)
        pages_markdown.append(md)
    return pages_markdown
