from fastapi import APIRouter, HTTPException
from app.models.schemas import ConvertRequest
from app.services.storage_service import save_b64_file

router = APIRouter(prefix="", tags=["convert"])

@router.post("/convert")
def convert(req: ConvertRequest):
    """
    Accepts JSON with base64 file bytes and writes it as <storage_root>/<filename>/<filename>.<ext>.
    """
    try:
        path = save_b64_file(
            filename=req.filename,
            extension=req.extension,
            file_b64=req.file_bytes_b64,
            overwrite=req.overwrite,
        )
    except FileExistsError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")

    return {
        "saved_path": str(path),
        "saved_dir": str(path.parent),
        "bytes_written": path.stat().st_size,
    }
