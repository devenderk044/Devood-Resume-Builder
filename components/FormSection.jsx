// filepath: components/FormSection.jsx
import { useState } from 'react';
import { Icon } from './Icon';

export function FormSection({ title, icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0 0 12px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: '#0d1f38',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #1e3a5f',
            }}
          >
            <Icon name={icon} size={14} color="#00d4ff" />
          </div>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#e2e8f0',
            }}
          >
            {title}
          </span>
        </div>
        <span
          style={{
            color: '#4a7aab',
            transform: open ? 'rotate(90deg)' : 'none',
            display: 'inline-block',
            transition: 'transform .2s',
          }}
        >
          <Icon name="arrow" size={16} color="#4a7aab" />
        </span>
      </button>
      {open && <div>{children}</div>}
      <hr className="divider" />
    </div>
  );
}
