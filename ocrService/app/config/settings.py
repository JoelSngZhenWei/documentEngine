from pathlib import Path
from functools import lru_cache
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    pdf_path: Path = Path("app/resources/resume.pdf")
    model_name: str = "gemini-2.5-flash"
    model_provider: str = "google_genai"
    google_api_key: Optional[str] = None
    storage_root: Path = Path("app/resources")
    class Config:
        env_file = ".env"
        env_prefix = ""

@lru_cache()
def get_settings() -> Settings:
    return Settings()
