<div align="center">
  <img src="frontend/public/logo.png" alt="ScreenIQ Logo" width="110" />
  <h1>ScreenIQ</h1>
  <p>An exploratory AI-assisted resume screening prototype with non-LLM baseline comparison and human review tools.</p>
  <a href="https://screen-iq.vercel.app/"><strong>View Live Demo »</strong></a>
</div>

---

## Overview

ScreenIQ is a full-stack prototype designed to explore how LLMs and classical NLP can assist college placement teams and recruiters during initial resume reviews.

Rather than treating LLM scores as autonomous hiring decisions, ScreenIQ is built strictly as a human-assistive tool. It combines LLM-based first-pass candidate synthesis with a deterministic **TF-IDF cosine similarity baseline**, allowing reviewers to cross-reference generative outputs against deterministic keyword matching before conducting side-by-side manual comparisons.

---

## Features

- **Bulk PDF Upload**: Accepts up to 20 PDF resumes per batch. Text extraction runs asynchronously via `pdfplumber` in a worker threadpool (`run_in_threadpool`) to avoid blocking FastAPI's async event loop.
- **Dual Screening Modes**:
  - **LLM Mode (Groq)**: Prompts an LLM (`openai/gpt-oss-120b` or fallbacks via Groq) in JSON mode to generate an estimated fit score (0–100), a concise summary, strengths, weaknesses, and potential concerns for human review. Also extracts basic metadata like candidate-stated CGPA, branch, batch year, and listed skills.
  - **TF-IDF Baseline Mode**: Uses scikit-learn's `TfidfVectorizer` and cosine similarity with a custom tech tokenizer. Provides a deterministic, non-generative baseline to check keyword overlap without LLM prompt variance.
- **LLM-Based Role Tagging (No JD Required)**: When no job description is provided, the LLM maps each resume against a fixed enum of common roles (e.g., Web Developer, ML/AI Engineer, Python Developer, Data Analyst) and estimates experience level.
- **Human-in-the-Loop Review**:
  - Does not automate shortlisting or rejection decisions.
  - Provides a side-by-side modal to compare up to 4 candidates across extracted fields and an interactive skills overlap matrix.
- **Visual Dashboards**: Displays score distribution (bucketed into ranges: 90+, 80–89, etc.) and role distribution using Recharts bar and pie charts.
- **Role-Based Filtering**: Filter parsed candidates by tagged role directly in the UI.
- **History & Authentication**:
  - Guest mode allows up to 3 trial screenings without an account.
  - Optional Supabase authentication allows saving screening sessions and candidate results for later review and re-export.
- **Excel-Compatible CSV Export**: Exports candidate results as a UTF-8 BOM (`\uFEFF`) encoded CSV with escaped fields to prevent column shifts in spreadsheet software.

---

## 🔍 Design Realities, Limitations & Responsible AI

An AI resume screener touches a sensitive domain where fairness, bias, and reliability are critical concerns. Here is an honest accounting of how the system works and where its limitations lie:

1. **"Potential Concerns" vs. Deterministic Gap Detection**:
   - The system does **not** have an employment-timeline check, date-arithmetic parser, or rule engine.
   - When the LLM outputs items in `red_flags`, it is simply generating subjective string predictions based on prompt instructions. The model may overlook genuine career gaps or hallucinate inconsistencies that do not exist. These items must be treated as suggestions for human verification, not factual findings.

2. **Role Tagging via Fixed Prompt Enums**:
   - Role tagging is not a trained machine learning classifier. It prompts the LLM to choose from a predefined list of string constants defined in the prompt.

3. **Demographic Bias & PII**:
   - Raw resume text is sent directly to the model without stripping personally identifiable information (PII) such as candidate names, locations, graduation years, or college names.
   - Because LLMs reflect biases present in their training data, scores and summaries may be subject to demographic proxy bias. Human verification is essential.

4. **Absence of Ground-Truth Benchmark Evaluation**:
   - While both an LLM ranker and a TF-IDF baseline are implemented in the code, the system currently lacks a formal empirical evaluation (e.g., rank correlation, agreement percentage, or precision against human-labeled screening datasets).

