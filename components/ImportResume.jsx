import { useState, useRef } from 'react';
import { Icon } from './Icon';
import { useResumeStore } from '../lib/store';
import { loadScript } from '../lib/utils';
import { callAI } from './callAI';
import { defaultResume } from '../lib/defaultResume';

const SCHEMA_HINT = `{
  "personal": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "portfolio": "" },
  "summary": "",
  "skills": { "Frontend": [], "Backend": [], "Database": [], "Tools": [] },
  "experience": [{ "id": 1, "company": "", "role": "", "duration": "", "responsibilities": "bullet1\\nbullet2", "technologies": "" }],
  "projects": [{ "id": 1, "title": "", "description": "", "technologies": "", "github": "", "live": "" }],
  "education": [{ "id": 1, "institution": "", "degree": "", "duration": "", "gpa": "" }],
  "certifications": [{ "id": 1, "name": "", "issuer": "", "year": "" }],
  "achievements": [""]
}`;

const extractJson = (text) => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('No JSON object found in response');
  return JSON.parse(raw.slice(start, end + 1));
};

const mergeResume = (parsed) => ({
  ...defaultResume,
  ...parsed,
  personal: { ...defaultResume.personal, ...(parsed.personal || {}) },
  skills: parsed.skills || defaultResume.skills,
  experience: parsed.experience?.length
    ? parsed.experience
    : defaultResume.experience,
  projects: parsed.projects?.length ? parsed.projects : defaultResume.projects,
  education: parsed.education?.length
    ? parsed.education
    : defaultResume.education,
  certifications: parsed.certifications || defaultResume.certifications,
  achievements: parsed.achievements || defaultResume.achievements,
});

async function extractPdfText(file) {
  await loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  );
  const pdfjsLib = window.pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let out = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    out += content.items.map((it) => it.str).join(' ') + '\n';
  }
  return out;
}

const STEP_IDLE = 'idle';
const STEP_EXTRACTING = 'extracting';
const STEP_PARSING = 'parsing';
const STEP_REVIEW = 'review';

const STEPS = [
  {
    n: '01',
    icon: 'upload',
    title: 'Upload PDF',
    desc: 'Drop your existing resume — any standard PDF works best',
    color: '#00d4ff',
    bg: '#0b2340',
  },
  {
    n: '02',
    icon: 'spark',
    title: 'AI Auto-fills',
    desc: 'Claude reads your resume and fills all fields automatically',
    color: '#a855f7',
    bg: '#1e1440',
  },
  {
    n: '03',
    icon: 'download',
    title: 'Edit & Download',
    desc: 'Switch templates, edit any field, then download as PDF',
    color: '#4ade80',
    bg: '#0a2a1a',
  },
];

const TIPS = [
  'Use a text-based PDF (not a scanned image)',
  'Simpler formatting = better AI parsing',
  'After import, check all fields carefully',
  'Switch any template from Resume Builder',
];

