from fastapi import APIRouter, File, UploadFile, status

from app.schemas.event_schema import EventCreate, EventResponse, EventUpdate, MessageResponse
from app.services.event_service import create_event, delete_event, get_event, list_events, update_event, upload_participants

router = APIRouter(prefix="/api/events", tags=["Events"])


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event_route(payload: EventCreate):
    return await create_event(payload)


@router.get("", response_model=list[EventResponse])
async def list_events_route():
    return await list_events()


@router.get("/{event_id}", response_model=EventResponse)
async def get_event_route(event_id: str):
    return await get_event(event_id)


@router.put("/{event_id}", response_model=EventResponse)
async def update_event_route(event_id: str, payload: EventUpdate):
    return await update_event(event_id, payload)


@router.delete("/{event_id}", response_model=MessageResponse)
async def delete_event_route(event_id: str):
    await delete_event(event_id)
    return {"message": "Event deleted successfully"}


@router.post("/{event_id}/participants/upload")
async def upload_participants_route(event_id: str, file: UploadFile = File(...)):
    return await upload_participants(event_id, file)

