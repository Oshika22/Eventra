from fastapi.concurrency import run_in_threadpool

from app.services.ai.rag.pipeline import build_rag_answer


async def chat(question: str) -> dict:
    return await run_in_threadpool(build_rag_answer, question)
