"use client"

import { useState, useEffect, useRef } from "react"

const dataSources = [
  {
    id: "sqlite",
    name: "SQLite",
    label: "File Upload",
    accept: ".db",
    placeholder: null,
    color: "#0ea5e9",
    bg: "#f0f9ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "csv",
    name: "CSV",
    label: "File Upload",
    accept: ".csv",
    placeholder: null,
    color: "#10b981",
    bg: "#f0fdf4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
  },
  {
    id: "gsheet",
    name: "Google Sheets",
    label: "URL",
    accept: null,
    placeholder: "https://docs.google.com/spreadsheets/d/...",
    color: "#f59e0b",
    bg: "#fffbeb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub CSV",
    label: "Raw URL",
    accept: null,
    placeholder: "https://raw.githubusercontent.com/...",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    label: "Connection String",
    accept: null,
    placeholder: "mysql://user:password@host:3306/db",
    color: "#ef4444",
    bg: "#fef2f2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 5v4c0 1.66-4.03 3-9 3S3 10.66 3 9V5" />
        <path d="M21 9v4c0 1.66-4.03 3-9 3S3 14.66 3 13V9" />
        <path d="M21 13v4c0 1.66-4.03 3-9 3s-9-1.34-9-3v-4" />
      </svg>
    ),
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    label: "Connection String",
    accept: null,
    placeholder: "postgresql://user:password@host:5432/db",
    color: "#3b82f6",
    bg: "#eff6ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
]

