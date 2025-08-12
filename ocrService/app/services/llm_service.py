from functools import lru_cache
from langchain.chat_models import init_chat_model
import os

class LLMNotConfigured(RuntimeError):
    pass

@lru_cache
def get_llm():
    if not os.getenv("GOOGLE_API_KEY"):
        raise LLMNotConfigured("GOOGLE_API_KEY not set. Please add it to your .env file.")
    return init_chat_model("gemini-2.5-flash", model_provider="google_genai")
