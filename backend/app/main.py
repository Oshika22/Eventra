from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.database import close_mongo_connection, connect_to_mongo
from app.routes.ai_routes import router as ai_router
from app.routes.event_routes import router as event_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(title='Eventra AI Backend', version='1.0.0', lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings['frontend_origin']],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(event_router)
app.include_router(ai_router)


@app.get('/health')
async def health_check():
    return {'status': 'ok'}
