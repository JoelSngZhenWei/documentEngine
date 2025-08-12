from fastapi import APIRouter, HTTPException
from app.services.pdf_service import read_pdf_markdown
from app.services.llm_service import get_llm, LLMNotConfigured
from app.models.schemas import ExtractRequest, dynamic_answer_model
from app.config.prompts import EXTRACTION_PROMPT

router = APIRouter()

@router.post("/document")
def read_document():
    return {"content": read_pdf_markdown()}

@router.post("/extract")
def extract_information(req: ExtractRequest):
    pdf_text = read_pdf_markdown(req.pdf_path)
    AnswerModel = dynamic_answer_model(req.field_descriptions)

    try:
        llm = get_llm()
    except LLMNotConfigured as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=str(e))

    structured_llm = llm.with_structured_output(schema=AnswerModel)
    prompt = EXTRACTION_PROMPT.invoke({"text": pdf_text})
    response = structured_llm.invoke(prompt)
    output = {
        "extracted_text": pdf_text,
        "extracted_info": response.model_dump()
    }
    return output