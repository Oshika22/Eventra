"""
LLM service layer.
Uses OpenRouter for generation.
"""

from __future__ import annotations

import json
from urllib import request, error

from app.core.config import get_settings


class LLMError(RuntimeError):
    pass


def openrouter_chat(
    messages: list[dict[str, str]]
) -> str:

    settings = get_settings()

    url = "https://openrouter.ai/api/v1/chat/completions"

    payload = {
        "model": settings["llm_model"],
        "messages": messages,
        "temperature": 0.2,
    }

    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings['openrouter_api_key']}",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=120) as response:
            data = json.loads(
                response.read().decode("utf-8")
            )

        return data["choices"][0]["message"]["content"]

    except error.HTTPError as exc:
        raise LLMError(
            f"OpenRouter API error: {exc.code} {exc.reason}"
        ) from exc

    except Exception as exc:
        raise LLMError(
            "Failed while calling OpenRouter"
        ) from exc



def get_chat_response(
    messages: list[dict[str, str]]
) -> str:
    """
    Common function used by:
    - chatbot
    - startup evaluator
    - RAG pipeline
    """

    return openrouter_chat(messages)