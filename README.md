<div align="center">
  <img src="frontend/public/logo.png" alt="ScreenIQ Logo" width="110" />
  <h1>ScreenIQ</h1>
  <p>AI-assisted bulk resume screener with non-LLM baseline comparison and human-in-the-loop review.</p>
  <a href="https://screen-iq.vercel.app/"><strong>View Live Demo »</strong></a>
</div>

---

## Overview

ScreenIQ is a web application designed to help college placement teams and HR recruiters review batches of resumes against job descriptions.

To avoid relying strictly on generative LLM evaluations, ScreenIQ provides a dual-evaluation approach: candidates can be screened using Groq-powered LLMs or evaluated against a deterministic **TF-IDF cosine similarity baseline**. This non-LLM control gives recruiters an objective keyword match reference to compare against generative output before making shortlisting decisions using an interactive side-by-side comparison matrix.

---

## Key Features

- **Bulk PDF Upload**: Upload up to 20 PDF resumes at a time. Text extraction runs asynchronously using `pdfplumber` in a worker threadpool (`run_in_threadpool`) to prevent blocking FastAPI's event loop.
- **Dual Screening Modes**:
  - **LLM Mode (Groq)**: Extracts candidate fit score (0–100), concise summary, strengths, weaknesses, red flags (e.g., employment gaps), detected role, experience level, CGPA, branch, batch year, location, detected skills, and missing skills.
  - **TF-IDF Baseline Mode**: Uses scikit-learn's `TfidfVectorizer` and cosine similarity with a custom tech tokenizer. Serves as a deterministic, non-generative baseline to evaluate keyword match without generative hallucination or demographic bias.
- **Auto-Sort (No JD Required)**: Categorizes uploaded resumes by technical role (e.g., Web Developer, ML/AI, Python Developer, Data Analyst) and experience level when no job description is provided.
- **Human-in-the-Loop Review**:
  - ScreenIQ does not auto-shortlist or auto-reject candidates.
  - An interactive comparison modal allows recruiters to inspect up to 4 candidates side-by-side across scores, academic details, strengths, weaknesses, and a skills overlap grid before making decisions.
- **Analytics Visualizations**: Visualizes score distribution (grouped into ranges: 90+, 80–89, etc.) and role distribution using Recharts bar and pie charts.
- **Role Filtering**: Filter screened candidates by detected role in the interface without re-running the screening.
- **Session History & Guest Mode**:
  - Guest mode allows up to 3 screenings without signing up.
  - Supabase authentication enables saving screening sessions and candidate results to a database for review and re-export.
- **Excel-Compatible CSV Export**: Exports results to CSV with a UTF-8 BOM (`\uFEFF`) and character escaping to prevent column-shifting errors in Microsoft Excel.

---

## Tech Stack

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS**
- **Recharts** (Score distribution bar chart, role distribution pie chart)
- **React Router** (`HashRouter` for client routing and PKCE password recovery compatibility)
- **Supabase JS** client

### Backend
- **Python 3.10+** / **FastAPI**
- **Uvicorn** (ASGI server)
- **pdfplumber** (PDF text extraction)
- **scikit-learn** & **NumPy** (TF-IDF vectorization & cosine similarity)
- **Groq API** (`AsyncGroq` with JSON response mode; default model `openai/gpt-oss-120b` with fallback to `qwen/qwen3.8-27b` and `openai/gpt-oss-20b`)
- **Supabase Python SDK** (authenticated database persistence for sessions and candidate records)

---

## Project Structure

```
ScreenIQ/
├── backend/
│   ├── main.py                 # FastAPI app entrypoint & CORS middleware
│   ├── supabase_client.py      # Supabase client setup
│   ├── requirements.txt        # Python backend dependencies
│   ├── Procfile                # Deployment config
│   ├── models/
│   │   └── schemas.py          # Pydantic schemas (ResumeResult, RankedResume)
│   ├── routers/
│   │   └── resumes.py          # /upload, /rank, /auto-sort endpoints
│   └── services/
│       ├── parser.py           # PDF text extraction via pdfplumber
│       └── ranker.py           # Groq LLM & TF-IDF ranking implementations
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Top-level routing & auth state
│   │   ├── History.jsx         # Saved screening sessions view
│   │   ├── supabase.js         # Frontend Supabase initialization
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation bar
│   │   └── pages/
│   │       ├── Landing.jsx     # Landing page
│   │       ├── ScreeningTool.jsx # Screening interface, charts, matrix & export
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
git clone https://github.com/Kulkarnisamruddh/CampusScreen.git
cd CampusScreen
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
Backend will be available at `http://127.0.0.1:8000` (Swagger docs at `http://127.0.0.1:8000/docs`).

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
Frontend will be running at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/rank` | Uploads up to 20 PDFs and ranks them against a job description using `llm` (default) or `tfidf`. Saves results to Supabase if Bearer token is provided. |
| `POST` | `/api/auto-sort` | Uploads up to 20 PDFs and categorizes candidates by role without requiring a job description. |
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
- GitHub: [@Kulkarnisamruddh](https://github.com/Kulkarnisamruddh)  
- Email: samruddhi.kulkarni72@gmail.com  

---

## License

This project is licensed under the [MIT License](LICENSE).
