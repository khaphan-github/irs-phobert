from fastapi import FastAPI, Request
from pydantic import BaseModel
from qdrant_client import QdrantClient
from underthesea import word_tokenize
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np

tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base", use_fast=False)
model = SentenceTransformer("vinai/phobert-base", device='cuda' if torch.cuda.is_available() else 'cpu')
client = QdrantClient(
    url="https://69cd4264-af23-4dd2-9791-819696c8125e.us-east4-0.gcp.cloud.qdrant.io:6333",  # ví dụ: https://abcd1234.qdrant.cloud
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.-G0OO8JkbtUUien-2OZ3PdxbeexP88KhMnVRnJmZsD8"  # từ Qdrant Cloud
)
app = FastAPI()
# Use in-memory Qdrant instance

collection_name = "news_vectors_v10"

def vectorize(text):
    v = model.encode(text, normalize_embeddings=True)
    v = v / np.linalg.norm(v)
    return v
class QueryRequest(BaseModel):
  user_query: str
  page: int = 1
  limit: int = 10

@app.post("/search")
async def search_vectors(request: QueryRequest):
  # Tokenize and vectorize the user query
  user_query_tokenized = word_tokenize(request.user_query.strip().lower(), format="text")
  user_query_vector = vectorize(user_query_tokenized)
  
  # Calculate offset for pagination
  offset = (request.page - 1) * request.limit
  
  # Query Qdrant
  result = client.search(
    collection_name=collection_name,
    query_vector=user_query_vector,
    limit=request.limit,
    offset=offset,
    with_payload=True,
  )
  return {"results": [r.payload for r in result]}

import nest_asyncio
nest_asyncio.apply()

import uvicorn
uvicorn.run(app, host="0.0.0.0", port=8000)
