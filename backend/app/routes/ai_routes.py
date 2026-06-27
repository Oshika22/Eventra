from fastapi import APIRouter

from app.schemas.ai_schema import ChatRequest, ChatResponse, StartupEvaluationRequest, StartupEvaluationResponse
from app.services.ai.chatbot import chat
from app.services.ai.evaluator import evaluate_startup

router = APIRouter(prefix='/api', tags=['AI'])


@router.post('/chat', response_model=ChatResponse)
async def chat_route(payload: ChatRequest):
    return await chat(payload.question)


@router.post('/evaluate', response_model=StartupEvaluationResponse)
async def evaluate_route(payload: StartupEvaluationRequest):
    return await evaluate_startup(payload)
