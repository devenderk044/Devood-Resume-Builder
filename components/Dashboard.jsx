// filepath: components/Dashboard.jsx
import { Icon } from './Icon';

export function Dashboard({ setPage, downloadPDF }) {
  const stats = [
    { label: 'Resumes', value: '4', icon: 'resume', color: '#00d4ff' },
    { label: 'Avg ATS Score', value: '82%', icon: 'ats', color: '#00ff9d' },
    { label: 'Templates', value: '3', icon: 'template', color: '#7b6fff' },
    { label: 'AI Uses', value: '24', icon: 'brain', color: '#ff7b6f' },
  ];

  const resumes = [
    {
      id: 1,
      name: 'MERN Developer Resume',
      updated: '2 hours ago',
      score: 87,
      tmpl: 'modern',
    },
    {
      id: 2,
      name: 'Senior Frontend Dev',
      updated: '3 days ago',
      score: 74,
      tmpl: 'corporate',
    },
  ];

  const quickActions = [
    { label: 'AI Improve Summary', icon: 'spark', action: () => setPage('ai') },
    { label: 'ATS Score Check', icon: 'ats', action: () => setPage('ats') },
    {
      label: 'Browse Templates',
      icon: 'template',
      action: () => setPage('templates'),
    },
    {
      label: 'Generate Portfolio',
      icon: 'portfolio',
      action: () => setPage('portfolio'),
    },
  ];

  return (
    <div className="fade-up">
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: '28px',
            fontWeight: 800,
            color: '#e2e8f0',
          }}
        >
          Welcome back, Alex 👋
        </h1>
        <p style={{ color: '#4a7aab', marginTop: '4px', fontSize: '14px' }}>
          Manage your resumes, track ATS scores, and optimize your job
          applications.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="card"
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: `${s.color}18`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${s.color}30`,
              }}
            >
              <Icon name={s.icon} size={20} color={s.color} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  color: '#e2e8f0',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: '#4a7aab' }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '20px',
        }}
      >
        <div className="card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <span className="section-title" style={{ marginBottom: 0 }}>
              My Resumes
            </span>
            <button
              className="btn-primary"
              onClick={() => setPage('builder')}
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              <Icon name="plus" size={13} color="#fff" /> New Resume
            </button>
          </div>
          {resumes.map((r) => (
            <div
              key={r.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: '#0a1628',
                borderRadius: '10px',
                border: '1px solid #152236',
                marginBottom: '10px',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#0d1f38',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #1e3a5f',
                  }}
                >
                  <Icon name="resume" size={16} color="#00d4ff" />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '14px',
                    }}
                  >
                    {r.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4a7aab' }}>
                    Updated {r.updated}
                  </div>
                </div>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color:
                        r.score >= 80
                          ? '#00ff9d'
                          : r.score >= 60
                            ? '#fbbf24'
                            : '#f87171',
                    }}
                  >
                    {r.score}
                  </div>
                  <div style={{ fontSize: '10px', color: '#4a7aab' }}>ATS</div>
                </div>
                <button
                  className="btn-ghost"
                  onClick={() => setPage('builder')}
                >
                  <Icon name="edit" size={14} color="#4a7aab" />
                </button>
                <button className="btn-ghost" onClick={downloadPDF}>
                  <Icon name="download" size={14} color="#4a7aab" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title" style={{ fontSize: '15px' }}>
            Quick Actions
          </div>
          {quickActions.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              style={{
                width: '100%',
                background: '#0a1628',
                border: '1px solid #152236',
                borderRadius: '8px',
                padding: '11px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                marginBottom: '8px',
                color: '#7eb8ff',
                fontSize: '13px',
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0d1f38';
                e.currentTarget.style.borderColor = '#2e5080';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0a1628';
                e.currentTarget.style.borderColor = '#152236';
              }}
            >
              <Icon name={item.icon} size={15} color="#00d4ff" /> {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
