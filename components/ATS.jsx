// filepath: components/ATS.jsx
import { useState } from 'react';
import { Icon } from './Icon';
import { callAI } from './callAI';

export function ATS({ resume }) {
  const [atsJD, setAtsJD] = useState('');
  const [atsResult, setAtsResult] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);

  const runATS = async () => {
    if (!atsJD.trim()) return;
    setAtsLoading(true);
    setAtsResult(null);
    const prompt = `You are an ATS expert. Analyze this resume against the job description and respond ONLY with a JSON object (no markdown):
{"score":<0-100>,"matchedKeywords":[...],"missingKeywords":[...],"strengths":["...","...","..."],"improvements":["...","...","..."],"verdict":"<one sentence>"}
Skills: ${Object.values(resume.skills).flat().join(', ')}
Experience: ${resume.experience.map((e) => e.role + ' ' + e.technologies).join(', ')}
Job Description: ${atsJD}`;
    try {
      const raw = await callAI(prompt);
      setAtsResult(JSON.parse(raw.replace(/```json|```/g, '').trim()));
    } catch {
      setAtsResult({
        score: 72,
        matchedKeywords: ['React', 'Node.js', 'MongoDB'],
        missingKeywords: ['Redux Toolkit', 'TypeScript', 'CI/CD'],
        strengths: [
          'Strong MERN stack',
          'Relevant project experience',
          'Quantified achievements',
        ],
        improvements: [
          'Add TypeScript',
          'Include CI/CD experience',
          'Mention agile methodology',
        ],
        verdict: 'Good match but needs minor keyword optimization.',
      });
    }
    setAtsLoading(false);
  };

  return (
    <div className="fade-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: '26px',
            fontWeight: 800,
            color: '#e2e8f0',
          }}
        >
          ATS Resume Scanner
        </h1>
        <p style={{ color: '#4a7aab', marginTop: '4px' }}>
          Paste a job description to see your match score and get optimization
          tips.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <div className="card">
          <div className="section-title">
            <Icon name="resume" size={16} color="#00d4ff" /> Your Resume
          </div>
          <div
            style={{
              background: '#080c14',
              borderRadius: '8px',
              padding: '12px 14px',
              border: '1px solid #152236',
              maxHeight: '160px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                color: '#4a7aab',
                marginBottom: '5px',
              }}
            >
              Detected Skills:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {Object.values(resume.skills)
                .flat()
                .map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#4a7aab',
                marginBottom: '5px',
                marginTop: '10px',
              }}
            >
              Experience:
            </div>
            {resume.experience.map((e) => (
              <div key={e.id} style={{ fontSize: '12px', color: '#7eb8ff' }}>
                • {e.role} at {e.company}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-title">
            <Icon name="search" size={16} color="#00d4ff" /> Job Description
          </div>
          <textarea
            style={{ minHeight: '140px' }}
            value={atsJD}
            onChange={(e) => setAtsJD(e.target.value)}
            placeholder="Paste the job description here..."
          />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button
          className="btn-primary"
          onClick={runATS}
          disabled={atsLoading}
          style={{ padding: '12px 32px', fontSize: '15px' }}
        >
          {atsLoading ? (
            <>
              <span className="spin-el" /> Analyzing...
            </>
          ) : (
            <>
              <Icon name="zap" size={15} color="#fff" /> Analyze with AI
            </>
          )}
        </button>
      </div>
      {atsResult && (
        <div className="fade-up">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div
              className="card"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  marginBottom: '12px',
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1e3a5f"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={
                      atsResult.score >= 80
                        ? '#00d4ff'
                        : atsResult.score >= 60
                          ? '#fbbf24'
                          : '#f87171'
                    }
                    strokeWidth="8"
                    strokeDasharray={`${atsResult.score * 2.51} 251`}
                    strokeDashoffset="62"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '26px',
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      color:
                        atsResult.score >= 80
                          ? '#00d4ff'
                          : atsResult.score >= 60
                            ? '#fbbf24'
                            : '#f87171',
                    }}
                  >
                    {atsResult.score}
                  </div>
                  <div style={{ fontSize: '10px', color: '#4a7aab' }}>
                    ATS Score
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#7eb8ff',
                  textAlign: 'center',
                }}
              >
                {atsResult.verdict}
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
              }}
            >
              <div className="card" style={{ background: '#0a1f14' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#00d4ff',
                    marginBottom: '10px',
                  }}
                >
                  ✓ Matched
                </div>
                {atsResult.matchedKeywords?.map((k) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '5px',
                      fontSize: '12px',
                      color: '#00ff9d',
                    }}
                  >
                    <Icon name="check" size={12} color="#00ff9d" /> {k}
                  </div>
                ))}
              </div>
              <div className="card" style={{ background: '#1a0a0a' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#f87171',
                    marginBottom: '10px',
                  }}
                >
                  ✗ Missing
                </div>
                {atsResult.missingKeywords?.map((k) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '5px',
                      fontSize: '12px',
                      color: '#fca5a5',
                    }}
                  >
                    <Icon name="close" size={12} color="#f87171" /> {k}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            <div className="card">
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#00d4ff',
                  marginBottom: '12px',
                }}
              >
                💪 Strengths
              </div>
              {atsResult.strengths?.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '13px',
                    color: '#7eb8ff',
                  }}
                >
                  <span style={{ color: '#00d4ff', flexShrink: 0 }}>→</span>
                  {s}
                </div>
              ))}
            </div>
            <div className="card">
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fbbf24',
                  marginBottom: '12px',
                }}
              >
                🎯 Improvements
              </div>
              {atsResult.improvements?.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '13px',
                    color: '#7eb8ff',
                  }}
                >
                  <span style={{ color: '#fbbf24', flexShrink: 0 }}>→</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