5. **Deployment Scope**:
   - ScreenIQ is an exploratory portfolio project hosted on free-tier infrastructure (Vercel for the frontend, Render for the backend), not a production enterprise HR system.

---

## Tech Stack

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS**
- **Recharts** (Bar & Pie chart visualizations)
- **React Router** (`HashRouter` for SPA routing and PKCE password recovery compatibility)
- **Supabase JS** client

### Backend
- **Python 3.10+** / **FastAPI**
- **Uvicorn** (ASGI server)
- **pdfplumber** (PDF text extraction)
- **scikit-learn** & **NumPy** (TF-IDF vectorization & cosine similarity)
- **Groq API** (`AsyncGroq` with JSON response mode; default model `openai/gpt-oss-120b` with fallbacks)
- **Supabase Python SDK** (authenticated database writes for sessions and candidate records)

---

## Project Structure

```
ScreenIQ/
├── backend/
│   ├── main.py                 # FastAPI entrypoint & CORS middleware
│   ├── supabase_client.py      # Supabase client setup
│   ├── requirements.txt        # Python backend dependencies
│   ├── Procfile                # Render / deployment config
│   ├── models/
│   │   └── schemas.py          # Pydantic schemas (ResumeResult, RankedResume)
│   ├── routers/
│   │   └── resumes.py          # /upload, /rank, /auto-sort endpoints
│   └── services/
│       ├── parser.py           # Threadpooled PDF text extraction (pdfplumber)
│       └── ranker.py           # Groq LLM & TF-IDF ranking logic
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Top-level routing & auth state
│   │   ├── History.jsx         # Saved screening sessions view
│   │   ├── supabase.js         # Frontend Supabase initialization
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation bar
│   │   └── pages/
│   │       ├── Landing.jsx     # Landing page
│   │       ├── ScreeningTool.jsx # Screening UI, charts, matrix & CSV export
│   │       ├── Login.jsx       # Supabase email/password login & registration
│   │       ├── ForgotPassword.jsx
│   │       └── ResetPassword.jsx
│   ├── package.json
│   └── vite.config.js
├── LICENSE
└── README.md
```

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/SamruddhiSKulkarni/ScreenIQ.git
cd ScreenIQ
```

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
# Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux / macOS:
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_service_role_or_anon_key

# Optional: override default model
GROQ_MODEL=openai/gpt-oss-120b
```

Run the FastAPI backend:
```bash
uvicorn main:app --reload --port 8000
```
Backend runs at `http://127.0.0.1:8000` (interactive docs at `http://127.0.0.1:8000/docs`).

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the Vite development server:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/rank` | Uploads up to 20 PDFs and evaluates them against a job description using `llm` (default) or `tfidf`. Saves results to Supabase if Bearer token is provided. |
| `POST` | `/api/auto-sort` | Uploads up to 20 PDFs and tags candidates by role and experience using a prompt enum without requiring a job description. |
| `POST` | `/api/upload` | Parses PDF files and returns extracted plain text. |
| `GET` | `/` | Health check endpoint (`{"status": "resume screener is running"}`). |

---

## Database Schema (Supabase)

If setting up a custom Supabase instance, create the following tables:

```sql
-- Screening Sessions Table
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title TEXT,
  job_description TEXT,
  total_resumes INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Resume Screening Results Table
CREATE TABLE resume_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  filename TEXT,
  rank INT,
  score INT,
  summary TEXT,
  strengths TEXT[],
  weaknesses TEXT[],
  red_flags TEXT[],
  detected_role TEXT,
  experience_level TEXT,
  cgpa NUMERIC,
  batch_year INT,
  branch TEXT,
  location TEXT,
  skills_detected TEXT[],
  missing_skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view results for their sessions"
  ON resume_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = resume_results.session_id
      AND sessions.user_id = auth.uid()
    )
  );
```

---

## Author

**Samruddhi Kulkarni**  
- LinkedIn: [samruddhi-kulkarni-31a653261](https://www.linkedin.com/in/samruddhi-kulkarni-31a653261)  
- GitHub: [@SamruddhiSKulkarni](https://github.com/SamruddhiSKulkarni)  
- Email: samruddhi.kulkarni72@gmail.com  

---

## License

This project is licensed under the [MIT License](LICENSE).
