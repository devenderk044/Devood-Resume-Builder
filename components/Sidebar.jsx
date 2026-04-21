// filepath: components/Sidebar.jsx
import { Icon } from './Icon';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'import', label: 'Import Resume', icon: 'resume', badge: 'AI' },
  { id: 'builder', label: 'Resume Builder', icon: 'resume' },
  { id: 'templates', label: 'Templates', icon: 'template' },
  { id: 'ats', label: 'ATS Scanner', icon: 'ats' },
  { id: 'ai', label: 'AI Assistant', icon: 'brain' },
  { id: 'portfolio', label: 'Portfolio', icon: 'portfolio' },
];

export function Sidebar({ page, setPage, sidebarOpen, setSidebarOpen }) {
  return (
    <div
      style={{
        width: sidebarOpen ? '220px' : '60px',
        background: '#0a1220',
        borderRight: '1px solid #152236',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width .25s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: '20px 16px',
          borderBottom: '1px solid #152236',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {sidebarOpen && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: 'linear-gradient(135deg,#00d4ff,#0077ff)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="zap" size={16} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                background: 'linear-gradient(135deg,#00d4ff,#7eb8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DevResume
            </span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="btn-ghost"
          style={{ padding: '6px' }}
        >
          <Icon name="menu" size={18} color="#4a7aab" />
        </button>
      </div>
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              width: '100%',
              background: page === item.id ? '#0d1f38' : 'transparent',
              border:
                page === item.id
                  ? '1px solid #1e3a5f'
                  : '1px solid transparent',
              borderRadius: '8px',
              padding: sidebarOpen ? '10px 12px' : '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginBottom: '3px',
              transition: 'all .2s',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <Icon
              name={item.icon}
              size={16}
              color={page === item.id ? '#00d4ff' : '#4a7aab'}
            />
            {sidebarOpen && (
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: page === item.id ? 600 : 400,
                  color: page === item.id ? '#e2e8f0' : '#7a9abf',
                  whiteSpace: 'nowrap',
                  flex: 1,
                  textAlign: 'left',
                }}
              >
                {item.label}
              </span>
            )}
            {sidebarOpen && item.badge && (
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '999px',
                  background: '#0a2a1a',
                  color: '#4ade80',
                  border: '1px solid #1d5a3a',
                  letterSpacing: '0.05em',
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div style={{ padding: '12px 8px', borderTop: '1px solid #152236' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            background: '#0d1825',
            borderRadius: '8px',
            border: '1px solid #152236',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: 'linear-gradient(135deg,#00d4ff22,#0077ff22)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #1e3a5f',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '12px' }}>AC</span>
          </div>
          {sidebarOpen && (
            <div>
              <div
                style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0' }}
              >
                Alex Chen
              </div>
              <div style={{ fontSize: '10px', color: '#4a7aab' }}>Pro Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
