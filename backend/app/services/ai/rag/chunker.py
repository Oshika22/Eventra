from __future__ import annotations


def split_text(text: str, chunk_size: int, chunk_overlap: int) -> list[str]:
    normalized = ' '.join(text.strip().split())
    if not normalized:
        return []

    chunk_size = max(200, chunk_size)
    chunk_overlap = max(0, min(chunk_overlap, chunk_size - 1))
    step = chunk_size - chunk_overlap

    chunks: list[str] = []
    start = 0
    while start < len(normalized):
        end = min(len(normalized), start + chunk_size)
        if end < len(normalized):
            split_at = normalized.rfind('. ', start, end)
            if split_at == -1 or split_at <= start + chunk_size // 2:
                split_at = normalized.rfind(' ', start, end)
            if split_at > start:
                end = split_at + 1

        chunk = normalized[start:end].strip()
        if chunk:
            chunks.append(chunk)

        if end >= len(normalized):
            break
        start = max(end - chunk_overlap, start + step)

    return chunks
