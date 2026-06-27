from langchain_core.documents import Document

from app.core.config import get_settings
from app.services.ai.ollama_client import ollama_embeddings
from app.services.ai.rag.vectorstore import get_collection


def embed_query(text: str) -> list[float]:
    return ollama_embeddings([text])[0]


def retrieve_documents(query: str, top_k: int | None = None) -> list[Document]:
    settings = get_settings()
    collection = get_collection()
    query_embedding = embed_query(query)
    result = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k or settings['retrieval_top_k'],
        include=['documents', 'metadatas', 'distances'],
    )

    documents: list[Document] = []
    documents_raw = (result.get('documents') or [[]])[0]
    metadatas_raw = (result.get('metadatas') or [[]])[0]
    distances_raw = (result.get('distances') or [[]])[0]

    for document_text, metadata, distance in zip(documents_raw, metadatas_raw, distances_raw, strict=False):
        documents.append(
            Document(
                page_content=document_text,
                metadata={
                    **(metadata or {}),
                    'distance': distance,
                },
            )
        )

    return documents
