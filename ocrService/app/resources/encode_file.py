import base64
from pathlib import Path

file_path = Path("resume.pdf")

with open(file_path, "rb") as f:
    file_bytes = f.read()

# Encode to base64 string
encoded_str = base64.b64encode(file_bytes).decode("utf-8")

print(encoded_str)
