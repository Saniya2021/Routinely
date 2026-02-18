import { useState, useEffect } from "react"

const API = "http://localhost:8000"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink: #0f0e0d;
    --paper: #f5f0e8;
    --accent: #c84b2f;
    --muted: #8a8070;
    --line: #d4cdc0;
    --green: #2d6a4f;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app-nav {
    background: var(--ink);
    color: var(--paper);
    padding: 0.75rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid var(--accent);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-logo {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 1rem;
    color: var(--accent);
  }

  .nav-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #8a8070;
  }

  .hero {
    background: var(--ink);
    color: var(--paper);
    padding: 3.5rem 2rem 3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 39px,
      rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px
    );
    pointer-events: none;
  }

  .hero h1 {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
    position: relative;
  }

  .hero h1 em {
    color: var(--accent);
    font-style: italic;
  }

  .hero-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #8a8070;
    letter-spacing: 1px;
    margin-top: 0.75rem;
    position: relative;
  }

  .container {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 2.5rem 8vw;
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--line);
  }

  .form-card {
    background: white;
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.75rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .field {
    margin-bottom: 1.25rem;
  }

  .field label {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .field label span {
    color: var(--accent);
  }

  .field textarea {
    width: 100%;
    background: var(--paper);
    border: 1.5px solid var(--line);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: var(--ink);
    resize: none;
    outline: none;
    transition: border-color 0.15s;
    line-height: 1.5;
  }

  .field textarea:focus {
    border-color: var(--accent);
    background: white;
  }

  .field textarea::placeholder {
    color: #b0a898;
  }

  .submit-btn {
    width: 100%;
    background: var(--ink);
    color: var(--paper);
    border: none;
    padding: 0.85rem 1.5rem;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    background: var(--accent);
  }

  .submit-btn:active:not(:disabled) {
    transform: scale(0.99);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .saved-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: #e8f5ee;
    color: var(--green);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    padding: 0.4rem 0.85rem;
    border-radius: 100px;
    margin-top: 0.75rem;
    border: 1px solid #c0e0cc;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .entry-card {
    background: white;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 0.85rem;
    transition: border-color 0.15s, box-shadow 0.15s;
    animation: fadeIn 0.3s ease;
  }

  .entry-card:hover {
    border-color: #b0a898;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }

  .entry-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
  }

  .entry-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .delete-btn {
    background: none;
    border: 1px solid var(--line);
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .delete-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .entry-row {
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: 0.5rem 1rem;
    font-size: 0.88rem;
    margin-bottom: 0.35rem;
    line-height: 1.5;
  }

  .entry-row:last-child { margin-bottom: 0; }

  .entry-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-top: 2px;
  }

  .entry-val { color: #3d3830; }

  .empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    border: 1.5px dashed var(--line);
    border-radius: 8px;
  }
`

export default function App() {
  const [standups, setStandups] = useState([])
  const [yesterday, setYesterday] = useState("")
  const [today, setToday] = useState("")
  const [blockers, setBlockers] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetchStandups() }, [])

  async function fetchStandups() {
    const res = await fetch(`${API}/standups`)
    const data = await res.json()
    setStandups(data)
  }

  async function handleSubmit() {
    if (!yesterday || !today) return alert("Fill in yesterday and today!")
    setLoading(true)
    await fetch(`${API}/standups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yesterday, today, blockers })
    })
    setYesterday(""); setToday(""); setBlockers("")
    setLoading(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    fetchStandups()
  }

  async function handleDelete(id) {
    await fetch(`${API}/standups/${id}`, { method: "DELETE" })
    fetchStandups()
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long", month: "short", day: "numeric"
    })
  }

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  })

  return (
    <>
      <style>{styles}</style>

      <nav className="app-nav">
        <span className="nav-logo">Routinely</span>
        <span className="nav-date">{todayStr}</span>
      </nav>

      <div className="hero">
        <h1>Today's<br /><em>Standup</em></h1>
        <p className="hero-sub">log it · track it · ship it</p>
      </div>

      <div className="container">

        <div className="section-label">New Entry</div>

        <div className="form-card">
          <div className="field">
            <label>✅ Yesterday — <span>what did you accomplish?</span></label>
            <textarea
              rows={3}
              value={yesterday}
              onChange={e => setYesterday(e.target.value)}
              placeholder="Finished the login page, reviewed 3 PRs..."
            />
          </div>

          <div className="field">
            <label>🎯 Today — <span>what are you working on?</span></label>
            <textarea
              rows={3}
              value={today}
              onChange={e => setToday(e.target.value)}
              placeholder="Implementing the API endpoints, writing tests..."
            />
          </div>

          <div className="field">
            <label>🚧 Blockers — <span>anything in your way? (optional)</span></label>
            <textarea
              rows={2}
              value={blockers}
              onChange={e => setBlockers(e.target.value)}
              placeholder="Waiting on design assets..."
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Log Standup →"}
          </button>

          {saved && (
            <div className="saved-badge">✓ Standup logged</div>
          )}
        </div>

        <div className="section-label">Past Entries</div>

        {standups.length === 0 ? (
          <div className="empty-state">no entries yet — log your first standup above</div>
        ) : (
          standups.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-card-header">
                <div className="entry-date">{formatDate(entry.created_at)}</div>
                <button className="delete-btn" onClick={() => handleDelete(entry.id)}>delete</button>
              </div>
              <div className="entry-row">
                <span className="entry-key">Yesterday</span>
                <span className="entry-val">{entry.yesterday}</span>
              </div>
              <div className="entry-row">
                <span className="entry-key">Today</span>
                <span className="entry-val">{entry.today}</span>
              </div>
              {entry.blockers && (
                <div className="entry-row">
                  <span className="entry-key">Blockers</span>
                  <span className="entry-val">{entry.blockers}</span>
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </>
  )
}