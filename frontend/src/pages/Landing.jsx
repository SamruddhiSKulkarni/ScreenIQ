import { useState } from 'react';
import { Link } from 'react-router-dom';

const SAMPLE_CANDIDATES = [
  {
    rank: 1,
    name: "Aarav_Sharma_Resume.pdf",
    score: 92,
    scoreLabel: "Strong match",
    scoreColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    role: "Full Stack Developer",
    topStrength: "Production FastAPI backends & React 19 architecture",
    flagCount: 0,
    flagText: "None detected",
    flagColor: "bg-emerald-950/60 text-emerald-300 border-emerald-800/80",
    summary: "Strong Full Stack engineer with 3+ years building Python microservices and React web apps. Meets all core JD requirements.",
    strengths: [
      "Extensive FastAPI and asynchronous Python microservice experience",
      "Modern React component architecture & Tailwind CSS",
      "Demonstrated containerization workflow with Docker"
    ],
    weaknesses: [
      "Limited cloud deployment experience (Kubernetes listed as preferred in JD)"
    ],
    concerns: [],
    tfidfScore: "88% keyword cosine match"
  },
  {
    rank: 2,
    name: "Priya_Patel_CV.pdf",
    score: 78,
    scoreLabel: "Partial match",
    scoreColor: "bg-amber-950 text-amber-300 border-amber-800",
    role: "Frontend Developer",
    topStrength: "Deep React, TypeScript & design system implementation",
    flagCount: 1,
    flagText: "1 Concern for review",
    flagColor: "bg-amber-950/60 text-amber-300 border-amber-800/80",
    summary: "Highly skilled frontend specialist with 4+ years of UI engineering. Lacks backend experience requested in the job description.",
    strengths: [
      "Advanced frontend performance optimization and state management",
      "Proven track record creating accessible UI design systems"
    ],
    weaknesses: [
      "Minimal Python or backend API development experience noted"
    ],
    concerns: [
      "2-year employment gap (2022–2024) with no listed freelance/academic projects — suggested for interviewer verification"
    ],
    tfidfScore: "74% keyword cosine match"
  },
  {
    rank: 3,
    name: "Rohan_Verma.pdf",
    score: 54,
    scoreLabel: "Weak match",
    scoreColor: "bg-rose-950 text-rose-300 border-rose-800",
    role: "Data Analyst",
    topStrength: "Strong SQL, Python data scraping & Tableau dashboards",
    flagCount: 1,
    flagText: "Role mismatch",
    flagColor: "bg-rose-950/60 text-rose-300 border-rose-800/80",
    summary: "Solid analytical and SQL background, but lacks web engineering experience required for this development role.",
    strengths: [
      "Proficient in Python data manipulation and SQL query optimization",
      "Clear communication and dashboard documentation"
    ],
    weaknesses: [
      "No React, FastAPI, or web application development experience"
    ],
    concerns: [
      "Primary experience is in Business Intelligence rather than software engineering"
    ],
    tfidfScore: "46% keyword cosine match"
  }
];

