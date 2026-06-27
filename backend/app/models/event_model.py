from datetime import datetime, timezone
from bson import ObjectId


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def to_object_id(value: str) -> ObjectId:
    return ObjectId(value)


def serialize_event(document: dict) -> dict:
    if not document:
        return document

    document["id"] = str(document.pop("_id"))
    if isinstance(document.get("created_at"), datetime):
        document["created_at"] = document["created_at"].isoformat()
    if isinstance(document.get("updated_at"), datetime):
        document["updated_at"] = document["updated_at"].isoformat()
    return document

