from io import BytesIO
from pathlib import Path

import pandas as pd

from app.schemas.event_schema import ParticipantCreate


ALLOWED_EXTENSIONS = {".xlsx", ".xls", ".csv"}


class FileValidationError(ValueError):
    pass


def validate_file_extension(filename: str) -> None:
    suffix = Path(filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise FileValidationError("Only .xlsx, .xls, and .csv files are supported")


def parse_participants_file(filename: str, content: bytes) -> list[ParticipantCreate]:
    validate_file_extension(filename)
    suffix = Path(filename).suffix.lower()

    if suffix == ".csv":
        frame = pd.read_csv(BytesIO(content))
    else:
        frame = pd.read_excel(BytesIO(content))

    expected_columns = ["name", "email", "college", "category", "status"]
    normalized_columns = {str(column).strip().lower(): column for column in frame.columns}

    missing = [column for column in expected_columns if column not in normalized_columns]
    if missing:
        raise FileValidationError(f"Missing required columns: {', '.join(missing)}")

    participants: list[ParticipantCreate] = []
    for _, row in frame.iterrows():
        participant_data = {
            column: str(row[normalized_columns[column]]).strip()
            for column in expected_columns
        }
        if any(value == "" or value.lower() == "nan" for value in participant_data.values()):
            continue
        participants.append(ParticipantCreate(**participant_data))

    return participants

