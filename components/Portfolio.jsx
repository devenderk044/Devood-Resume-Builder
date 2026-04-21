// filepath: components/Portfolio.jsx
import { Icon } from './Icon';

export function Portfolio({ resume, notify }) {
  const deployOptions = [
    { name: 'Vercel', desc: 'Fastest · Free tier', icon: '▲', color: '#fff' },
    {
      name: 'Netlify',
      desc: 'JAMstack · Auto CI/CD',
      icon: '◈',
      color: '#00d4ff',
    },
    {
      name: 'GitHub Pages',
      desc: 'Free with GitHub',
      icon: '⌗',
      color: '#7eb8ff',
    },
  ];

  const includedSections = [
    'Hero + Contact',
    'About Me',
    'Tech Stack',
    'Featured Projects',
    'Work Experience',
    'Education & Certs',
  ];

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
          Portfolio Generator
        </h1>
        <p style={{ color: '#4a7aab', marginTop: '4px' }}>
          Generate a professional portfolio website from your resume in one
          click.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '20px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #1e3a5f',
            boxShadow: '0 20px 60px #00000060',
          }}
        >
          <div
            style={{
              background: '#0d1117',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {['#f87171', '#fbbf24', '#00d4ff'].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: c,
                }}
              />
            ))}
            <div
              style={{
                flex: 1,
                background: '#1e3a5f',
                borderRadius: '4px',
                padding: '3px 10px',
                marginLeft: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '11px',
                  color: '#4a7aab',
                }}
              >
                {resume.personal.portfolio || 'alexchen.dev'}
              </span>
            </div>
          </div>
          <div style={{ background: '#080c14' }}>
            <div
              style={{
                background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
                padding: '40px',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: 'linear-gradient(135deg,#00d4ff,#0077ff)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {resume.personal.name.charAt(0)}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>
                {resume.personal.name}
              </div>
              <div
                style={{ color: '#00d4ff', fontSize: '13px', marginTop: '4px' }}
              >
                Full-Stack Developer · MERN Stack
              </div>
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    background: '#ffffff18',
                    border: '1px solid #ffffff30',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '11px',
                    color: '#ddd',
                  }}
                >
                  ✉ {resume.personal.email}
                </span>
                <span
                  style={{
                    background: '#ffffff18',
                    border: '1px solid #ffffff30',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '11px',
                    color: '#ddd',
                  }}
                >
                  ⌗ {resume.personal.github}
                </span>
              </div>
            </div>
            <div
              style={{
                padding: '24px 32px',
                borderBottom: '1px solid #1e2a40',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#00d4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}
              >
                About Me
              </div>
              <p
                style={{ color: '#9bb8d4', lineHeight: 1.7, fontSize: '12px' }}
              >
                {resume.summary}
              </p>
            </div>
            <div
              style={{
                padding: '20px 32px',
                borderBottom: '1px solid #1e2a40',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#00d4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '10px',
                }}
              >
                Tech Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {Object.values(resume.skills)
                  .flat()
                  .map((s) => (
                    <span
                      key={s}
                      style={{
                        background: '#0d1f38',
                        border: '1px solid #1e3a5f',
                        color: '#7eb8ff',
                        padding: '3px 9px',
                        borderRadius: '5px',
                        fontSize: '10px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
              </div>
            </div>
            <div style={{ padding: '20px 32px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#00d4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                }}
              >
                Featured Projects
              </div>
              {resume.projects.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: '#0d1825',
                    border: '1px solid #1e3a5f',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#e2e8f0',
                      fontSize: '12px',
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      color: '#7eb8ff',
                      fontSize: '11px',
                      marginTop: '3px',
                    }}
                  >
                    {p.description}
                  </div>
                  <div
                    style={{ display: 'flex', gap: '10px', marginTop: '6px' }}
                  >
                    {p.github && (
                      <span style={{ color: '#00d4ff', fontSize: '10px' }}>
                        ⌗ GitHub
                      </span>
                    )}
                    {p.live && (
                      <span style={{ color: '#00d4ff', fontSize: '10px' }}>
                        ↗ Live
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card">
            <div className="section-title">Deploy Portfolio</div>
            {deployOptions.map((p) => (
              <button
                key={p.name}
                onClick={() => notify(`Deploying to ${p.name}...`)}
                style={{
                  width: '100%',
                  background: '#0a1628',
                  border: '1px solid #152236',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = '#2e5080')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = '#152236')
                }
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: '#0d1f38',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    color: p.color,
                    border: '1px solid #1e3a5f',
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '13px',
                    }}
                  >
                    Deploy to {p.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4a7aab' }}>
                    {p.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="card">
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#e2e8f0',
                marginBottom: '12px',
              }}
            >
              Included Sections
            </div>
            {includedSections.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '7px',
                  fontSize: '13px',
                  color: '#7eb8ff',
                }}
              >
                <Icon name="check" size={13} color="#00d4ff" /> {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
