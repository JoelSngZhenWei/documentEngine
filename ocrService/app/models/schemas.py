from typing import Dict, Optional
from pydantic import BaseModel, Field, create_model

class ExtractRequest(BaseModel):
    pdf_path: str
    field_descriptions: Dict[str, str]

def dynamic_answer_model(descriptions: Dict[str, str]):
    fields = {
        key: (Optional[str], Field(default=None, description=desc))
        for key, desc in descriptions.items()
    }
    return create_model("Extraction", **fields)

class ConvertRequest(BaseModel):
    filename: str                # e.g. "resume" or "resume.pdf" (we'll sanitize)
    extension: str               # e.g. "pdf", "docx", "png"
    file_bytes_b64: str          # base64-encoded bytes
    overwrite: bool = False      # optional safety