export function ImportResume({ notify, setPage }) {
  const setResume = useResumeStore((s) => s.setResume);

  const [step, setStep] = useState(STEP_IDLE);
  const [dragging, setDragging] = useState(false);
  const [parsedJson, setParsedJson] = useState('');
  const [parsed, setParsed] = useState(null);
  const [err, setErr] = useState(null);
  const fileRef = useRef(null);

  const runAIParse = async (text) => {
    setStep(STEP_PARSING);
    const prompt = `You are a resume parser. Extract structured data from the resume text below and output ONLY a JSON object (no prose, no code fences) matching this exact shape:\n\n${SCHEMA_HINT}\n\nRules: keep arrays empty if no data; skills must be grouped by category; responsibilities is a single string with \\n between bullets; ids should be sequential integers.\n\nRESUME TEXT:\n"""\n${text.slice(0, 12000)}\n"""`;
    try {
      const raw = await callAI(prompt, { json: true });
      const json = extractJson(raw);
      const merged = mergeResume(json);
      setParsed(merged);
      setParsedJson(JSON.stringify(merged, null, 2));
      setStep(STEP_REVIEW);
      setErr(null);
      notify('✨ AI extraction complete — review and confirm');
    } catch (e) {
      setErr(e.message);
      setStep(STEP_IDLE);
      notify('❌ Could not parse with AI — ' + e.message, 'error');
    }
  };

  const handleFile = async (file) => {
    if (!file) return;
    setErr(null);
    const name = file.name.toLowerCase();
    try {
      if (name.endsWith('.json')) {
        const text = await file.text();
        const merged = mergeResume(JSON.parse(text));
        setParsed(merged);
        setParsedJson(JSON.stringify(merged, null, 2));
        setStep(STEP_REVIEW);
        notify('📄 JSON loaded — review and confirm');
        return;
      }
      setStep(STEP_EXTRACTING);
      let text = '';
      if (name.endsWith('.pdf')) {
        text = await extractPdfText(file);
      } else if (name.endsWith('.txt') || name.endsWith('.md')) {
        text = await file.text();
      } else {
        throw new Error('Supported: PDF, TXT');
      }
      if (!text.trim()) throw new Error('Could not read any text from file');
      await runAIParse(text);
    } catch (e) {
      setErr(e.message);
      setStep(STEP_IDLE);
      notify('❌ ' + e.message, 'error');
    }
  };

  const confirmImport = () => {
    try {
      const final = parsedJson ? JSON.parse(parsedJson) : parsed;
      setResume(final);
      notify('✅ Resume imported!');
      setPage?.('builder');
    } catch (e) {
      setErr('JSON invalid: ' + e.message);
    }
  };

  const startOver = () => {
    setStep(STEP_IDLE);
    setParsedJson('');
    setParsed(null);
    setErr(null);
  };

  const busy = step === STEP_EXTRACTING || step === STEP_PARSING;

  if (step === STEP_REVIEW && parsed) {
    return (
      <div className="fade-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '22px' }}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '28px',
              fontWeight: 800,
              color: '#e2e8f0',
              letterSpacing: '-0.5px',
            }}
          >
            Review &amp; Import
          </h1>
          <div style={{ color: '#7a9abf', fontSize: '13px', marginTop: '4px' }}>
            AI extracted these fields. Edit anything before importing.
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '18px',
            marginBottom: '16px',
            background: '#0a1f14',
            border: '1px solid #1d5a3a',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            <Icon name="check" size={16} color="#4ade80" />
            <strong style={{ color: '#4ade80', fontSize: '13px' }}>
              Extracted successfully
            </strong>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
              gap: '12px',
            }}
          >
            {[
              ['Name', parsed.personal?.name || '—'],
              ['Email', parsed.personal?.email || '—'],
              [
                'Skills',
                Object.values(parsed.skills || {}).flat().length + ' items',
              ],
              ['Experience', (parsed.experience?.length || 0) + ' roles'],
              ['Projects', (parsed.projects?.length || 0) + ' projects'],
              ['Education', (parsed.education?.length || 0) + ' entries'],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#7a9abf',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {k}
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
                  {String(v)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <label>Review &amp; edit JSON before import</label>
          <textarea
            rows={16}
            value={parsedJson}
            onChange={(e) => setParsedJson(e.target.value)}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11.5px',
            }}
          />
          {err && (
            <div
              style={{
                marginTop: '8px',
                color: '#f87171',
                fontSize: '12px',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              ⚠ {err}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button className="btn-primary" onClick={confirmImport}>
              <Icon name="check" size={14} color="#fff" /> Confirm &amp; Import
            </button>
            <button className="btn-secondary" onClick={startOver}>
              <Icon name="upload" size={12} color="#7eb8ff" /> Try another file
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ marginBottom: '22px' }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '32px',
            fontWeight: 800,
            color: '#e2e8f0',
            letterSpacing: '-0.5px',
          }}
        >
          Import Your Resume
        </h1>
        <div style={{ color: '#7a9abf', fontSize: '13.5px', marginTop: '6px' }}>
          Upload your PDF or TXT resume — AI will auto-fill all fields. Then
          pick any template and edit freely.
        </div>
      </div>

      <div
        className={`dropzone${dragging ? ' drag' : ''}`}
        onClick={() => !busy && fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!busy) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (busy) return;
          handleFile(e.dataTransfer.files?.[0]);
        }}
        style={{ padding: '42px 28px', marginBottom: '22px' }}
      >
        {busy ? (
          <div>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '1.5px dashed #00d4ff55',
                background: '#0b2340',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
              }}
            >
              <span className="spin-el-blue" />
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#e2e8f0',
              }}
            >
              {step === STEP_EXTRACTING
                ? 'Extracting text…'
                : 'AI is structuring your resume…'}
            </div>
            <div
              style={{ color: '#4a7aab', fontSize: '12px', marginTop: '4px' }}
            >
              This takes a few seconds
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '1.5px dashed #00d4ff55',
                background: '#0b2340',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
              }}
            >
              <Icon name="upload" size={28} color="#00d4ff" />
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#e2e8f0',
                marginBottom: '6px',
              }}
            >
              Drop your resume file here
            </div>
            <div
              style={{
                color: '#7a9abf',
                fontSize: '12.5px',
                marginBottom: '20px',
              }}
            >
              PDF or TXT supported · AI will auto-fill all fields
            </div>
            <button
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
              style={{ fontSize: '14px', padding: '12px 24px' }}
            >
              <Icon name="upload" size={14} color="#fff" /> Browse &amp; Upload
              File
            </button>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <span className="tag">PDF</span>
              <span className="tag">TXT</span>
            </div>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.txt,.md,.json,application/pdf,application/json,text/plain"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {err && (
        <div
          className="card"
          style={{
            background: '#1f0a0a',
            border: '1px solid #5c1d1d',
            padding: '14px 16px',
            marginBottom: '16px',
            color: '#f87171',
            fontSize: '12.5px',
          }}
        >
          ⚠ {err}
        </div>
      )}

      <div className="card" style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#e2e8f0',
            marginBottom: '18px',
          }}
        >
          How it works — 3 simple steps
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
            gap: '14px',
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: '#0a1220',
                border: '1px solid #152236',
                borderRadius: '12px',
                padding: '18px 16px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: s.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  border: `1px solid ${s.color}44`,
                }}
              >
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#4a7aab',
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: '4px',
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#e2e8f0',
                  marginBottom: '6px',
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: '11.5px',
                  color: '#7a9abf',
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="card"
        style={{
          background: '#0a1628',
          border: '1px solid #1e3a5f',
          padding: '16px 18px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#00d4ff',
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}
        >
          ✦ Tips for best results
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '8px 20px',
          }}
        >
          {TIPS.map((t) => (
            <div
              key={t}
              style={{
                color: '#7eb8ff',
                fontSize: '12.5px',
                display: 'flex',
                gap: '6px',
              }}
            >
              <span style={{ color: '#00d4ff' }}>→</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
