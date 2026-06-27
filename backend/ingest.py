from langchain_core.documents import Document

from app.core.config import get_settings
from app.services.ai.ollama_client import ollama_embeddings
from app.services.ai.rag.chunker import split_text
from app.services.ai.rag.loader import load_markdown_documents
from app.services.ai.rag.vectorstore import get_collection, reset_collection


def ingest_documents() -> dict[str, int]:
    settings = get_settings()
    source_documents = load_markdown_documents(settings['data_dir'])

    chunk_documents: list[dict] = []
    for document in source_documents:
        chunks = split_text(document.page_content, settings['chunk_size'], settings['chunk_overlap'])
        for index, chunk in enumerate(chunks):
            chunk_documents.append(
                {
                    'id': f"{document.metadata['source']}::{index}",
                    'text': chunk,
                    'metadata': {
                        **document.metadata,
                        'chunk_index': index,
                    },
                }
            )

    reset_collection()
    collection = get_collection()

    if chunk_documents:
        embeddings = ollama_embeddings([item['text'] for item in chunk_documents])
        collection.add(
            ids=[item['id'] for item in chunk_documents],
            documents=[item['text'] for item in chunk_documents],
            metadatas=[item['metadata'] for item in chunk_documents],
            embeddings=embeddings,
        )

    return {
        'documents': len(source_documents),
        'chunks': len(chunk_documents),
    }


def main() -> None:
    result = ingest_documents()
    print(f"Ingestion complete: {result['documents']} documents, {result['chunks']} chunks indexed.")


if __name__ == '__main__':
    main()
