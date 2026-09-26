from fastapi import APIRouter
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path
import os

# Load .env from backend folder
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-3.8-flash")
router = APIRouter(
    prefix="/ai",
    tags=["Eligify AI"]
)

SYSTEM_PROMPT = """
You are Eligify AI, an AI assistant for marginalized entrepreneurs.

Help entrepreneurs understand government schemes,
business opportunities, eligibility requirements,
documents and application guidance.

Be helpful, simple and clear.

Do not invent government schemes, eligibility rules,
benefits, documents, deadlines or application links.

When verified scheme data is not available,
clearly say that scheme-specific information needs
to be verified from official sources.
"""

@router.post("/chat")
def chat(message: str):
    try:
        prompt = f"{SYSTEM_PROMPT}\n\nUser: {message}"

        response = model.generate_content(prompt)

        return {
            "reply": response.text,
            "status": "success"
        }

    except Exception as error:
        return {
            "reply": f"AI ERROR: {str(error)}",
            "status": "error"
        }
