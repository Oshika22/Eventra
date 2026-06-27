from datetime import datetime, timezone

from fastapi import HTTPException, UploadFile, status

from app.core.database import get_events_collection
from app.models.event_model import serialize_event, to_object_id
from app.schemas.event_schema import EventCreate, EventUpdate, ParticipantCreate
from app.utils.excel_parser import FileValidationError, parse_participants_file


def _collection():
    return get_events_collection()


async def create_event(payload: EventCreate) -> dict:
    now = datetime.now(timezone.utc)
    document = payload.model_dump()
    document["participants"] = []
    document["created_at"] = now
    document["updated_at"] = now
    result = await _collection().insert_one(document)
    created = await _collection().find_one({"_id": result.inserted_id})
    return serialize_event(created)


async def list_events() -> list[dict]:
    events = []
    cursor = _collection().find().sort("created_at", -1)
    async for document in cursor:
        events.append(serialize_event(document))
    return events


async def get_event(event_id: str) -> dict:
    try:
        document = await _collection().find_one({"_id": to_object_id(event_id)})
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid event id") from exc

    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return serialize_event(document)


async def update_event(event_id: str, payload: EventUpdate) -> dict:
    try:
        event_object_id = to_object_id(event_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid event id") from exc

    data = {key: value for key, value in payload.model_dump().items() if value is not None}
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided for update")

    data["updated_at"] = datetime.now(timezone.utc)

    result = await _collection().update_one({"_id": event_object_id}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    updated = await _collection().find_one({"_id": event_object_id})
    return serialize_event(updated)


async def delete_event(event_id: str) -> None:
    try:
        result = await _collection().delete_one({"_id": to_object_id(event_id)})
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid event id") from exc

    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")


async def upload_participants(event_id: str, file: UploadFile) -> dict:
    try:
        event_object_id = to_object_id(event_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid event id") from exc

    existing_event = await _collection().find_one({"_id": event_object_id})
    if not existing_event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    validate_file = file.filename or ""
    try:
        content = await file.read()
        participants: list[ParticipantCreate] = parse_participants_file(validate_file, content)
    except FileValidationError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unable to parse participants file") from exc

    if not participants:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No valid participant rows found")

    participant_docs = [participant.model_dump() for participant in participants]
    await _collection().update_one(
        {"_id": event_object_id},
        {
            "$set": {"updated_at": datetime.now(timezone.utc)},
            "$push": {"participants": {"$each": participant_docs}},
        },
    )

    updated = await _collection().find_one({"_id": event_object_id})
    return {
        "message": "Participants uploaded successfully",
        "participants_count": len(updated.get("participants", [])) if updated else len(participant_docs),
        "event": serialize_event(updated),
    }
