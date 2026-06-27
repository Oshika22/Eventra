"""
Embedding service.

Uses Ollama local embedding model:
nomic-embed-text:latest
"""

from functools import lru_cache

from app.services.ai.ollama_client import ollama_embeddings


@lru_cache
def get_embeddings():
    """
    Returns embedding function using Ollama.

    Used for:
    - document ingestion
    - query embedding
    """

    def embed(texts: list[str]) -> list[list[float]]:
        return ollama_embeddings(texts)

    return embed