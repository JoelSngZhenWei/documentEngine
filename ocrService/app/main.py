from dotenv import load_dotenv
from fastapi import FastAPI
from app.routers.document import router as document_router
from app.routers.convert import router as convert_router

load_dotenv()

app = FastAPI(title="Document Extraction API")
app.include_router(document_router)
app.include_router(convert_router)

@app.get("/health")
def health():
    return {"status": "ok"}
