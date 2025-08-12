import base64
import re
from pathlib import Path
from typing import Tuple
from app.config.settings import get_settings

_filename_safe = re.compile(r"[^A-Za-z0-9._-]+")

def _sanitize_name(name: str) -> str:
    name = name.strip()
    if not name:
        raise ValueError("filename cannot be empty")
    return _filename_safe.sub("_", name)

def _split_name_and_ext(filename: str) -> Tuple[str, str]:
    p = Path(filename)
    return p.stem, p.suffix.lstrip(".")

def save_b64_file(filename: str, extension: str, file_b64: str, overwrite: bool = False) -> Path:
    """
    Saves base64 bytes to storage_root/<sanitized_stem>/<sanitized_stem>.<extension>
    Returns the full path to the written file.
    """
    settings = get_settings()

    stem_in, ext_in = _split_name_and_ext(filename)
    stem = _sanitize_name(stem_in or filename)
    ext = (extension or ext_in).lstrip(".").lower()
    if not ext:
        raise ValueError("extension is required")

    # Directory is the sanitized stem (avoid traversal)
    dir_path = (settings.storage_root / stem).resolve()

    # Ensure dir_path stays under storage_root
    storage_root = settings.storage_root.resolve()
    if storage_root not in dir_path.parents and dir_path != storage_root:
        raise ValueError("invalid filename path")

    dir_path.mkdir(parents=True, exist_ok=True)

    target = dir_path / f"{stem}.{ext}"
    if target.exists() and not overwrite:
        raise FileExistsError(f"File already exists: {target}")

    try:
        raw = base64.b64decode(file_b64, validate=True)
    except Exception as e:
        raise ValueError(f"Invalid base64 content: {e}") from e

    # Atomic-ish write
    tmp = target.with_suffix(target.suffix + ".tmp")
    with open(tmp, "wb") as f:
        f.write(raw)
    tmp.replace(target)

    return target
