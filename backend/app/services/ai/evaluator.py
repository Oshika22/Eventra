import json
import re

from fastapi import HTTPException, status
from fastapi.concurrency import run_in_threadpool
from langchain_core.prompts import ChatPromptTemplate

from app.schemas.ai_schema import StartupEvaluationRequest
from app.services.ai.llm import get_chat_response
from app.services.ai.rag.retriever import retrieve_documents


EVALUATION_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'You are an AIC startup evaluator. Use the retrieved AIC criteria context and the startup details to generate a JSON-only evaluation. '
            'Return valid JSON with this exact shape: '
            '{"score":0-100,"innovation_score":"string","market_score":"string","aic_fit":"string","strengths":["..."],"risks":["..."],"recommendations":["..."]}. '
            'Be specific, honest, and conservative. If evidence is weak, say so in the scores and recommendations.',
        ),
        (
            'human',
            'Startup details:\n'
            'Name: {startup_name}\n'
            'Problem: {problem}\n'
            'Solution: {solution}\n'
            'Market: {market}\n'
            'Team: {team}\n'
            'Stage: {stage}\n\n'
            'Retrieved AIC criteria context:\n{context}',
        ),
    ]
)


def _format_context(documents) -> str:
    if not documents:
        return 'No criteria context was retrieved.'

    sections: list[str] = []
    for index, document in enumerate(documents, start=1):
        source = document.metadata.get('source', 'unknown')
        title = document.metadata.get('title', source)
        sections.append(f'[{index}] Source: {source} | Title: {title}\n{document.page_content}')
    return '\n\n'.join(sections)


def _normalize_list(value) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if value in (None, ''):
        return []
    return [str(value).strip()]


def _clean_json_payload(raw_text: str) -> dict:
    text = raw_text.strip()
    if text.startswith('```'):
        text = re.sub(r'^```(?:json)?\s*', '', text, flags=re.IGNORECASE)
        text = re.sub(r'\s*```$', '', text)

    parsed = json.loads(text)

    parsed.setdefault('score', 0)
    parsed.setdefault('innovation_score', '')
    parsed.setdefault('market_score', '')
    parsed.setdefault('aic_fit', '')
    parsed.setdefault('strengths', [])
    parsed.setdefault('risks', [])
    parsed.setdefault('recommendations', [])

    try:
        parsed['score'] = max(0, min(100, int(parsed['score'])))
    except Exception:
        parsed['score'] = 0

    parsed['innovation_score'] = str(parsed['innovation_score']).strip()
    parsed['market_score'] = str(parsed['market_score']).strip()
    parsed['aic_fit'] = str(parsed['aic_fit']).strip()
    parsed['strengths'] = _normalize_list(parsed['strengths'])
    parsed['risks'] = _normalize_list(parsed['risks'])
    parsed['recommendations'] = _normalize_list(parsed['recommendations'])
    return parsed


def _to_ollama_messages(prompt_messages) -> list[dict[str, str]]:
    role_map = {'system': 'system', 'human': 'user', 'ai': 'assistant'}
    messages: list[dict[str, str]] = []
    for message in prompt_messages:
        role = role_map.get(getattr(message, 'type', 'user'), 'user')
        messages.append({'role': role, 'content': message.content})
    return messages


def _evaluate_sync(payload: StartupEvaluationRequest) -> dict:
    query = ' '.join(
        part
        for part in [
            payload.startup_name,
            payload.problem,
            payload.solution,
            payload.market,
            payload.team,
            payload.stage,
        ]
        if part
    )
    documents = retrieve_documents(query or 'AIC startup evaluation criteria')
    prompt_messages = EVALUATION_PROMPT.format_messages(
        **payload.model_dump(),
        context=_format_context(documents),
    )
    raw_response = get_chat_response(_to_ollama_messages(prompt_messages))

    try:
        evaluation = _clean_json_payload(raw_response)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail='Unable to parse evaluation response from the LLM',
        ) from exc

    return evaluation


async def evaluate_startup(payload: StartupEvaluationRequest) -> dict:
    return await run_in_threadpool(_evaluate_sync, payload)