export default function Landing() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION WITH PROOF & REASSURANCE */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        {/* Proof / Trust pill */}
        <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 text-slate-300 text-xs px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Screened 500+ resumes</span>
          <span className="text-slate-600">•</span>
          <span>In-memory processing</span>
          <span className="text-slate-600">•</span>
          <span>Never used for AI training</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
          Screen 20+ Resumes in Seconds.<br />
          <span className="text-blue-400">With Defensible Proof.</span>
        </h1>

        {/* Subhead with outcome framing */}
        <p className="text-slate-400 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Built for college placement officers and HR teams. Stop opening PDFs one by one.
          Get instant, explainable candidate rankings with itemized reasoning and an objective TF-IDF baseline.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-6">
          <Link
            to="/tool"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-colors shadow-lg shadow-blue-600/20"
          >
            Start Screening Free
          </Link>
          <button
            type="button"
            onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 bg-slate-800/50 text-slate-300 hover:text-white px-7 py-3.5 rounded-xl font-medium text-base transition-colors"
          >
            See Sample Results ↓
          </button>
        </div>

        {/* Privacy reassurance blocker fix */}
        <p className="text-slate-400 text-xs sm:text-sm flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Resumes are processed securely in memory and <strong>never stored permanently or shared</strong>.</span>
        </p>
      </section>

      {/* 2. "WHAT YOU'LL SEE" SECTION (Interactive Product Preview Table) */}
      <section id="preview" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-6">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-block bg-blue-950/80 border border-blue-800/70 text-blue-300 text-xs px-2.5 py-1 rounded-md mb-2 font-medium">
                Live Output Preview
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                What you’ll see: Defensible candidate evaluations
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                AI output as a first-class decision surface. Review scores, strengths, and flagged concerns inline.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Sample Role</span>
              <span className="text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md inline-block mt-0.5">
                Full-Stack Developer (FastAPI + React)
              </span>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="pb-3 px-3">Rank & Candidate</th>
                  <th className="pb-3 px-3">Match Score</th>
                  <th className="pb-3 px-3 hidden md:table-cell">Detected Role</th>
                  <th className="pb-3 px-3">Top Strength</th>
                  <th className="pb-3 px-3">Potential Concerns</th>
                  <th className="pb-3 px-3 text-right">Reasoning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-sm">
                {SAMPLE_CANDIDATES.map((cand, idx) => {
                  const isExpanded = expandedIndex === idx;
                  return (
                    <tr key={idx} className="group">
                      <td colSpan={6} className="p-0">
                        <div
                          onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                          className={`grid grid-cols-12 items-center px-3 py-3.5 cursor-pointer transition-colors ${
                            isExpanded ? 'bg-slate-800/80' : 'hover:bg-slate-800/40'
                          }`}
                        >
                          {/* Candidate & Rank */}
                          <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5 pr-2">
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                              #{cand.rank}
                            </span>
                            <span className="font-medium text-slate-200 text-xs sm:text-sm truncate" title={cand.name}>
                              {cand.name.replace(".pdf", "").replace("_Resume", "").replace("_CV", "")}
                            </span>
                          </div>

                          {/* Match Score with text label */}
                          <div className="col-span-3 sm:col-span-2 px-2">
                            <div className="flex flex-col items-start">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${cand.scoreColor}`}>
                                {cand.score}/100
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                                {cand.scoreLabel}
                              </span>
                            </div>
                          </div>

                          {/* Role (Hidden on tiny screens) */}
                          <div className="hidden md:block col-span-2 px-2 text-xs text-blue-300 truncate">
                            {cand.role}
                          </div>

                          {/* Top Strength */}
                          <div className="col-span-3 sm:col-span-3 px-2 text-xs text-slate-300 truncate" title={cand.topStrength}>
                            {cand.topStrength}
                          </div>

                          {/* Red Flag Badge */}
                          <div className="col-span-2 sm:col-span-2 px-2">
                            <span className={`text-[11px] px-2 py-0.5 rounded-md border font-medium inline-block truncate max-w-full ${cand.flagColor}`}>
                              {cand.flagText}
                            </span>
                          </div>

                          {/* Toggle expand button */}
                          <div className="hidden sm:flex col-span-0 sm:col-span-0 justify-end pr-1 text-slate-400 group-hover:text-white text-xs">
                            <button
                              type="button"
                              className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 flex items-center gap-1"
                            >
                              {isExpanded ? "Hide" : "Details"}
                              <span className="text-[10px]">{isExpanded ? "▲" : "▼"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Inline Expandable Reasoning Row */}
                        {isExpanded && (
                          <div className="bg-slate-950/70 border-t border-slate-800 px-6 py-5 text-xs">
                            <div className="max-w-4xl space-y-4">
                              <div>
                                <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
                                  Executive Summary
                                </p>
                                <p className="text-slate-200 text-sm leading-relaxed">
                                  {cand.summary}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                                  <p className="text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
                                    <span>✓ Key Strengths</span>
                                  </p>
                                  <ul className="space-y-1 text-slate-300 text-xs">
                                    {cand.strengths.map((s, si) => (
                                      <li key={si} className="flex items-start gap-1.5">
                                        <span className="text-emerald-500">•</span>
                                        <span>{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                                  <p className="text-amber-400 font-semibold mb-1.5 flex items-center gap-1.5">
                                    <span>⚠ Items for Interview Verification</span>
                                  </p>
                                  {cand.concerns.length > 0 ? (
                                    <ul className="space-y-1 text-slate-300 text-xs">
                                      {cand.concerns.map((c, ci) => (
                                        <li key={ci} className="flex items-start gap-1.5 text-amber-200/90">
                                          <span className="text-amber-400">•</span>
                                          <span>{c}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-slate-400 text-xs">No timeline gaps or inconsistencies flagged by the model.</p>
                                  )}
                                  {cand.weaknesses.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-slate-800/80">
                                      <p className="text-slate-400 text-[11px] mb-1">Missing JD Prerequisites:</p>
                                      {cand.weaknesses.map((w, wi) => (
                                        <p key={wi} className="text-slate-400 text-xs">• {w}</p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                                <span>
                                  <strong>Non-LLM Baseline:</strong> {cand.tfidfScore}
                                </span>
                                <span className="text-slate-400">
                                  Click any row to collapse or compare candidates in the live tool.
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. OUTCOME-DRIVEN FEATURES SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Built for faster, defensible hiring decisions
          </h2>
          <p className="text-slate-400 text-base mt-2">
            Every feature is designed around how real placement cells and recruitment teams work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              outcome: "Stop opening 20 PDFs one by one.",
              title: "Bulk Ingestion",
              desc: "Drop the whole batch and walk away. Screen up to 20 PDF resumes at once without manual copy-pasting."
            },
            {
              icon: "🛡️",
              outcome: "Defend every shortlist in plain language.",
              title: "Transparent Reasoning",
              desc: "See exactly why #1 beat #5 with concrete, readable summaries, itemized strengths, and missing prerequisites."
            },
            {
              icon: "🔍",
              outcome: "Catch what looks perfect on paper.",
              title: "Surfacing Concerns",
              desc: "Spot suspicious employment gaps, vague titles, and missing qualifications before you commit interview time."
            },
            {
              icon: "⚖️",
              outcome: "Verify LLM scores with math.",
              title: "TF-IDF Non-LLM Baseline",
              desc: "Benchmark generative LLM scores against a deterministic TF-IDF cosine baseline to protect against hallucinations."
            },
            {
              icon: "👥",
              outcome: "Compare top candidates side-by-side.",
              title: "4-Way Comparison Matrix",
              desc: "Select up to 4 candidates to inspect scores, CGPA, branch, and skills overlap on a single screen."
            },
            {
              icon: "📊",
              outcome: "Clean exports that don't corrupt in Excel.",
              title: "UTF-8 BOM CSV Export",
              desc: "Download character-escaped UTF-8 CSVs that open properly in Excel and Google Sheets without column shifts."
            }
          ].map((f, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-600 transition-colors">
              <div>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-1 leading-snug">
                  {f.outcome}
                </h3>
                <p className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-2">
                  {f.title}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRUST, DATA HANDLING & RESPONSIBLE AI LIMITATIONS */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Data Handling & Assistive AI Principles
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-3xl">
            We believe in complete transparency about what ScreenIQ is and what it is not.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-1.5">
                <span>🔒 Privacy & Data Retention</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Resumes are held in memory during the screening request and discarded. Files are <strong>never stored permanently</strong> without a user session, and candidate data is <strong>never used for model training</strong>.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-1.5">
                <span>⚖️ Assistive, Not Autonomous</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                ScreenIQ is an assistive reading aid, not an autonomous hiring engine. No candidate is ever auto-rejected. Final shortlisting decisions always remain with human placement officers.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-1.5">
                <span>🛡️ Error & Output Resilience</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Built with strict JSON-mode enforcement and automatic model fallback cascades. Corrupted or unreadable PDFs are flagged with clear error notices rather than silent failures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how" className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-white text-center mb-10 tracking-tight">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Drop your PDFs",
              desc: "Select up to 20 candidate resumes at once. Works with any standard PDF resume format."
            },
            {
              step: "02",
              title: "Paste Job Description",
              desc: "Add your target job requirements or let LLM role-tagging categorize candidates automatically."
            },
            {
              step: "03",
              title: "Review & Compare",
              desc: "Get explainable scores, inspect potential concerns, and cross-reference with the TF-IDF baseline."
            }
          ].map((s, i) => (
            <div key={i} className="text-center bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-600/90 text-white rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-base shadow-md shadow-blue-600/20">
                {s.step}
              </div>
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="text-center px-6 py-14">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-10 max-w-2xl mx-auto shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Ready to screen candidates with confidence?
          </h2>
          <p className="text-slate-400 text-sm mb-7 max-w-md mx-auto">
            Free to use with guest mode. No signup required to test your first batch of resumes.
          </p>
          <Link
            to="/tool"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-colors inline-block shadow-lg shadow-blue-600/20"
          >
            Start Screening Free
          </Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="ScreenIQ Logo" className="w-6 h-6 object-contain" />
            <span className="text-white font-bold text-sm">ScreenIQ</span>
            <span className="text-slate-400 text-xs">· Assistive AI Resume Screening</span>
          </div>
          <div className="flex gap-6 text-slate-400 text-xs">
            <a href="mailto:samruddhi.kulkarni72@gmail.com" className="hover:text-white transition-colors">Contact</a>
            <a href="https://www.linkedin.com/in/samruddhi-kulkarni-31a653261" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/SamruddhiSKulkarni/ScreenIQ" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        <div className="text-center text-slate-400 text-[11px] mt-4">
          Built with React 19 + FastAPI + Groq AI · Samruddhi Kulkarni
        </div>
      </footer>
    </div>
  );
}
