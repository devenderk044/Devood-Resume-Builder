// filepath: components/Topbar.jsx
import { Icon } from './Icon';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'import', label: 'Import Resume', icon: 'resume' },
  { id: 'builder', label: 'Resume Builder', icon: 'resume' },
  { id: 'templates', label: 'Templates', icon: 'template' },
  { id: 'ats', label: 'ATS Scanner', icon: 'ats' },
  { id: 'ai', label: 'AI Assistant', icon: 'brain' },
  { id: 'portfolio', label: 'Portfolio', icon: 'portfolio' },
];

export function Topbar({
  page,
  notify,
  pdfLoading,
  downloadPDF,
  isDirty,
  markClean,
}) {
  return (
    <div
      style={{
        height: '56px',
        background: '#0a1220',
        borderBottom: '1px solid #152236',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#4a7aab', fontSize: '13px' }}>DevResume</span>
        <span style={{ color: '#1e3a5f' }}>/</span>
        <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 500 }}>
          {navItems.find((n) => n.id === page)?.label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            background: '#0a2040',
            border: '1px solid #1e3a5f',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '11px',
            color: '#00d4ff',
            fontWeight: 600,
          }}
        >
          ✦ PRO
        </span>
        <button
          className="btn-secondary"
          style={{ padding: '7px 14px', fontSize: '12px' }}
          onClick={() => {
            markClean?.();
            notify('Saved!');
          }}
        >
          <Icon name="check" size={12} color="#00d4ff" />{' '}
          {isDirty ? 'Save now' : 'Auto-saved'}
        </button>
        {page === 'builder' && (
          <button
            className="btn-primary"
            onClick={downloadPDF}
            disabled={pdfLoading}
            style={{ padding: '7px 16px', fontSize: '13px' }}
          >
            {pdfLoading ? (
              <span className="spin-el" />
            ) : (
              <Icon name="download" size={14} color="#fff" />
            )}
            {pdfLoading ? ' Generating...' : ' Download PDF'}
          </button>
        )}
      </div>
    </div>
  );
}
