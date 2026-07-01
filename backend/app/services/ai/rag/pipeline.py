from langchain_core.prompts import ChatPromptTemplate

from app.services.ai.llm import get_chat_response
from app.services.ai.rag.retriever import retrieve_documents


CHAT_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'You are the Eventra AI assistant. Use only the provided context to answer the question. '
            'If the answer is not present in the context, say that the information is unavailable in the indexed documents. '
            'Do not guess. Keep the answer concise and practical.',
        ),
        (
            'human',
            'Question:\n{question}\n\nContext:\n{context}',
        ),
    ]
)


def _format_context(documents) -> str:
    if not documents:
        return "No relevant context was retrieved."

    sections = []

    for index, document in enumerate(documents, start=1):
        source = document.metadata.get("source_file", "unknown")
        title = document.metadata.get("Header_1", "")
        subtitle = document.metadata.get("Header_2", "")

        sections.append(
            f"[{index}] {title}\n{subtitle}\nSource: {source}\n\n{document.page_content}"
        )

    return "\n\n".join(sections)

def _unique_sources(documents):
    seen = set()
    sources = []

    for document in documents:
        source = document.metadata.get("source_file", "unknown")
        if source not in seen:
            seen.add(source)
            sources.append(source)

    return sources

def _to_ollama_messages(prompt_messages) -> list[dict[str, str]]:
    role_map = {'system': 'system', 'human': 'user', 'ai': 'assistant'}
    messages: list[dict[str, str]] = []
    for message in prompt_messages:
        role = role_map.get(getattr(message, 'type', 'user'), 'user')
        messages.append({'role': role, 'content': message.content})
    return messages


def build_rag_answer(question: str) -> dict:
    documents = retrieve_documents(question)

    print("\n========== RETRIEVED ==========")
    print("Question:", question)
    print("Docs:", len(documents))

    for d in documents:
        print(d.metadata)
        print(d.page_content[:200])
        print("------------------------")

    sources = _unique_sources(documents)

    if not documents:
        return {
            'answer': 'I could not find relevant information in the indexed documents.',
            'sources': [],
        }

    prompt_messages = CHAT_PROMPT.format_messages(
        question=question,
        context=_format_context(documents),
    )

    answer = get_chat_response(_to_ollama_messages(prompt_messages))

    return {
        'answer': answer.strip(),
        'sources': sources,
    }