function TypewriterText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let i = 0
    const iv = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else clearInterval(iv)
    }, speed)
    return () => clearInterval(iv)
  }, [text])
  return <span>{displayed}<span className="cursor-blink">▋</span></span>
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("sqlite")
  const [file, setFile] = useState(null)
  const [dbName, setDbName] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isQuerying, setIsQuerying] = useState(false)
  const [urlValue, setUrlValue] = useState("")
  const [connStr, setConnStr] = useState("")
  const [animateAnswer, setAnimateAnswer] = useState(false)
  const [history, setHistory] = useState([])
  const fileRef = useRef(null)

  const activeSource = dataSources.find(ds => ds.id === activeTab)

  const isFileSource = ["sqlite", "csv"].includes(activeTab)
  const isUrlSource = ["gsheet", "github"].includes(activeTab)
  const isConnSource = ["mysql", "postgres"].includes(activeTab)

  const canConnect =
    (isFileSource && file) ||
    (isUrlSource && urlValue.trim()) ||
    (isConnSource && connStr.trim())

  async function uploadDB() {
    const endpoint = {
      sqlite: "/upload-sqlite", csv: "/upload-csv",
      gsheet: "/connect-gsheet", github: "/connect-github",
      mysql: "/connect-mysql", postgres: "/connect-postgres",
    }[activeTab]

    setIsUploading(true)
    try {
      let res
      if (isFileSource) {
        const form = new FormData()
        form.append("file", file)
        res = await fetch("http://127.0.0.1:8000" + endpoint, { method: "POST", body: form })
      } else if (isUrlSource) {
        res = await fetch("http://127.0.0.1:8000" + endpoint, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlValue })
        })
      } else {
        res = await fetch("http://127.0.0.1:8000" + endpoint, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conn_str: connStr })
        })
      }
      const data = await res.json()
      setDbName(data.db_name)
    } catch (e) {
      alert("Connection failed: " + e.message)
    } finally {
      setIsUploading(false)
    }
  }

  async function askQuestion() {
    if (!dbName || !question.trim()) return
    const q = question
    setIsQuerying(true)
    setQuestion("")
    setAnswer("")
    setAnimateAnswer(false)
    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, db_name: dbName })
      })
      const data = await res.json()
      setAnswer(data.answer)
      setAnimateAnswer(true)
      setHistory(h => [{ q, a: data.answer }, ...h.slice(0, 4)])
    } catch (e) {
      setAnswer("Error: " + e.message)
      setAnimateAnswer(true)
    } finally {
      setIsQuerying(false)
    }
  }

  const dbDisplayName = dbName
    ? (dbName.split("///")[1]?.split("/").pop() || dbName.split("/").pop() || dbName)
    : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0a0f1e;
          color: #e2e8f0;
          min-height: 100vh;
        }

        .app-shell {
          min-height: 100vh;
          background: #080c18;
          position: relative;
          overflow-x: hidden;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .bg-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* ── HEADER ── */
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0 0;
          margin-bottom: 56px;
        }

        .logo-group { display: flex; align-items: center; gap: 12px; }

        .logo-mark {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 24px rgba(99,102,241,0.4);
        }

        .logo-mark svg { width: 20px; height: 20px; color: white; }

        .logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.3px;
        }

        .logo-badge {
          font-size: 10px;
          font-weight: 500;
          background: rgba(99,102,241,0.15);
          color: #818cf8;
          border: 1px solid rgba(99,102,241,0.3);
          padding: 2px 8px;
          border-radius: 100px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .header-status {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #64748b;
        }

        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── HERO ── */
        .hero {
          text-align: center;
          margin-bottom: 64px;
        }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 500;
          color: #818cf8;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -1.5px;
          color: #f8fafc;
          margin-bottom: 16px;
        }

        .hero-title span {
          background: linear-gradient(135deg, #6366f1 0%, #a5b4fc 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 17px;
          color: #64748b;
          font-weight: 300;
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── WORKSPACE ── */
        .workspace {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 820px) {
          .workspace { grid-template-columns: 1fr; }
        }

        /* ── PANEL ── */
        .panel {
          background: rgba(15,20,40,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .panel-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .panel-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }

        .panel-icon svg { width: 16px; height: 16px; }

        .panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        /* ── SOURCE GRID ── */
        .source-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 20px;
        }

        .source-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          text-align: center;
        }

        .source-btn:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-1px);
        }

        .source-btn.active {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 0 20px rgba(99,102,241,0.15), inset 0 0 0 1px rgba(99,102,241,0.2);
        }

        .source-icon-wrap {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }

        .source-icon-wrap svg { width: 20px; height: 20px; }

        .source-name {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }

        .source-btn.active .source-name { color: #a5b4fc; }

        .active-pip {
          position: absolute;
          top: 8px; right: 8px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 6px #6366f1;
        }

        /* ── CONNECT AREA ── */
        .connect-area { padding: 0 20px 20px; }

        .connect-label {
          font-size: 11px;
          font-weight: 500;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
          display: block;
        }

        .drop-zone {
          border: 1.5px dashed rgba(99,102,241,0.25);
          border-radius: 14px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(99,102,241,0.03);
          margin-bottom: 12px;
        }

        .drop-zone:hover {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.07);
        }

        .drop-icon {
          width: 36px; height: 36px;
          margin: 0 auto 10px;
          color: #6366f1;
          opacity: 0.7;
        }

        .drop-title {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .drop-sub { font-size: 11px; color: #475569; }

        .file-chosen {
          font-size: 12px;
          color: #818cf8;
          font-weight: 500;
        }

        .text-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          color: #e2e8f0;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          outline: none;
          transition: all 0.2s;
          margin-bottom: 12px;
        }

        .text-input::placeholder { color: #334155; }

        .text-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .connect-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
        }

        .connect-btn:not(:disabled) {
          background: linear-gradient(135deg, #6366f1, #818cf8);
          color: white;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .connect-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.4);
        }

        .connect-btn:not(:disabled):active { transform: translateY(0); }

        .connect-btn:disabled {
          background: rgba(255,255,255,0.05);
          color: #334155;
          cursor: not-allowed;
        }

        .connection-badge {
          display: flex; align-items: center; gap: 8px;
          margin-top: 12px;
          padding: 10px 14px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 10px;
          font-size: 12px;
          color: #34d399;
          font-weight: 500;
        }

        .connection-badge svg { width: 14px; height: 14px; }

        /* ── QUERY PANEL ── */
        .query-panel { display: flex; flex-direction: column; gap: 16px; }

        .query-box {
          background: rgba(15,20,40,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .query-input-wrap {
          padding: 20px 24px;
          display: flex;
          gap: 12px;
          align-items: flex-end;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .query-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.6;
          resize: none;
          min-height: 60px;
          max-height: 180px;
        }

        .query-textarea::placeholder { color: #334155; }

        .send-btn {
          width: 42px; height: 42px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .send-btn:not(:disabled) {
          background: linear-gradient(135deg, #6366f1, #818cf8);
          box-shadow: 0 4px 16px rgba(99,102,241,0.35);
        }

        .send-btn:not(:disabled):hover {
          transform: scale(1.06);
          box-shadow: 0 6px 22px rgba(99,102,241,0.5);
        }

        .send-btn:disabled {
          background: rgba(255,255,255,0.05);
          cursor: not-allowed;
        }

        .send-btn svg { width: 18px; height: 18px; color: white; }

        .query-hints {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding: 14px 24px;
        }

        .hint-chip {
          font-size: 11px;
          color: #475569;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 5px 12px;
          cursor: pointer;
          transition: all 0.18s;
          font-weight: 400;
        }

        .hint-chip:hover {
          color: #818cf8;
          border-color: rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.07);
        }

        /* ── ANSWER BOX ── */
        .answer-box {
          background: rgba(15,20,40,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .answer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .answer-label {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .answer-label-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .answer-body {
          padding: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: #94a3b8;
          white-space: pre-wrap;
          overflow-x: auto;
          max-height: 420px;
          overflow-y: auto;
        }

        /* ── HISTORY ── */
        .history-box {
          background: rgba(15,20,40,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }

        .history-item {
          padding: 14px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.15s;
        }

        .history-item:last-child { border-bottom: none; }
        .history-item:hover { background: rgba(255,255,255,0.02); }

        .history-q {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 3px;
          font-weight: 500;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .history-a {
          font-size: 11px;
          color: #334155;
          font-family: 'DM Mono', monospace;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ── SPINNER ── */
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.15);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .thinking-dots { display: flex; gap: 4px; align-items: center; padding: 24px; }
        .thinking-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #6366f1;
          animation: blink 1.2s ease-in-out infinite;
        }
        .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink { 0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }

        .cursor-blink {
          display: inline-block;
          animation: cur 1s steps(1) infinite;
          color: #6366f1;
        }

        @keyframes cur { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* ── EMPTY STATE ── */
        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center;
          padding: 60px 24px;
          text-align: center;
          gap: 12px;
        }

        .empty-icon {
          width: 48px; height: 48px;
          border-radius: 16px;
          background: rgba(99,102,241,0.1);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }

        .empty-icon svg { width: 24px; height: 24px; color: #6366f1; opacity: 0.7; }
        .empty-title { font-size: 14px; font-weight: 500; color: #475569; }
        .empty-sub { font-size: 12px; color: #334155; max-width: 280px; line-height: 1.6; }
      `}</style>

      <div className="app-shell">
        <div className="bg-grid" />
        <div className="bg-glow" />

        <div className="content">
          {/* Header */}
          <header>
            <div className="logo-group">
              <div className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="logo-name">ChatQL</span>
              <span className="logo-badge">AI</span>
            </div>
            <div className="header-status">
              <span className="status-dot" />
              <span>All systems operational</span>
            </div>
          </header>

          {/* Hero */}
          <div className="hero">
            <div className="hero-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Natural Language SQL Interface
            </div>
            <h1 className="hero-title">
              Query any data source<br /><span>with plain English</span>
            </h1>
            <p className="hero-sub">
              Connect your database, ask questions naturally — get instant, intelligent answers powered by AI.
            </p>
          </div>

          {/* Workspace */}
          <div className="workspace">

            {/* LEFT: Connection Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              <div className="panel">
                <div className="panel-header">
                  <div className="panel-icon" style={{ background: "rgba(99,102,241,0.12)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                  </div>
                  <span className="panel-title">Data Source</span>
                </div>

                <div className="source-grid">
                  {dataSources.map(src => (
                    <button
                      key={src.id}
                      className={`source-btn${activeTab === src.id ? " active" : ""}`}
                      onClick={() => { setActiveTab(src.id); setFile(null); setUrlValue(""); setConnStr(""); }}
                    >
                      {activeTab === src.id && <span className="active-pip" />}
                      <div className="source-icon-wrap" style={{
                        background: activeTab === src.id ? `${src.color}18` : "rgba(255,255,255,0.04)",
                        color: activeTab === src.id ? src.color : "#475569"
                      }}>
                        {src.icon}
                      </div>
                      <span className="source-name">{src.name}</span>
                    </button>
                  ))}
                </div>

                <div className="connect-area">
                  <span className="connect-label">{activeSource.label}</span>

                  {isFileSource ? (
                    <>
                      <input
                        type="file"
                        accept={activeSource.accept}
                        style={{ display: "none" }}
                        ref={fileRef}
                        onChange={e => setFile(e.target.files?.[0] || null)}
                      />
                      <div className="drop-zone" onClick={() => fileRef.current?.click()}>
                        <div className="drop-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        {file
                          ? <p className="file-chosen">{file.name}</p>
                          : <>
                            <p className="drop-title">Drop file or click to browse</p>
                            <p className="drop-sub">{activeSource.accept} files only</p>
                          </>
                        }
                      </div>
                    </>
                  ) : (
                    <input
                      type="text"
                      className="text-input"
                      placeholder={activeSource.placeholder}
                      value={isUrlSource ? urlValue : connStr}
                      onChange={e => isUrlSource ? setUrlValue(e.target.value) : setConnStr(e.target.value)}
                    />
                  )}

                  <button
                    className="connect-btn"
                    onClick={uploadDB}
                    disabled={isUploading || !canConnect}
                  >
                    {isUploading
                      ? <><div className="spinner" /> Connecting…</>
                      : <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Connect {activeSource.name}
                      </>
                    }
                  </button>

                  {dbName && (
                    <div className="connection-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Connected: {dbDisplayName}
                    </div>
                  )}
                </div>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="history-box">
                  <div className="panel-header">
                    <div className="panel-icon" style={{ background: "rgba(99,102,241,0.08)" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="panel-title">Recent Queries</span>
                  </div>
                  {history.map((h, i) => (
                    <div key={i} className="history-item" onClick={() => { setAnswer(h.a); setAnimateAnswer(false); }}>
                      <p className="history-q">{h.q}</p>
                      <p className="history-a">{h.a.slice(0, 90)}{h.a.length > 90 ? "…" : ""}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Query + Result */}
            <div className="query-panel">

              {/* Query Input */}
              <div className="query-box">
                <div className="query-input-wrap">
                  <textarea
                    className="query-textarea"
                    placeholder={dbName ? "Ask anything about your data… e.g. Show top 10 customers by revenue" : "Connect a data source to start querying…"}
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        if (dbName && question.trim() && !isQuerying) askQuestion()
                      }
                    }}
                    disabled={!dbName}
                    rows={2}
                  />
                  <button
                    className="send-btn"
                    onClick={askQuestion}
                    disabled={!dbName || isQuerying || !question.trim()}
                  >
                    {isQuerying
                      ? <div className="spinner" />
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    }
                  </button>
                </div>
                <div className="query-hints">
                  {["Top 10 by revenue", "Count by category", "Monthly trends", "Show all columns", "Filter last 30 days"].map(hint => (
                    <button
                      key={hint}
                      className="hint-chip"
                      onClick={() => setQuestion(hint)}
                      disabled={!dbName}
                    >{hint}</button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="answer-box">
                {isQuerying ? (
                  <div className="thinking-dots">
                    <span /><span /><span />
                  </div>
                ) : answer ? (
                  <>
                    <div className="answer-header">
                      <div className="answer-label">
                        <span className="answer-label-dot" />
                        Result
                      </div>
                      <button
                        onClick={() => navigator.clipboard?.writeText(answer)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <div className="answer-body">
                      {animateAnswer ? <TypewriterText text={answer} /> : answer}
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                    <p className="empty-title">Ready to query</p>
                    <p className="empty-sub">Connect a data source and ask a question in plain English to see AI-generated results here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}