// filepath: components/AIAssistant.jsx
import { useState } from 'react';
import { Icon } from './Icon';
import { callAI } from './callAI';

export function AIAssistant({ resume }) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');

  const quickPrompts = [
    'Improve my summary',
    'Suggest missing MERN skills',
    'Rewrite project descriptions',
    'Best action verbs for devs',
    'Make resume more ATS-friendly',
  ];

  const sendAI = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiInput('');
    setAiMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setAiLoading(true);
    const prompt = `You are an expert resume coach for MERN stack developers. Resume: Name: ${resume.personal.name}, Skills: ${Object.values(resume.skills).flat().join(', ')}, Experience: ${resume.experience.map((e) => e.role + ' at ' + e.company).join(', ')}. User question: ${userMsg}. Be concise, specific, and actionable.`;
    try {
      const response = await callAI(prompt);
      setAiMessages((m) => [...m, { role: 'ai', text: response }]);
    } catch (e) {
      setAiMessages((m) => [
        ...m,
        { role: 'ai', text: '⚠ ' + (e.message || 'AI request failed') },
      ]);
    }
    setAiLoading(false);
  };

  return (
    <div
      className="fade-up"
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        height: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: '26px',
            fontWeight: 800,
            color: '#e2e8f0',
          }}
        >
          AI Resume Assistant
        </h1>
        <p style={{ color: '#4a7aab', marginTop: '4px' }}>
          Get personalized resume coaching powered by Claude AI.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => setAiInput(p)}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            {p}
          </button>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#0a1220',
          borderRadius: '12px',
          border: '1px solid #152236',
          padding: '16px',
          marginBottom: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {aiMessages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div
              style={{
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg,#00d4ff22,#0077ff22)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '1px solid #1e3a5f',
              }}
            >
              <Icon name="brain" size={28} color="#00d4ff" />
            </div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#e2e8f0',
                marginBottom: '8px',
              }}
            >
              Your AI Resume Coach
            </div>
            <div style={{ color: '#4a7aab', fontSize: '14px' }}>
              Ask me to improve your summary, rewrite bullet points, or optimize
              for ATS.
            </div>
          </div>
        )}
        {aiMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg,#0077ff,#00d4ff)'
                    : 'linear-gradient(135deg,#302b63,#24243e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {msg.role === 'user' ? (
                <span
                  style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}
                >
                  AC
                </span>
              ) : (
                <Icon name="brain" size={14} color="#00d4ff" />
              )}
            </div>
            <div
              style={{
                maxWidth: '85%',
                background: msg.role === 'user' ? '#0d2a50' : '#0d1825',
                border: `1px solid ${msg.role === 'user' ? '#1e4a80' : '#152236'}`,
                borderRadius:
                  msg.role === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                padding: '12px 16px',
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {aiLoading && (
          <div
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#302b63,#24243e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="brain" size={14} color="#00d4ff" />
            </div>
            <div
              style={{
                background: '#0d1825',
                border: '1px solid #152236',
                borderRadius: '14px 14px 14px 0',
                padding: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', gap: '5px' }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#00d4ff',
                      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendAI()}
          placeholder="Ask me to improve your resume..."
          style={{ flex: 1 }}
        />
        <button
          className="btn-primary"
          onClick={sendAI}
          disabled={aiLoading || !aiInput.trim()}
          style={{ padding: '10px 20px' }}
        >
          {aiLoading ? (
            <span className="spin-el" />
          ) : (
            <Icon name="spark" size={15} color="#fff" />
          )}
        </button>
      </div>
    </div>
  );
}
