from pathlib import Path

from langchain_core.documents import Document


def _infer_title(page_content: str, fallback_name: str) -> str:
    for line in page_content.splitlines():
        stripped = line.strip()
        if stripped.startswith('# '):
            return stripped.removeprefix('# ').strip()
    return fallback_name.replace('_', ' ').replace('-', ' ').title()


def load_markdown_documents(data_dir: str | Path) -> list[Document]:
    base_path = Path(data_dir)
    if not base_path.exists():
        raise FileNotFoundError(f'Data directory does not exist: {base_path}')

    documents: list[Document] = []
    for file_path in sorted(base_path.glob('*.md')):
        content = file_path.read_text(encoding='utf-8').strip()
        if not content:
            continue

        documents.append(
            Document(
                page_content=content,
                metadata={
                    'source': file_path.name,
                    'path': str(file_path),
                    'title': _infer_title(content, file_path.stem),
                },
            )
        )

    return documents
