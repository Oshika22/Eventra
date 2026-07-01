from functools import lru_cache
from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()


@lru_cache
def get_settings() -> dict[str, object]:
    backend_root = Path(__file__).resolve().parents[2]
    repo_root = backend_root.parent

    return {
        'mongodb_uri': os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'),
        'mongodb_db_name': os.getenv('MONGODB_DB_NAME', 'eventra_ai'),
        'frontend_origin': os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173'),
        'data_dir': os.getenv('DATA_DIR', str(repo_root / 'data')),
        'chroma_persist_directory': os.getenv('CHROMA_PERSIST_DIRECTORY', str(backend_root / 'local_chroma_db')),
        'chroma_collection_name': os.getenv('CHROMA_COLLECTION_NAME', 'eventra_local_collection'),
        'retrieval_top_k': int(os.getenv('RETRIEVAL_TOP_K', '4')),
        'chunk_size': int(os.getenv('CHUNK_SIZE', '1200')),
        'chunk_overlap': int(os.getenv('CHUNK_OVERLAP', '180')),
        'ollama_base_url': os.getenv('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'),
        'ollama_chat_model': os.getenv('OLLAMA_CHAT_MODEL', 'llama3.2:3b'),
        'ollama_embedding_model': os.getenv('OLLAMA_EMBEDDING_MODEL', 'nomic-embed-text:latest'),
        "openrouter_api_key": os.getenv("OPENROUTER_API_KEY"),
        "llm_model": os.getenv("LLM_MODEL"),
    }
