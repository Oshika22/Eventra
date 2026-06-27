from datetime import datetime
from pydantic import BaseModel, Field


class ParticipantBase(BaseModel):
    name: str
    email: str
    college: str
    category: str
    status: str


class ParticipantCreate(ParticipantBase):
    pass


class EventBase(BaseModel):
    title: str = Field(min_length=1)
    description: str | None = None
    date: str = Field(min_length=1)
    time: str = Field(min_length=1)
    category: str = Field(min_length=1)
    organizer: str = Field(min_length=1)
    venue: str = Field(min_length=1)
    mode: str = Field(min_length=1)
    status: str = Field(min_length=1)


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    date: str | None = None
    time: str | None = None
    category: str | None = None
    organizer: str | None = None
    venue: str | None = None
    mode: str | None = None
    status: str | None = None


class EventInDB(EventBase):
    id: str
    participants: list[ParticipantBase] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime | None = None


class EventResponse(BaseModel):
    id: str
    title: str
    description: str | None = None
    date: str
    time: str
    category: str
    organizer: str
    venue: str
    mode: str
    status: str
    participants: list[ParticipantBase] = Field(default_factory=list)
    created_at: str
    updated_at: str | None = None


class MessageResponse(BaseModel):
    message: str

