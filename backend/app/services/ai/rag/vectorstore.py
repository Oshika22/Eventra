from functools import lru_cache
from pathlib import Path

import chromadb
from chromadb.api.models.Collection import Collection

from app.core.config import get_settings


@lru_cache
def get_persist_directory() -> Path:
    settings = get_settings()
    persist_directory = Path(settings['chroma_persist_directory'])
    persist_directory.mkdir(parents=True, exist_ok=True)
    return persist_directory


@lru_cache
def get_chroma_client() -> chromadb.PersistentClient:
    return chromadb.PersistentClient(path=str(get_persist_directory()))


def get_collection_name() -> str:
    return str(get_settings()['chroma_collection_name'])


@lru_cache
def get_collection() -> Collection:
    return get_chroma_client().get_or_create_collection(name=get_collection_name())


def reset_collection() -> None:
    client = get_chroma_client()
    try:
        client.delete_collection(name=get_collection_name())
    except Exception:
        pass
    get_collection.cache_clear()
    get_collection()
