from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(min_length=1)


class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = Field(default_factory=list)


class StartupEvaluationRequest(BaseModel):
    startup_name: str = ''
    problem: str = ''
    solution: str = ''
    market: str = ''
    team: str = ''
    stage: str = ''


class StartupEvaluationResponse(BaseModel):
    score: int = Field(ge=0, le=100)
    innovation_score: str
    market_score: str
    aic_fit: str
    strengths: list[str] = Field(default_factory=list)
    risks: list[str] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
