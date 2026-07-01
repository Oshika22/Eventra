"""
LLM service using local Ollama.
No OpenRouter/API key required.
"""

from __future__ import annotations

import json
from urllib import request, error

from app.core.config import get_settings


class LLMError(RuntimeError):
    pass


def ollama_chat(messages: list[dict[str, str]]) -> str:
    settings = get_settings()

    url = settings["ollama_base_url"].rstrip("/") + "/api/chat"

    payload = {
        "model": "llama3.2:3b",
        "messages": messages,
        "stream": False,
    }

    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=180) as response:
            data = json.loads(response.read().decode("utf-8"))

        return data["message"]["content"]

    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise LLMError(f"Ollama HTTP {exc.code}: {body}") from exc

    except Exception as exc:
        raise LLMError(f"Failed to call Ollama: {exc}") from exc


def get_chat_response(messages: list[dict[str, str]]) -> str:
    return ollama_chat(messages)
