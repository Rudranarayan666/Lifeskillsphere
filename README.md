<div align="center">

# 🌿 LifeSkillSphere

**A full-stack emotional well-being platform powered by Python, FastAPI & Next.js**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-SQLAlchemy-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API Reference](#-api-reference) • [Chatbot](#-ai-chatbot) • [Roadmap](#-roadmap--solo-dev-ideas)

</div>

---

## 📖 About

**LifeSkillSphere** is a full-stack web platform designed to promote emotional well-being and life skill development. Built solo, it's powered by a **Python / FastAPI** backend and a **Next.js** frontend, with a planned **AI chatbot** trained on mental health & life skills content.

- 🧠 **Psychometric Tests** — Science-backed assessments for youth, adults, and seniors
- 📊 **Mood Tracking** — Daily mood logging with visual analytics
- 🤖 **AI Chatbot** — Trained on life-skills data for personalized guidance
- 📚 **Skill Library** — Curated modules for personal growth
- 🔐 **Secure Auth** — JWT + Google OAuth + email verification

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Age-based Modules** | Separate psychometric paths for Youth, Adults & Seniors |
| 📈 **Mood Tracker** | Daily mood logging with interactive charts |
| 📋 **Test Results** | Persistent score history & progress analytics |
| 🔑 **Google OAuth 2.0** | One-click sign-in via Google |
| 📧 **Email Verification** | Secure account activation via Gmail SMTP |
| 🤖 **AI Chatbot** | Context-aware chatbot using fine-tuned LLM |
| 🌗 **Dark / Light Mode** | Theme switching powered by `next-themes` |
| 📱 **Fully Responsive** | Mobile-first design with Tailwind CSS |
| 🛡️ **JWT Auth** | Stateless, secure tokens (access + refresh) |

---

## 🛠 Tech Stack

### 🖥 Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.2.4 | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.1.9 | Styling |
| [Radix UI](https://www.radix-ui.com/) | various | Accessible UI primitives |
| [Framer Motion](https://www.framer.com/motion/) | ^12 | Animations |
| [Recharts](https://recharts.org/) | ^2.15 | Data visualization |
| [React Hook Form](https://react-hook-form.com/) | ^7.60 | Form management |
| [Zod](https://zod.dev/) | 3.25.67 | Schema validation |
| [SWR](https://swr.vercel.app/) | ^2.3.6 | Data fetching & caching |

### ⚙️ Backend (Python / FastAPI)
| Technology | Version | Purpose |
|------------|---------|---------|
| [Python](https://www.python.org/) | 3.11+ | Backend runtime |
| [FastAPI](https://fastapi.tiangolo.com/) | ^0.115 | Async REST API framework |
| [Uvicorn](https://www.uvicorn.org/) | ^0.30 | ASGI server |
| [SQLAlchemy](https://www.sqlalchemy.org/) | ^2.0 | Async ORM |
| [Alembic](https://alembic.sqlalchemy.org/) | ^1.13 | DB schema migrations |
| [PostgreSQL](https://www.postgresql.org/) | 15+ | Primary SQL database |
| [python-jose](https://github.com/mpdavis/python-jose) | ^3.3 | JWT encode/decode |
| [passlib + bcrypt](https://passlib.readthedocs.io/) | ^1.7 | Password hashing |
| [Authlib](https://authlib.org/) | ^1.3 | Google OAuth 2.0 |
| [fastapi-mail](https://sabuhish.github.io/fastapi-mail/) | ^1.4 | Email via Gmail SMTP |
| [Pydantic](https://docs.pydantic.dev/) | ^2.7 | Data validation & settings |
| [python-dotenv](https://github.com/theskumar/python-dotenv) | ^1.0 | `.env` config loader |

### 🤖 AI Chatbot
| Technology | Purpose |
|------------|---------|
| [LangChain](https://python.langchain.com/) | Chatbot orchestration & memory |
| [Sentence Transformers](https://www.sbert.net/) | Text embeddings for semantic search |
| [FAISS](https://github.com/facebookresearch/faiss) | Vector store for RAG (retrieval) |
| [Hugging Face Transformers](https://huggingface.co/transformers/) | Fine-tuned LLM inference |
| [OpenAI API](https://platform.openai.com/) *(optional)* | GPT fallback if self-hosted is slow |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Link |
|------|---------|------|
| Python | ≥ 3.11 | [Download](https://www.python.org/downloads/) |
| Node.js | ≥ 18.x | [Download](https://nodejs.org/) |
| PostgreSQL | ≥ 15 | [Download](https://www.postgresql.org/download/) |
| Git | latest | [Download](https://git-scm.com/) |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rudranarayan666/Lifeskillsphere.git
cd Lifeskillsphere
```

---

### 2️⃣ Set Up the Database

```bash
# Connect to PostgreSQL and create the DB
psql -U postgres
```
```sql
CREATE DATABASE psychometric_db;
\q
```

> Alembic migrations will create all tables automatically on first run.

---

### 3️⃣ Configure the Backend

```bash
cd server   # or rename this folder to 'backend'
```

Create a `.env` file:

```env
# ── App ──────────────────────────────────────────────
APP_ENV=development
PORT=8000
SECRET_KEY=your_super_secret_key_min_32_chars

# ── Database (PostgreSQL) ─────────────────────────────
DATABASE_URL=postgresql+asyncpg://postgres:your_password@localhost:5432/psychometric_db

# ── JWT ───────────────────────────────────────────────
JWT_SECRET=your_jwt_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

# ── Email (Gmail SMTP via fastapi-mail) ───────────────
# Steps: Google Account → Security → 2-Step Verification → App passwords
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_google_app_password
MAIL_FROM=your_email@gmail.com
MAIL_FROM_NAME=LifeSkillSphere
MAIL_PORT=465
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=false
MAIL_SSL_TLS=true

# ── Google OAuth 2.0 ──────────────────────────────────
# Get from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback

# ── Frontend ──────────────────────────────────────────
FRONTEND_BASE_URL=http://localhost:3000

# ── AI Chatbot (optional) ─────────────────────────────
OPENAI_API_KEY=your_openai_api_key          # optional fallback
HF_MODEL_ID=your-username/lifeskills-bot    # your fine-tuned HF model
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

---

### 4️⃣ Install Python Dependencies & Run Backend

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn[standard] sqlalchemy[asyncio] asyncpg alembic \
            python-jose[cryptography] passlib[bcrypt] authlib httpx \
            fastapi-mail pydantic-settings python-dotenv \
            langchain sentence-transformers faiss-cpu transformers

# Run database migrations
alembic upgrade head

# Start the development server
uvicorn main:app --reload --port 8000
```

FastAPI server starts at **http://localhost:8000**

Interactive API docs: **http://localhost:8000/docs** (Swagger UI) 🔥

```bash
# Verify health
curl http://localhost:8000/health
# → {"status": "ok"}
```

---

### 5️⃣ Install & Run the Frontend

Open a **new terminal**:

```bash
cd "lifeskillsphere ()"
npm install
npm run dev
```

Open **http://localhost:3000** in your browser 🎉

---

## 🗂 Project Structure

```
Lifeskillsphere/
│
├── lifeskillsphere ()/               # 🖥️  Next.js Frontend
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout & metadata
│   │   ├── globals.css               # Global styles
│   │   ├── dashboard/                # User dashboard
│   │   ├── mood/                     # Mood tracker
│   │   ├── progress/                 # Analytics & progress
│   │   ├── skills/                   # Life skills library
│   │   ├── chatbot/                  # AI Chatbot UI page
│   │   ├── youth/                    # Youth module
│   │   ├── adult/                    # Adult module
│   │   ├── senior/                   # Senior module
│   │   ├── login/                    # Login page
│   │   ├── signup/                   # Signup page
│   │   ├── verify/                   # Email verification
│   │   └── oauth/                    # Google OAuth callback
│   ├── components/
│   │   ├── ui/                       # Radix UI component library
│   │   ├── chatbot-widget.tsx        # Floating chatbot widget
│   │   ├── mood-tracker.tsx          # Mood tracker component
│   │   └── theme-provider.tsx        # Dark/light theme
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # API client & helpers
│   └── public/                       # Static assets
│
└── backend/                          # ⚙️  Python / FastAPI Backend
    ├── main.py                       # FastAPI app entry point
    ├── .env                          # Environment variables
    ├── requirements.txt              # Python dependencies
    ├── alembic/                      # DB migrations
    │   └── versions/                 # Migration scripts
    ├── api/
    │   ├── auth.py                   # Register, login, verify email
    │   ├── oauth.py                  # Google OAuth 2.0 routes
    │   ├── results.py                # Test results CRUD
    │   ├── mood.py                   # Mood entry routes
    │   └── chatbot.py                # Chatbot API endpoint
    ├── core/
    │   ├── config.py                 # Pydantic settings
    │   ├── security.py               # JWT helpers, password hash
    │   ├── dependencies.py           # Auth dependencies (get_current_user)
    │   └── email.py                  # fastapi-mail setup
    ├── models/
    │   ├── user.py                   # SQLAlchemy User model
    │   ├── test_result.py            # Test result model
    │   ├── mood_entry.py             # Mood entry model
    │   └── base.py                   # Declarative base
    ├── schemas/
    │   ├── auth.py                   # Pydantic request/response schemas
    │   ├── results.py                # Result schemas
    │   └── chatbot.py                # Chat message schemas
    ├── db/
    │   └── session.py                # Async DB session
    └── chatbot/
        ├── model.py                  # LLM loader (HuggingFace / OpenAI)
        ├── rag_pipeline.py           # RAG retrieval pipeline
        ├── vector_store.py           # FAISS index builder
        └── data/                     # Training & knowledge documents
            ├── lifeskills_corpus.txt
            └── mental_health_faq.txt
```

---

## 🔌 API Reference

**Base URL:** `http://localhost:8000`  
**Interactive Docs:** `http://localhost:8000/docs` (auto-generated Swagger UI by FastAPI)

### 🔐 Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register with email + password |
| `POST` | `/api/auth/login` | Login → returns access + refresh token |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `GET` | `/api/auth/verify-email?token=<token>` | Verify email from activation link |
| `GET` | `/api/auth/google` | Start Google OAuth flow |
| `GET` | `/api/auth/google/callback` | Google OAuth redirect handler |
| `POST` | `/api/auth/forgot-password` | Send password reset email |
| `POST` | `/api/auth/reset-password` | Reset password with token |

### 📊 Results & Mood

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/results` | Save a psychometric test result |
| `GET` | `/api/results` | Get all results for current user |
| `POST` | `/api/mood` | Log a mood entry |
| `GET` | `/api/mood` | Get mood history for current user |

### 🤖 Chatbot

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send a message, get AI response |
| `GET` | `/api/chat/history` | Fetch past chat sessions |

### 🏥 Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `GET` | `/db/health` | Database connectivity check |

---

## 🤖 AI Chatbot

The LifeSkillSphere chatbot uses a **RAG (Retrieval-Augmented Generation)** approach — making it accurate, grounded, and solo-developer friendly.

### How It Works

```
User Message
     ↓
[Embedding Model] → encode query
     ↓
[FAISS Vector Store] → find top-k relevant documents
     ↓
[LLM] ← context + user query
     ↓
Helpful, grounded response
```

### Setup Steps

```bash
# 1. Prepare your knowledge base (add .txt files to backend/chatbot/data/)
#    e.g., mental health tips, life skills articles, test explanations

# 2. Build the FAISS vector index
cd backend
python chatbot/vector_store.py   # creates data/index.faiss

# 3. The chatbot API is now ready at POST /api/chat
```

### Chatbot Options (choose one based on your needs)

| Approach | Cost | Accuracy | Setup Difficulty |
|----------|------|----------|-----------------|
| **OpenAI GPT-4o-mini + RAG** | ~$0.01/query | ⭐⭐⭐⭐⭐ | ✅ Easy |
| **HuggingFace Mistral-7B + RAG** | Free (GPU needed) | ⭐⭐⭐⭐ | ⚠️ Medium |
| **Fine-tuned DistilBERT (FAQ only)** | Free (CPU ok) | ⭐⭐⭐ | ⚠️ Medium |
| **Rule-based + LangChain** | Free | ⭐⭐ | ✅ Easy |

> **Recommended for solo dev:** Start with OpenAI GPT-4o-mini + FAISS RAG. It's cheap, fast to set up, and gives excellent results without needing a GPU.

---

## 🗺 Roadmap & Solo Dev Ideas

Since you're building this solo, here's a prioritized roadmap with achievable ideas:

### ✅ Phase 1 — Core (Current)
- [x] User auth (JWT + Google OAuth + email verify)
- [x] Psychometric tests (Youth / Adult / Senior)
- [x] Mood tracker with charts
- [x] Test result storage
- [x] Responsive frontend

### 🔧 Phase 2 — Backend Migration (Next)
- [ ] Migrate from Node/Express → **Python / FastAPI**
- [ ] Set up **SQLAlchemy + Alembic** with PostgreSQL
- [ ] Add **refresh token** rotation
- [ ] Add password **reset via email**
- [ ] FastAPI auto Swagger docs at `/docs`

### 🤖 Phase 3 — AI Chatbot
- [ ] Build FAISS vector store from life-skills articles
- [ ] Integrate RAG pipeline with OpenAI or HuggingFace
- [ ] Add floating chatbot widget to frontend
- [ ] Add chat history storage per user
- [ ] Fine-tune a small model on mental health Q&A dataset

### 💡 Phase 4 — Smart Features
- [ ] **AI-generated personalized recommendations** based on test scores
- [ ] **Weekly email reports** — mood trends + skill suggestions
- [ ] **Streak system** — gamification for daily check-ins
- [ ] **Journal feature** — private text entries with sentiment analysis
- [ ] **Crisis detection** — flag concerning patterns and suggest resources
- [ ] **Goal tracking** — set & track personal development goals

### 🚀 Phase 5 — Production Ready
- [ ] Dockerize frontend + backend
- [ ] Deploy frontend on **Vercel**
- [ ] Deploy backend on **Railway / Render / AWS Lightsail**
- [ ] Set up **CI/CD** with GitHub Actions
- [ ] Add rate limiting & request validation middleware
- [ ] Monitoring with **Sentry** (free tier)

---

## 🧩 Available Scripts

### Frontend — `lifeskillsphere ()/`

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

### Backend — `backend/`

```bash
# Activate venv first: venv\Scripts\activate (Windows)

uvicorn main:app --reload --port 8000   # Dev server with hot reload
uvicorn main:app --port 8000            # Production

alembic revision --autogenerate -m "description"  # Create migration
alembic upgrade head                               # Apply migrations
alembic downgrade -1                              # Rollback last migration

python chatbot/vector_store.py          # Rebuild FAISS index
```

---

## 🌐 Environment Variables Reference

| Variable | Required | Description |
|----------|:--------:|-------------|
| `DATABASE_URL` | ✅ | Full async PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens |
| `JWT_ALGORITHM` | ✅ | Algorithm (use `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | ✅ | Access token expiry |
| `REFRESH_TOKEN_EXPIRE_DAYS` | ✅ | Refresh token expiry |
| `MAIL_USERNAME` | ✅ | Gmail address |
| `MAIL_PASSWORD` | ✅ | Google App Password |
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuth Client Secret |
| `GOOGLE_REDIRECT_URI` | ✅ | OAuth callback URI |
| `FRONTEND_BASE_URL` | ✅ | Frontend URL for CORS & redirects |
| `OPENAI_API_KEY` | ⚡ Optional | For GPT chatbot fallback |
| `HF_MODEL_ID` | ⚡ Optional | HuggingFace model for self-hosted chatbot |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: add chatbot RAG pipeline"
   ```
4. **Push** your branch and **open a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built solo with ❤️ by [Rudranarayan](https://github.com/Rudranarayan666)

⭐ **Star this repo if you find it helpful!** ⭐

</div>

