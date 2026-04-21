// filepath: components/Templates.jsx
import { ResumePreview } from './ResumePreview';
import { templates } from '../lib/defaultResume';

export function Templates({ resume, template, setTemplate, notify }) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: '26px',
            fontWeight: 800,
            color: '#e2e8f0',
          }}
        >
          Resume Templates
        </h1>
        <p style={{ color: '#4a7aab', marginTop: '4px' }}>
          {templates.length} professional ATS-optimized templates. Switch
          instantly — your data stays.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
          gap: '20px',
        }}
      >
        {templates.map((t) => (
          <div
            key={t.id}
            className="card"
            style={{
              cursor: 'pointer',
              transition: 'border-color .2s,transform .2s',
              border:
                template === t.id ? '1px solid #00d4ff' : '1px solid #152236',
            }}
            onClick={() => {
              setTemplate(t.id);
              notify(`Template: ${t.name}`);
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'translateY(-3px)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'translateY(0)')
            }
          >
            <div
              style={{
                height: '180px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '14px',
                border: '1px solid #1e3a5f',
                position: 'relative',
              }}
            >
              <div
                style={{
                  transform: 'scale(0.36)',
                  transformOrigin: 'top left',
                  width: '278%',
                  height: '278%',
                  pointerEvents: 'none',
                }}
              >
                <ResumePreview data={resume} template={t.id} />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#e2e8f0',
                    fontSize: '14px',
                  }}
                >
                  {t.name}
                </div>
              </div>
              {template === t.id ? (
                <span
                  style={{
                    background: '#0d3a20',
                    border: '1px solid #00d4ff55',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    color: '#00d4ff',
                  }}
                >
                  Active
                </span>
              ) : (
                <button
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  Use
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
