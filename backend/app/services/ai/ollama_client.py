"""
Ollama client only for embeddings.
Used with nomic-embed-text model.
"""

from __future__ import annotations

import json
from functools import lru_cache
from urllib import error, request

from app.core.config import get_settings


class OllamaError(RuntimeError):
    pass


@lru_cache
def get_ollama_base_url() -> str:
    return str(
        get_settings()["ollama_base_url"]
    ).rstrip("/")


def _post_json(path: str, payload: dict) -> dict:
    url = f"{get_ollama_base_url()}{path}"

    req = request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json"
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=180) as response:
            return json.loads(
                response.read().decode("utf-8")
            )

    except error.URLError as exc:
        raise OllamaError(
            f"Cannot connect to Ollama at {url}"
        ) from exc

    except error.HTTPError as exc:
        raise OllamaError(
            f"Ollama error {exc.code}: {exc.reason}"
        ) from exc


def ollama_embeddings(
    texts: list[str],
    model: str | None = None
) -> list[list[float]]:

    settings = get_settings()

    embedding_model = (
        model
        or settings["ollama_embedding_model"]
    )

    embeddings = []

    for text in texts:

        response = _post_json(
            "/api/embeddings",
            {
                "model": embedding_model,
                "prompt": text
            }
        )

        vector = response.get("embedding")

        if not vector:
            raise OllamaError(
                "Embedding not returned from Ollama"
            )

        embeddings.append(
            [float(x) for x in vector]
        )

    return embeddings