import os
from fastapi import APIRouter, File, Form, UploadFile, HTTPException
import tempfile

import requests
from app.services.pdf_service import read_pdf_markdown
from app.services.llm_service import get_llm, LLMNotConfigured
from app.models.schemas import ExtractRequest, dynamic_answer_model
from app.config.prompts import EXTRACTION_PROMPT

router = APIRouter()

@router.post("/document")
def read_document(file: UploadFile = File(...), jobId: str = Form(...)):
    contents = file.file.read()
    with tempfile.NamedTemporaryFile(delete=True, suffix=".pdf") as tmp:
        tmp.write(contents)
        tmp.flush()
        text_list = read_pdf_markdown(tmp.name)
        
    payload = {"jobId": jobId, "text": text_list}
    callback_url = os.getenv("SPRING_CALLBACK_URL_OCR", "http://backend:8080/api/ocr/processed")
    requests.post(callback_url, json = payload)
    return {"status":"received", "jobId":jobId}

@router.post("/extract")
def extract_information(req: ExtractRequest):
    AnswerModel = dynamic_answer_model(req.fields)
    try:
        llm = get_llm()
    except LLMNotConfigured as e:
        raise HTTPException(status_code=500, detail=str(e))

    structured_llm = llm.with_structured_output(schema=AnswerModel)
    prompt = EXTRACTION_PROMPT.invoke({"text": "\n".join(req.text)})
    response = structured_llm.invoke(prompt)
    payload = {
        "jobId": req.jobId,
        "extracted_info": response.model_dump()
    }
    print(payload)
    callback_url = os.getenv("SPRING_CALLBACK_URL_EXTRACT", "http://backend:8080/api/extraction/processed")
    requests.post(callback_url, json=payload)
    return {"status":"extracted", "jobId":req.jobId}