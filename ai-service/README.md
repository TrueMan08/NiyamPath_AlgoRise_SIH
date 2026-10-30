# NiyamPath AI Intelligence Service (Workstreams C & D)

> **Technology Stack:** Python 3.11+, FastAPI, Pydantic v2, PyMuPDF (fitz), pdfplumber, Tesseract OCR / easyocr, Gemini API Client, ChromaDB / FAISS, Sentence Transformers.  
> **Port:** 8000  
> **Integration Architecture:** Unified FastAPI application hosting Document Intelligence (Workstream C) and Knowledge Intelligence (Workstream D).

---

## 1. Scope & Unified Architecture

Workstreams C and D collaborate inside a single, high-performance Python FastAPI service. They share configuration, logging, LLM client connections, and error handling, while exposing modular route groups.

### Workstream C: AI Document Intelligence
- **PDF Extraction & OCR:** Ingest submitted documents (land titles, lease deeds, building safety certificates, AICTE undertakings).
- **Classification & Field Extraction:** Identify document type, extract institution name, issue date, expiry date, address, issuing authority, and document registration numbers.
- **Checklist Comparison & Omission Detection:** Compare uploaded document metadata against the mandated AICTE checklist.
- **Cross-Document Discrepancy Detection:** Detect mismatches between application forms and submitted deeds (e.g. institution address or land area differences).
- **Draft Scrutiny Generation:** Generate editable, evidence-backed preliminary scrutiny notes for central officers.

### Workstream D: AI Knowledge & Insights
- **Regulatory Document Ingestion & Chunking:** Process approved AICTE regulations (e.g. Approval Process Handbook excerpts) preserving page, chapter, and section hierarchy.
- **RAG Pipeline & Embeddings:** Semantic vector search with source citation retrieval.
- **Regulatory Knowledge Assistant:** Grounded Q&A with mandatory citations. Explicitly responds "The approved knowledge base does not contain this information" when confidence is low.
- **Application & Scrutiny Summarization:** Concise bullet summaries of application history, deficiency iterations, and EVC milestones.
- **Descriptive Pendency Insights:** Analyze workload ageing and bottleneck stages based on actual backend platform records.

---

## 2. Directory Architecture

```
ai-service/
├── app/
│   ├── main.py                    # FastAPI root application & lifecycle hooks
│   ├── api/                       # Router definitions
│   │   ├── document_routes.py     # Endpoints: /ai/documents/analyze, /ai/scrutiny/generate
│   │   └── knowledge_routes.py    # Endpoints: /ai/assistant/ask, /ai/insights/*
│   ├── schemas/                   # Pydantic models for request validation & structured outputs
│   │   ├── document_schemas.py
│   │   └── knowledge_schemas.py
│   ├── common/                    # Shared infrastructure
│   │   ├── config.py              # Environment settings (Pydantic BaseSettings)
│   │   ├── llm_client.py          # Unified LLM provider wrapper (Gemini / fallback)
│   │   ├── logger.py              # Structured JSON logging
│   │   └── exceptions.py          # Custom domain exceptions
│   ├── document_intelligence/     # Workstream C implementation
│   │   ├── extraction/            # PDF parsing & OCR extraction pipelines
│   │   ├── classification/        # Document type classifier
│   │   ├── validation/            # Mandatory field & checklist validators
│   │   ├── discrepancy/           # Cross-document field comparator
│   │   └── scrutiny/              # Draft scrutiny report synthesis
│   ├── knowledge_intelligence/    # Workstream D implementation
│   │   ├── ingestion/             # Document loader for regulatory circulars & APH
│   │   ├── chunking/              # Hierarchical legal document chunker
│   │   ├── embeddings/            # Embedding vector generator
│   │   ├── retrieval/             # Hybrid / semantic vector retriever
│   │   ├── rag/                   # Prompt synthesis with source citation enforcement
│   │   └── insights/              # Application summarizer & descriptive pendency engine
│   └── evaluation/                # RAG faithfulness & extraction accuracy tests
├── tests/                         # Pytest test cases
├── requirements.txt
└── README.md
```

---

## 3. Strict AI Safety & Governance Guardrails

1. **Advisory Only:** No AI endpoint may execute database writes or state transitions. Every output is returned as structured data with evidence citations for human officer validation.
2. **Hallucination Prevention:** The Knowledge Assistant is strictly instructed never to fabricate regulatory rules, dates, or criteria. If a passage is missing in the ingested knowledge base, it must decline to answer.
3. **No Direct DB Access:** The AI service does not connect to the PostgreSQL database directly; all context is provided by authorized backend requests.

---

## 4. Setup & Running

```bash
cd ai-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Swagger UI available at `http://localhost:8000/docs`.

