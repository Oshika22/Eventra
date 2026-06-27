# Eventra AI Backend

This backend includes a compact RAG module for the Eventra AI demo.

It uses:

- FastAPI for the API layer
- LangChain prompt utilities for structured prompting
- ChromaDB for persistent retrieval
- Ollama for local chat generation and embeddings

## Setup

1. Make sure Ollama is installed and running.
2. Pull the models used by this demo:

```bash
ollama pull nomic-embed-text:latest
ollama pull llama3.2:1b
```

3. Install the backend dependencies:

```bash
pip install -r requirements.txt
```

4. Configure your environment in `backend/.env`.

## Environment Variables

MongoDB settings for the existing event module:

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `FRONTEND_ORIGIN`

RAG settings:

- `DATA_DIR`: folder containing the markdown knowledge base
- `CHROMA_PERSIST_DIRECTORY`: persistent Chroma storage directory
- `CHROMA_COLLECTION_NAME`: Chroma collection name
- `RETRIEVAL_TOP_K`: number of chunks retrieved per query
- `CHUNK_SIZE`: chunk size used during ingestion
- `CHUNK_OVERLAP`: overlap between chunks
- `OLLAMA_BASE_URL`: Ollama server URL, usually `http://127.0.0.1:11434`
- `OLLAMA_CHAT_MODEL`: chat model used for answers and evaluations
- `OLLAMA_EMBEDDING_MODEL`: embedding model used for indexing and retrieval

Example:

```bash
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_CHAT_MODEL=llama3.2:1b
OLLAMA_EMBEDDING_MODEL=nomic-embed-text:latest
DATA_DIR=../data
```

## How To Ingest Documents

Run the ingestion script from the `backend/` directory:

```bash
python ingest.py
```

What it does:

1. Reads all `.md` files from `data/`
2. Splits them into chunks
3. Generates Ollama embeddings with `nomic-embed-text:latest`
4. Stores chunks in persistent Chroma storage under `chroma_db/`

## How Chroma Works Here

Chroma stores the indexed markdown chunks and their embeddings on disk in `chroma_db/`.

At query time:

1. The question is embedded with Ollama
2. Chroma finds the nearest chunks
3. Those chunks are passed to the local LLM as grounded context

## How The Chatbot Works

Endpoint:

```http
POST /api/chat
```

Request:

```json
{ "question": "What are AIC incubation requirements?" }
```

Flow:

1. User question enters the retriever
2. Top relevant markdown chunks are fetched from Chroma
3. Ollama answers using only that context
4. If the answer is not found, the response explicitly says so

## How The Startup Evaluator Works

Endpoint:

```http
POST /api/evaluate
```

Request:

```json
{
  "startup_name": "",
  "problem": "",
  "solution": "",
  "market": "",
  "team": "",
  "stage": ""
}
```

Flow:

1. Startup data is turned into a retrieval query
2. The retriever pulls AIC evaluation criteria from Chroma
3. Ollama generates a structured evaluation

## Run

Start the API:

```bash
uvicorn app.main:app --reload
```

Run ingestion first, then start the API so the retriever has documents available.
