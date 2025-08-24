from typing import Dict, List, Optional
from pydantic import BaseModel, Field, create_model

class ExtractRequest(BaseModel):
    jobId: str
    text: List[str]
    fields: Dict[str, str]

def dynamic_answer_model(descriptions: Dict[str, str]):
    fields = {
        key: (Optional[str], Field(default=None, description=desc))
        for key, desc in descriptions.items()
    }
    return create_model("Extraction", **fields)