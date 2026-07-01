import re

from langchain_core.documents import Document

from app.core.config import get_settings
from app.services.ai.ollama_client import ollama_embeddings
from app.services.ai.rag.vectorstore import get_collection


def embed_query(text: str):
    return ollama_embeddings([text])[0]


def retrieve_documents(query: str, top_k=None):
    settings = get_settings()
    collection = get_collection()

    docs = []
    seen = set()

    # -----------------------------
    # 1. Keyword search
    # -----------------------------
    keywords = [
        word
        for word in re.findall(r"[A-Za-z0-9-]+", query)
        if len(word) >= 3
    ]

    for word in keywords:
        try:
            result = collection.get(
                where_document={"$contains": word}
            )

            for text, meta in zip(
                result.get("documents", []),
                result.get("metadatas", []),
            ):
                key = (
                    meta.get("source_file", ""),
                    meta.get("Header_1", ""),
                    meta.get("Header_2", ""),
                )

                if key not in seen:
                    seen.add(key)

                    docs.append(
                        Document(
                            page_content=text,
                            metadata=meta,
                        )
                    )

        except Exception:
            pass

    if docs:
        return docs[: settings["retrieval_top_k"]]

    # -----------------------------
    # 2. Vector search
    # -----------------------------
    embedding = embed_query(query)

    result = collection.query(
        query_embeddings=[embedding],
        n_results=top_k or settings["retrieval_top_k"],
        include=["documents", "metadatas"],
    )

    documents = result.get("documents", [[]])[0]
    metadatas = result.get("metadatas", [[]])[0]

    for text, meta in zip(documents, metadatas):
        docs.append(
            Document(
                page_content=text,
                metadata=meta,
            )
        )

    return docs
