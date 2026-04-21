// filepath: components/ResumePreview.jsx
export function ResumePreview({ data, template }) {
  const d = data;
  const allSkills = Object.values(d.skills).flat();

  if (template === 'minimal')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: '#111',
          padding: '32px 36px',
          fontSize: '10px',
          lineHeight: 1.5,
          background: '#fff',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            borderBottom: '2px solid #333',
            paddingBottom: '12px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 700 }}>
            {d.personal.name}
          </div>
          <div style={{ color: '#555', marginTop: '4px' }}>
            {d.personal.email} • {d.personal.phone} • {d.personal.location}
          </div>
          <div style={{ color: '#555' }}>
            {d.personal.linkedin} • {d.personal.github}
          </div>
        </div>
        {d.summary && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px',
                borderBottom: '1px solid #ccc',
              }}
            >
              Summary
            </div>
            <p style={{ marginBottom: '12px', color: '#333' }}>{d.summary}</p>
          </>
        )}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '6px',
            borderBottom: '1px solid #ccc',
          }}
        >
          Skills
        </div>
        <div style={{ marginBottom: '12px', color: '#333' }}>
          {allSkills.join(' • ')}
        </div>
        {d.experience.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
                borderBottom: '1px solid #ccc',
              }}
            >
              Experience
            </div>
            {d.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: '10px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <strong>{e.role}</strong>
                  <span style={{ color: '#555' }}>{e.duration}</span>
                </div>
                <div style={{ color: '#555', marginBottom: '3px' }}>
                  {e.company} • {e.technologies}
                </div>
                {e.responsibilities.split('\n').map((r, i) => (
                  <div key={i} style={{ paddingLeft: '10px', color: '#333' }}>
                    • {r}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {d.projects.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
                borderBottom: '1px solid #ccc',
                marginTop: '12px',
              }}
            >
              Projects
            </div>
            {d.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '8px' }}>
                <strong>{p.title}</strong> |{' '}
                <span style={{ color: '#555' }}>{p.technologies}</span>
                <div style={{ color: '#333' }}>{p.description}</div>
              </div>
            ))}
          </>
        )}
        {d.education.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
                borderBottom: '1px solid #ccc',
                marginTop: '12px',
              }}
            >
              Education
            </div>
            {d.education.map((e) => (
              <div
                key={e.id}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>
                  <strong>{e.degree}</strong>, {e.institution}
                </span>
                <span style={{ color: '#555' }}>{e.duration}</span>
              </div>
            ))}
          </>
        )}
      </div>
    );

  if (template === 'corporate')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: '#1a1a2e',
          fontSize: '10px',
          background: '#fff',
          minHeight: '100%',
        }}
      >
        <div
          style={{ background: '#1a3a6b', color: '#fff', padding: '28px 32px' }}
        >
          <div style={{ fontSize: '24px', fontWeight: 700 }}>
            {d.personal.name}
          </div>
          <div style={{ color: '#90b4e8', marginTop: '4px' }}>
            {d.personal.email} | {d.personal.phone} | {d.personal.location}
          </div>
          <div style={{ color: '#90b4e8' }}>
            {d.personal.linkedin} | {d.personal.github}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '35%',
              background: '#f0f4f8',
              padding: '20px 16px',
              borderRight: '1px solid #dce5ef',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: '#1a3a6b',
                marginBottom: '8px',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
            >
              Skills
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: '#2d5a9e',
                    fontSize: '10px',
                    marginBottom: '3px',
                  }}
                >
                  {cat}
                </div>
                {skills.map((s) => (
                  <div
                    key={s}
                    style={{
                      paddingLeft: '8px',
                      color: '#333',
                      fontSize: '9.5px',
                    }}
                  >
                    ▸ {s}
                  </div>
                ))}
              </div>
            ))}
            {d.education.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#1a3a6b',
                    marginBottom: '8px',
                    marginTop: '14px',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                  }}
                >
                  Education
                </div>
                {d.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: '5px' }}>
                    <div style={{ fontWeight: 600, fontSize: '9.5px' }}>
                      {e.degree}
                    </div>
                    <div style={{ color: '#555', fontSize: '9px' }}>
                      {e.institution} • {e.duration}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div style={{ flex: 1, padding: '20px' }}>
            {d.summary && (
              <>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#1a3a6b',
                    marginBottom: '6px',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                  }}
                >
                  Summary
                </div>
                <p
                  style={{
                    color: '#333',
                    marginBottom: '14px',
                    lineHeight: 1.6,
                  }}
                >
                  {d.summary}
                </p>
              </>
            )}
            {d.experience.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#1a3a6b',
                    marginBottom: '8px',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                  }}
                >
                  Experience
                </div>
                {d.experience.map((e) => (
                  <div
                    key={e.id}
                    style={{
                      marginBottom: '10px',
                      borderLeft: '3px solid #1a3a6b',
                      paddingLeft: '10px',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '11px' }}>
                      {e.role}
                    </div>
                    <div
                      style={{
                        color: '#2d5a9e',
                        fontSize: '9.5px',
                        marginBottom: '3px',
                      }}
                    >
                      {e.company} | {e.duration}
                    </div>
                    {e.responsibilities.split('\n').map((r, i) => (
                      <div key={i} style={{ color: '#333' }}>
                        • {r}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
            {d.projects.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 700,
                    color: '#1a3a6b',
                    marginBottom: '8px',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    marginTop: '12px',
                  }}
                >
                  Projects
                </div>
                {d.projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '8px' }}>
                    <strong style={{ fontSize: '10.5px' }}>{p.title}</strong>
                    <div style={{ color: '#333' }}>{p.description}</div>
                    <div style={{ color: '#2d5a9e', fontSize: '9px' }}>
                      Tech: {p.technologies}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  if (template === 'compact')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: '#111',
          padding: '20px 24px',
          fontSize: '9.5px',
          lineHeight: 1.45,
          background: '#fff',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #111',
            paddingBottom: '8px',
            marginBottom: '10px',
          }}
        >
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800 }}>
              {d.personal.name}
            </div>
            <div style={{ color: '#555' }}>
              {d.personal.email} · {d.personal.phone} · {d.personal.location}
            </div>
          </div>
          <div style={{ textAlign: 'right', color: '#333' }}>
            <div>{d.personal.github}</div>
            <div>{d.personal.linkedin}</div>
          </div>
        </div>
        {d.summary && (
          <p
            style={{
              marginBottom: '8px',
              color: '#333',
              borderLeft: '3px solid #111',
              paddingLeft: '8px',
            }}
          >
            {d.summary}
          </p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ paddingRight: '12px' }}>
            <div
              style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '5px',
                marginTop: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Skills
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '3px' }}>
                <strong>{cat}:</strong> {skills.join(', ')}
              </div>
            ))}
            <div
              style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '5px',
                marginTop: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Education
            </div>
            {d.education.map((e) => (
              <div key={e.id}>
                <strong>{e.degree}</strong>
                <br />
                <span style={{ color: '#555' }}>
                  {e.institution} • {e.duration}
                </span>
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: '12px', borderLeft: '1px solid #ddd' }}>
            <div
              style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '5px',
                marginTop: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Experience
            </div>
            {d.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: '7px' }}>
                <div style={{ fontWeight: 700 }}>
                  {e.role} – {e.company}
                </div>
                <div style={{ color: '#555' }}>{e.duration}</div>
                {e.responsibilities.split('\n').map((r, i) => (
                  <div key={i} style={{ paddingLeft: '6px' }}>
                    • {r}
                  </div>
                ))}
              </div>
            ))}
            {d.projects.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '5px',
                    marginTop: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Projects
                </div>
                {d.projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '5px' }}>
                    <strong>{p.title}</strong>
                    <br />
                    {p.description}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  if (template === 'creative')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: '#1a1a2e',
          fontSize: '10px',
          background: '#fff',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
            color: '#fff',
            padding: '28px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle,#00d4ff22,transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            {d.personal.name}
          </div>
          <div
            style={{
              color: '#00d4ff',
              marginTop: '2px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Full-Stack Developer
          </div>
          <div style={{ color: '#aaa', marginTop: '6px', fontSize: '9.5px' }}>
            {d.personal.email} • {d.personal.phone} • {d.personal.location}
          </div>
          <div style={{ marginTop: '4px', display: 'flex', gap: '12px' }}>
            <span style={{ color: '#00d4ff', fontSize: '9px' }}>
              ⌗ {d.personal.github}
            </span>
            <span style={{ color: '#00d4ff', fontSize: '9px' }}>
              in {d.personal.linkedin}
            </span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr' }}>
          <div
            style={{
              background: '#f8f9ff',
              padding: '18px 16px',
              borderRight: '1px solid #e0e5ff',
            }}
          >
            {d.summary && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#302b63',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '6px',
                  }}
                >
                  About
                </div>
                <p
                  style={{
                    color: '#444',
                    lineHeight: 1.6,
                    marginBottom: '14px',
                  }}
                >
                  {d.summary}
                </p>
              </>
            )}
            <div
              style={{
                fontWeight: 800,
                color: '#302b63',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '8px',
              }}
            >
              Skills
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#00d4ff',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: '#e8eaff',
                        color: '#302b63',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontSize: '9px',
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {d.education.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#302b63',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '6px',
                    marginTop: '14px',
                  }}
                >
                  Education
                </div>
                {d.education.map((e) => (
                  <div key={e.id}>
                    <div style={{ fontWeight: 700 }}>{e.degree}</div>
                    <div style={{ color: '#666', fontSize: '9px' }}>
                      {e.institution} • {e.duration}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div style={{ padding: '18px 18px' }}>
            {d.experience.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#302b63',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '8px',
                  }}
                >
                  Experience
                </div>
                {d.experience.map((e) => (
                  <div
                    key={e.id}
                    style={{
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px dashed #ddd',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '10.5px',
                        color: '#302b63',
                      }}
                    >
                      {e.role}
                    </div>
                    <div
                      style={{
                        color: '#00b4d8',
                        fontSize: '9.5px',
                        marginBottom: '3px',
                      }}
                    >
                      {e.company} · {e.duration}
                    </div>
                    {e.responsibilities.split('\n').map((r, i) => (
                      <div
                        key={i}
                        style={{ color: '#444', paddingLeft: '8px' }}
                      >
                        → {r}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
            {d.projects.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#302b63',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '8px',
                    marginTop: '10px',
                  }}
                >
                  Projects
                </div>
                {d.projects.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      marginBottom: '8px',
                      background: '#f0f4ff',
                      borderRadius: '6px',
                      padding: '8px 10px',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: '#302b63',
                        fontSize: '10px',
                      }}
                    >
                      {p.title}
                    </div>
                    <div style={{ color: '#555', lineHeight: 1.5 }}>
                      {p.description}
                    </div>
                    <div
                      style={{
                        color: '#00b4d8',
                        fontSize: '9px',
                        marginTop: '3px',
                      }}
                    >
                      {p.technologies}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  if (template === 'gradient')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          color: '#1a1a2e',
          fontSize: '10px',
          background: '#fff',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#c084fc 100%)',
            color: '#fff',
            padding: '34px 34px 30px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              background: '#ffffff22',
              borderRadius: '50%',
            }}
          />
          <div style={{ fontSize: '26px', fontWeight: 800 }}>
            {d.personal.name}
          </div>
          <div
            style={{
              color: '#f1e4ff',
              fontSize: '11px',
              fontWeight: 600,
              marginTop: '4px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '12px',
              color: '#f7ecff',
              fontSize: '9.5px',
            }}
          >
            <span>{d.personal.email}</span>
            <span>{d.personal.phone}</span>
            <span>{d.personal.location}</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40% 60%' }}>
          <div
            style={{ padding: '18px 16px', borderRight: '1px solid #eee' }}
          >
            {d.summary && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#7c3aed',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '6px',
                  }}
                >
                  About
                </div>
                <p
                  style={{
                    color: '#444',
                    lineHeight: 1.6,
                    marginBottom: '14px',
                  }}
                >
                  {d.summary}
                </p>
              </>
            )}
            <div
              style={{
                fontWeight: 800,
                color: '#7c3aed',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '8px',
              }}
            >
              Skills
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#a855f7',
                    marginBottom: '3px',
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: '#f3e8ff',
                        color: '#6b21a8',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '9px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {d.education.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#7c3aed',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '6px',
                    marginTop: '14px',
                  }}
                >
                  Education
                </div>
                {d.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700 }}>{e.degree}</div>
                    <div style={{ color: '#666', fontSize: '9px' }}>
                      {e.institution} • {e.duration}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div style={{ padding: '18px' }}>
            {d.experience.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#7c3aed',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '8px',
                  }}
                >
                  Experience
                </div>
                {d.experience.map((e) => (
                  <div key={e.id} style={{ marginBottom: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <strong style={{ color: '#1a1a2e', fontSize: '11px' }}>
                        {e.role}
                      </strong>
                      <span
                        style={{
                          color: '#7c3aed',
                          fontSize: '9px',
                          fontWeight: 600,
                        }}
                      >
                        {e.duration}
                      </span>
                    </div>
                    <div
                      style={{
                        color: '#a855f7',
                        fontSize: '9.5px',
                        marginBottom: '3px',
                        fontWeight: 600,
                      }}
                    >
                      {e.company}
                    </div>
                    {e.responsibilities.split('\n').map(
                      (r, i) =>
                        r.trim() && (
                          <div key={i} style={{ color: '#444' }}>
                            ▸ {r}
                          </div>
                        ),
                    )}
                  </div>
                ))}
              </>
            )}
            {d.projects.length > 0 && (
              <>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#7c3aed',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginTop: '10px',
                    marginBottom: '8px',
                  }}
                >
                  Projects
                </div>
                {d.projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '8px' }}>
                    <strong>{p.title}</strong>
                    <div style={{ color: '#444' }}>{p.description}</div>
                    <div style={{ color: '#a855f7', fontSize: '9px' }}>
                      {p.technologies}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  if (template === 'neon')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: '#0a0a0f',
          color: '#e5e7eb',
          fontSize: '10px',
          padding: '28px 30px',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            borderBottom: '1px solid #1f2937',
            paddingBottom: '14px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#22d3ee',
              textShadow: '0 0 12px #22d3ee88',
            }}
          >
            {d.personal.name}
          </div>
          <div
            style={{
              color: '#f472b6',
              fontSize: '11px',
              fontWeight: 600,
              marginTop: '3px',
              fontFamily: "'DM Mono',monospace",
            }}
          >
            {'>'} full-stack.developer
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '8px',
              color: '#94a3b8',
              fontSize: '9.5px',
            }}
          >
            <span>{d.personal.email}</span>
            <span>{d.personal.phone}</span>
            <span>{d.personal.github}</span>
          </div>
        </div>
        {d.summary && (
          <p style={{ color: '#cbd5e1', marginBottom: '14px' }}>{d.summary}</p>
        )}
        <div
          style={{
            fontSize: '11px',
            color: '#22d3ee',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}
        >
          ◆ Skills
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '14px',
          }}
        >
          {allSkills.map((s) => (
            <span
              key={s}
              style={{
                background: '#0f172a',
                border: '1px solid #22d3ee55',
                color: '#22d3ee',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '9px',
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: '#f472b6',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}
        >
          ◆ Experience
        </div>
        {d.experience.map((e) => (
          <div key={e.id} style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 700, color: '#e5e7eb' }}>
              {e.role} <span style={{ color: '#64748b' }}>@ {e.company}</span>
            </div>
            <div
              style={{
                color: '#f472b6',
                fontSize: '9px',
                marginBottom: '3px',
                fontFamily: "'DM Mono',monospace",
              }}
            >
              {e.duration}
            </div>
            {e.responsibilities.split('\n').map(
              (r, i) =>
                r.trim() && (
                  <div
                    key={i}
                    style={{ color: '#cbd5e1', paddingLeft: '10px' }}
                  >
                    › {r}
                  </div>
                ),
            )}
          </div>
        ))}
        {d.projects.length > 0 && (
          <>
            <div
              style={{
                fontSize: '11px',
                color: '#22d3ee',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '10px 0 8px',
              }}
            >
              ◆ Projects
            </div>
            {d.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#22d3ee' }}>{p.title}</strong>
                <div style={{ color: '#cbd5e1' }}>{p.description}</div>
                <div
                  style={{
                    color: '#f472b6',
                    fontSize: '9px',
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {p.technologies}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );

  if (template === 'elegant')
    return (
      <div
        style={{
          fontFamily: "'Georgia', serif",
          color: '#2c2c2c',
          background: '#fafaf7',
          fontSize: '10.5px',
          padding: '40px 44px',
          lineHeight: 1.6,
          minHeight: '100%',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            borderBottom: '1px solid #c9b37e',
            paddingBottom: '14px',
            marginBottom: '18px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            {d.personal.name}
          </div>
          <div
            style={{
              fontStyle: 'italic',
              color: '#8a7a4a',
              marginTop: '4px',
              fontSize: '11px',
            }}
          >
            Full-Stack Developer
          </div>
          <div style={{ color: '#666', marginTop: '6px', fontSize: '10px' }}>
            {d.personal.email} · {d.personal.phone} · {d.personal.location}
          </div>
        </div>
        {d.summary && (
          <p
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: '#444',
              marginBottom: '18px',
            }}
          >
            {d.summary}
          </p>
        )}
        <div
          style={{
            textAlign: 'center',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#8a7a4a',
            marginBottom: '10px',
          }}
        >
          — Experience —
        </div>
        {d.experience.map((e) => (
          <div key={e.id} style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700 }}>{e.role}</div>
            <div style={{ fontStyle: 'italic', color: '#8a7a4a' }}>
              {e.company} — {e.duration}
            </div>
            {e.responsibilities.split('\n').map(
              (r, i) =>
                r.trim() && (
                  <div key={i} style={{ color: '#333', paddingLeft: '14px' }}>
                    · {r}
                  </div>
                ),
            )}
          </div>
        ))}
        <div
          style={{
            textAlign: 'center',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#8a7a4a',
            margin: '16px 0 10px',
          }}
        >
          — Skills —
        </div>
        <div style={{ textAlign: 'center', color: '#333' }}>
          {allSkills.join(' · ')}
        </div>
        {d.education.length > 0 && (
          <>
            <div
              style={{
                textAlign: 'center',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#8a7a4a',
                margin: '16px 0 10px',
              }}
            >
              — Education —
            </div>
            {d.education.map((e) => (
              <div
                key={e.id}
                style={{ textAlign: 'center', marginBottom: '6px' }}
              >
                <div style={{ fontWeight: 700 }}>{e.degree}</div>
                <div style={{ fontStyle: 'italic', color: '#666' }}>
                  {e.institution}, {e.duration}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );

  if (template === 'timeline')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: '#fff',
          color: '#1e293b',
          fontSize: '10px',
          padding: '28px 32px',
          minHeight: '100%',
        }}
      >
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>
            {d.personal.name}
          </div>
          <div style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '11px' }}>
            Full-Stack Developer
          </div>
          <div
            style={{
              display: 'flex',
              gap: '14px',
              marginTop: '5px',
              color: '#64748b',
              fontSize: '9.5px',
              flexWrap: 'wrap',
            }}
          >
            <span>{d.personal.email}</span>
            <span>{d.personal.phone}</span>
            <span>{d.personal.github}</span>
          </div>
        </div>
        {d.summary && (
          <p
            style={{
              color: '#475569',
              marginBottom: '18px',
              borderLeft: '3px solid #0ea5e9',
              paddingLeft: '10px',
            }}
          >
            {d.summary}
          </p>
        )}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#0ea5e9',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '12px',
          }}
        >
          Experience Timeline
        </div>
        <div
          style={{
            position: 'relative',
            paddingLeft: '20px',
            borderLeft: '2px solid #0ea5e9',
          }}
        >
          {d.experience.map((e) => (
            <div
              key={e.id}
              style={{ marginBottom: '14px', position: 'relative' }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '-26px',
                  top: '2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#0ea5e9',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px #0ea5e9',
                }}
              />
              <div
                style={{
                  color: '#0ea5e9',
                  fontSize: '9px',
                  fontWeight: 700,
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {e.duration}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700 }}>{e.role}</div>
              <div style={{ color: '#475569', marginBottom: '4px' }}>
                {e.company}
              </div>
              {e.responsibilities.split('\n').map(
                (r, i) =>
                  r.trim() && (
                    <div key={i} style={{ color: '#475569' }}>
                      › {r}
                    </div>
                  ),
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#0ea5e9',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: '14px 0 8px',
          }}
        >
          Skills
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {allSkills.map((s) => (
            <span
              key={s}
              style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '9px',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );

  if (template === 'startup')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: '#fff',
          color: '#111',
          fontSize: '10px',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            background: '#f97316',
            color: '#fff',
            padding: '30px 32px',
            borderBottom: '8px solid #111',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            {d.personal.name.toUpperCase()}
          </div>
          <div
            style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}
          >
            BUILDING THE FUTURE, ONE COMMIT AT A TIME.
          </div>
          <div style={{ marginTop: '8px', fontSize: '10px' }}>
            {d.personal.email} · {d.personal.phone} · {d.personal.location}
          </div>
        </div>
        <div style={{ padding: '20px 32px' }}>
          {d.summary && (
            <p
              style={{
                fontSize: '12px',
                fontWeight: 500,
                marginBottom: '16px',
                color: '#333',
              }}
            >
              {d.summary}
            </p>
          )}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 900,
              textTransform: 'uppercase',
              background: '#111',
              color: '#f97316',
              display: 'inline-block',
              padding: '4px 10px',
              marginBottom: '10px',
            }}
          >
            Experience
          </div>
          {d.experience.map((e) => (
            <div
              key={e.id}
              style={{
                marginBottom: '12px',
                borderLeft: '5px solid #f97316',
                paddingLeft: '12px',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800 }}>
                {e.role} — {e.company}
              </div>
              <div
                style={{ color: '#f97316', fontWeight: 700, fontSize: '9.5px' }}
              >
                {e.duration}
              </div>
              {e.responsibilities.split('\n').map(
                (r, i) =>
                  r.trim() && (
                    <div key={i} style={{ color: '#333' }}>
                      → {r}
                    </div>
                  ),
              )}
            </div>
          ))}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 900,
              textTransform: 'uppercase',
              background: '#111',
              color: '#f97316',
              display: 'inline-block',
              padding: '4px 10px',
              margin: '12px 0 10px',
            }}
          >
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {allSkills.map((s) => (
              <span
                key={s}
                style={{
                  background: '#fff7ed',
                  border: '2px solid #f97316',
                  color: '#c2410c',
                  padding: '2px 8px',
                  fontWeight: 700,
                  fontSize: '9px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    );

  if (template === 'academic')
    return (
      <div
        style={{
          fontFamily: "'Times New Roman', serif",
          color: '#1a1a1a',
          background: '#fff',
          fontSize: '10.5px',
          padding: '36px 40px',
          lineHeight: 1.5,
          minHeight: '100%',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            borderBottom: '2px double #1a1a1a',
            paddingBottom: '10px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 700 }}>
            {d.personal.name}
          </div>
          <div style={{ fontSize: '10px', marginTop: '3px' }}>
            {d.personal.email} | {d.personal.phone} | {d.personal.location}
          </div>
          <div style={{ fontSize: '10px' }}>
            {d.personal.linkedin} | {d.personal.github}
          </div>
        </div>
        {d.education.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                borderBottom: '1px solid #000',
                marginBottom: '6px',
              }}
            >
              EDUCATION
            </div>
            {d.education.map((e) => (
              <div key={e.id} style={{ marginBottom: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>{e.institution}</strong>
                  <span>{e.duration}</span>
                </div>
                <div style={{ fontStyle: 'italic' }}>
                  {e.degree}
                  {e.gpa ? ` — GPA: ${e.gpa}` : ''}
                </div>
              </div>
            ))}
          </>
        )}
        {d.experience.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                borderBottom: '1px solid #000',
                marginTop: '10px',
                marginBottom: '6px',
              }}
            >
              RESEARCH &amp; PROFESSIONAL EXPERIENCE
            </div>
            {d.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: '10px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <strong>{e.company}</strong>
                  <span>{e.duration}</span>
                </div>
                <div style={{ fontStyle: 'italic' }}>{e.role}</div>
                {e.responsibilities.split('\n').map(
                  (r, i) =>
                    r.trim() && (
                      <div key={i} style={{ paddingLeft: '18px' }}>
                        • {r}
                      </div>
                    ),
                )}
              </div>
            ))}
          </>
        )}
        {d.projects.length > 0 && (
          <>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                borderBottom: '1px solid #000',
                marginTop: '10px',
                marginBottom: '6px',
              }}
            >
              PROJECTS
            </div>
            {d.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '6px' }}>
                <strong>{p.title}.</strong>{' '}
                <span style={{ fontStyle: 'italic' }}>{p.description}</span>
              </div>
            ))}
          </>
        )}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            borderBottom: '1px solid #000',
            marginTop: '10px',
            marginBottom: '6px',
          }}
        >
          TECHNICAL SKILLS
        </div>
        {Object.entries(d.skills).map(([cat, skills]) => (
          <div key={cat}>
            <strong>{cat}:</strong> {skills.join(', ')}
          </div>
        ))}
      </div>
    );

  if (template === 'infographic')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: '#fff',
          color: '#1f2937',
          fontSize: '10px',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg,#10b981,#3b82f6)',
            color: '#fff',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#ffffff22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 800,
              border: '2px solid #fff',
            }}
          >
            {d.personal.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800 }}>
              {d.personal.name}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>
              Full-Stack Developer · {d.personal.location}
            </div>
          </div>
        </div>
        <div style={{ padding: '18px 22px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            {[
              { label: 'Email', v: d.personal.email, c: '#10b981' },
              { label: 'Phone', v: d.personal.phone, c: '#3b82f6' },
              { label: 'GitHub', v: d.personal.github, c: '#8b5cf6' },
              { label: 'LinkedIn', v: d.personal.linkedin, c: '#ec4899' },
            ].map((b) => (
              <div
                key={b.label}
                style={{
                  background: `${b.c}15`,
                  borderLeft: `4px solid ${b.c}`,
                  padding: '7px 10px',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{ color: b.c, fontSize: '9px', fontWeight: 700 }}
                >
                  {b.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '10px' }}>{b.v}</div>
              </div>
            ))}
          </div>
          {d.summary && (
            <p style={{ color: '#475569', marginBottom: '14px' }}>
              {d.summary}
            </p>
          )}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px',
            }}
          >
            Skills
          </div>
          {Object.entries(d.skills).map(([cat, skills]) => (
            <div key={cat} style={{ marginBottom: '6px' }}>
              <div
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#3b82f6',
                  marginBottom: '3px',
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  height: '6px',
                  background: '#e0f2fe',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, skills.length * 18)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg,#10b981,#3b82f6)',
                  }}
                />
              </div>
              <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>
                {skills.join(' · ')}
              </div>
            </div>
          ))}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '12px 0 8px',
            }}
          >
            Experience
          </div>
          {d.experience.map((e) => (
            <div
              key={e.id}
              style={{
                background: '#f0fdf4',
                borderLeft: '4px solid #10b981',
                padding: '8px 12px',
                borderRadius: '4px',
                marginBottom: '8px',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '11px' }}>{e.role}</div>
              <div style={{ color: '#10b981', fontSize: '9.5px' }}>
                {e.company} · {e.duration}
              </div>
              {e.responsibilities.split('\n').map(
                (r, i) =>
                  r.trim() && (
                    <div key={i} style={{ color: '#334155' }}>
                      → {r}
                    </div>
                  ),
              )}
            </div>
          ))}
        </div>
      </div>
    );

  if (template === 'newspaper')
    return (
      <div
        style={{
          fontFamily: "'Times New Roman', serif",
          background: '#fdfcf7',
          color: '#111',
          fontSize: '10px',
          padding: '28px 32px',
          minHeight: '100%',
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            borderTop: '4px double #111',
            borderBottom: '4px double #111',
            padding: '12px 0',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              fontSize: '34px',
              fontWeight: 900,
              letterSpacing: '-1px',
              fontFamily: "'Times New Roman', serif",
            }}
          >
            THE {d.personal.name.toUpperCase()} TIMES
          </div>
          <div
            style={{
              fontSize: '9px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#444',
              marginTop: '4px',
            }}
          >
            Est. Career Edition · Full-Stack Developer · {d.personal.location}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: '#555',
            marginBottom: '14px',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
          }}
        >
          <span>{d.personal.email}</span>
          <span>{d.personal.phone}</span>
          <span>{d.personal.github}</span>
          <span>{d.personal.linkedin}</span>
        </div>
        {d.summary && (
          <p
            style={{
              fontStyle: 'italic',
              textAlign: 'justify',
              marginBottom: '14px',
              columns: 2,
              columnGap: '18px',
              fontSize: '10px',
            }}
          >
            {d.summary}
          </p>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '18px',
          }}
        >
          <div style={{ borderRight: '1px solid #bbb', paddingRight: '14px' }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 900,
                textTransform: 'uppercase',
                borderBottom: '2px solid #111',
                marginBottom: '6px',
                paddingBottom: '2px',
              }}
            >
              Career Column
            </div>
            {d.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 800, fontSize: '11.5px' }}>
                  {e.role}
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '9.5px' }}>
                  {e.company} — {e.duration}
                </div>
                {e.responsibilities.split('\n').map(
                  (r, i) =>
                    r.trim() && (
                      <div key={i} style={{ color: '#333', paddingLeft: '10px' }}>
                        • {r}
                      </div>
                    ),
                )}
              </div>
            ))}
            {d.projects.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #111',
                    marginBottom: '6px',
                    paddingBottom: '2px',
                    marginTop: '8px',
                  }}
                >
                  Featured Projects
                </div>
                {d.projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '8px' }}>
                    <strong>{p.title}.</strong>{' '}
                    <span style={{ fontStyle: 'italic' }}>{p.description}</span>
                    <div style={{ color: '#555', fontSize: '9px' }}>
                      {p.technologies}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 900,
                textTransform: 'uppercase',
                borderBottom: '2px solid #111',
                marginBottom: '6px',
                paddingBottom: '2px',
              }}
            >
              Skills Bulletin
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '6px' }}>
                <div style={{ fontWeight: 700 }}>{cat}</div>
                <div style={{ color: '#333', fontSize: '9.5px' }}>
                  {skills.join(', ')}
                </div>
              </div>
            ))}
            {d.education.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #111',
                    marginTop: '10px',
                    marginBottom: '6px',
                  }}
                >
                  Education
                </div>
                {d.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: '5px' }}>
                    <strong>{e.degree}</strong>
                    <div style={{ fontStyle: 'italic', fontSize: '9px' }}>
                      {e.institution} — {e.duration}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  if (template === 'swiss')
    return (
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          background: '#fff',
          color: '#111',
          fontSize: '10px',
          padding: '48px 52px',
          minHeight: '100%',
          lineHeight: 1.55,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '28px',
            borderBottom: '3px solid #111',
            paddingBottom: '20px',
            marginBottom: '22px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#888',
                marginBottom: '4px',
              }}
            >
              Résumé
            </div>
            <div
              style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.05 }}
            >
              {d.personal.name}
            </div>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              Full-Stack Developer
            </div>
            <div style={{ fontSize: '9px', color: '#555' }}>
              {d.personal.email} / {d.personal.phone} / {d.personal.location} /{' '}
              {d.personal.github}
            </div>
          </div>
        </div>
        {d.summary && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '28px',
              marginBottom: '22px',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#888',
              }}
            >
              01 / Profile
            </div>
            <p style={{ color: '#222' }}>{d.summary}</p>
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '28px',
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#888',
            }}
          >
            02 / Experience
          </div>
          <div>
            {d.experience.map((e) => (
              <div
                key={e.id}
                style={{
                  marginBottom: '14px',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '2px',
                  }}
                >
                  <strong style={{ fontSize: '12px' }}>{e.role}</strong>
                  <span style={{ color: '#888', fontSize: '9px' }}>
                    {e.duration}
                  </span>
                </div>
                <div style={{ color: '#555', marginBottom: '4px' }}>
                  {e.company}
                </div>
                {e.responsibilities.split('\n').map(
                  (r, i) =>
                    r.trim() && (
                      <div key={i} style={{ color: '#222' }}>
                        — {r}
                      </div>
                    ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '28px',
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#888',
            }}
          >
            03 / Skills
          </div>
          <div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '6px' }}>
                <span style={{ color: '#888' }}>{cat} — </span>
                {skills.join(', ')}
              </div>
            ))}
          </div>
        </div>
        {d.education.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '28px',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#888',
              }}
            >
              04 / Education
            </div>
            <div>
              {d.education.map((e) => (
                <div key={e.id} style={{ marginBottom: '4px' }}>
                  <strong>{e.degree}</strong> — {e.institution},{' '}
                  <span style={{ color: '#888' }}>{e.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

  if (template === 'glass')
    return (
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background:
            'linear-gradient(135deg,#020617 0%,#1e293b 50%,#0f172a 100%)',
          color: '#e2e8f0',
          fontSize: '10px',
          padding: '26px 28px',
          minHeight: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle,#6366f155,transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle,#06b6d455,transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '20px 22px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
            {d.personal.name}
          </div>
          <div
            style={{
              color: '#67e8f9',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              marginTop: '2px',
            }}
          >
            FULL-STACK DEVELOPER
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '8px',
              color: '#cbd5e1',
              fontSize: '9.5px',
            }}
          >
            <span>{d.personal.email}</span>
            <span>{d.personal.phone}</span>
            <span>{d.personal.location}</span>
            <span>{d.personal.github}</span>
          </div>
        </div>
        {d.summary && (
          <div
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '14px',
              color: '#cbd5e1',
              lineHeight: 1.6,
            }}
          >
            {d.summary}
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '12px',
            position: 'relative',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                color: '#67e8f9',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}
            >
              Experience
            </div>
            {d.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>
                  {e.role}
                </div>
                <div
                  style={{
                    color: '#a5f3fc',
                    fontSize: '9.5px',
                    marginBottom: '3px',
                  }}
                >
                  {e.company} · {e.duration}
                </div>
                {e.responsibilities.split('\n').map(
                  (r, i) =>
                    r.trim() && (
                      <div
                        key={i}
                        style={{ color: '#cbd5e1', paddingLeft: '8px' }}
                      >
                        › {r}
                      </div>
                    ),
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                color: '#67e8f9',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}
            >
              Skills
            </div>
            {Object.entries(d.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '7px' }}>
                <div
                  style={{
                    fontSize: '9px',
                    color: '#a5f3fc',
                    fontWeight: 700,
                    marginBottom: '3px',
                  }}
                >
                  {cat}
                </div>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}
                >
                  {skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: 'rgba(103,232,249,0.12)',
                        border: '1px solid rgba(103,232,249,0.3)',
                        color: '#e0f2fe',
                        padding: '1px 8px',
                        borderRadius: '999px',
                        fontSize: '9px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {d.education.length > 0 && (
              <>
                <div
                  style={{
                    color: '#67e8f9',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginTop: '10px',
                    marginBottom: '6px',
                  }}
                >
                  Education
                </div>
                {d.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>
                      {e.degree}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '9px' }}>
                      {e.institution} · {e.duration}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );

  // modern (default)
  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        color: '#1a1a2e',
        fontSize: '10px',
        background: '#fff',
        minHeight: '100%',
      }}
    >
      <div
        style={{
          background: '#0d1117',
          color: '#e2e8f0',
          padding: '28px 32px',
        }}
      >
        <div
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#fff',
          }}
        >
          {d.personal.name}
        </div>
        <div
          style={{
            color: '#00d4ff',
            fontSize: '11px',
            fontWeight: 600,
            marginTop: '3px',
            fontFamily: "'DM Mono',monospace",
          }}
        >
          {'<'} Full-Stack Developer {'/>'}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '10px',
          }}
        >
          {[
            { v: d.personal.email, i: '✉' },
            { v: d.personal.phone, i: '☏' },
            { v: d.personal.location, i: '⌖' },
            { v: d.personal.github, i: '⌗' },
            { v: d.personal.linkedin, i: 'in' },
          ].map((item, i) => (
            <span key={i} style={{ color: '#7eb8ff', fontSize: '9.5px' }}>
              {item.i} {item.v}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '38% 62%' }}>
        <div
          style={{
            background: '#f4f6ff',
            padding: '18px 16px',
            borderRight: '1px solid #dde5f4',
          }}
        >
          {d.summary && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '6px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                }}
              >
                Summary
              </div>
              <p
                style={{
                  color: '#444',
                  lineHeight: 1.6,
                  marginBottom: '14px',
                  fontSize: '9.5px',
                }}
              >
                {d.summary}
              </p>
            </>
          )}
          <div
            style={{
              fontWeight: 800,
              color: '#0d1117',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px',
              borderLeft: '3px solid #00d4ff',
              paddingLeft: '7px',
            }}
          >
            Skills
          </div>
          {Object.entries(d.skills).map(([cat, skills]) => (
            <div key={cat} style={{ marginBottom: '8px' }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '9px',
                  color: '#0077ff',
                  fontWeight: 500,
                  marginBottom: '3px',
                }}
              >
                {cat.toLowerCase()}.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: '#dde5f4',
                      color: '#1a3a6b',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {d.education.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '6px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                  marginTop: '14px',
                }}
              >
                Education
              </div>
              {d.education.map((e) => (
                <div key={e.id} style={{ marginBottom: '5px' }}>
                  <div style={{ fontWeight: 700, fontSize: '10px' }}>
                    {e.degree}
                  </div>
                  <div style={{ color: '#555', fontSize: '9px' }}>
                    {e.institution}
                  </div>
                  <div style={{ color: '#777', fontSize: '9px' }}>
                    {e.duration}
                    {e.gpa ? ` • GPA: ${e.gpa}` : ''}
                  </div>
                </div>
              ))}
            </>
          )}
          {d.certifications.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '6px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                  marginTop: '14px',
                }}
              >
                Certifications
              </div>
              {d.certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '4px' }}>
                  <div style={{ fontWeight: 600, fontSize: '9.5px' }}>
                    {c.name}
                  </div>
                  <div style={{ color: '#555', fontSize: '9px' }}>
                    {c.issuer} • {c.year}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div style={{ padding: '18px 18px' }}>
          {d.experience.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '8px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                }}
              >
                Experience
              </div>
              {d.experience.map((e) => (
                <div
                  key={e.id}
                  style={{
                    marginBottom: '10px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #e8edf8',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '11px',
                      color: '#0d1117',
                    }}
                  >
                    {e.role}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '3px',
                    }}
                  >
                    <span
                      style={{
                        color: '#0077ff',
                        fontWeight: 600,
                        fontSize: '9.5px',
                      }}
                    >
                      {e.company}
                    </span>
                    <span
                      style={{
                        color: '#777',
                        fontFamily: "'DM Mono',monospace",
                        fontSize: '9px',
                      }}
                    >
                      {e.duration}
                    </span>
                  </div>
                  <div
                    style={{
                      background: '#f0f4ff',
                      padding: '3px 7px',
                      borderRadius: '4px',
                      color: '#555',
                      fontSize: '9px',
                      marginBottom: '4px',
                      fontFamily: "'DM Mono',monospace",
                    }}
                  >
                    tech: {e.technologies}
                  </div>
                  {e.responsibilities.split('\n').map(
                    (r, i) =>
                      r.trim() && (
                        <div
                          key={i}
                          style={{
                            color: '#333',
                            paddingLeft: '10px',
                            marginBottom: '1px',
                          }}
                        >
                          ▸ {r}
                        </div>
                      ),
                  )}
                </div>
              ))}
            </>
          )}
          {d.projects.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '8px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                  marginTop: '10px',
                }}
              >
                Projects
              </div>
              {d.projects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    marginBottom: '8px',
                    background: '#f7f9ff',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    border: '1px solid #e0e8f8',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: '#0d1117',
                      fontSize: '10.5px',
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      color: '#444',
                      lineHeight: 1.55,
                      marginBottom: '3px',
                    }}
                  >
                    {p.description}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      color: '#0077ff',
                      fontSize: '9px',
                    }}
                  >
                    {p.technologies}
                  </div>
                  <div
                    style={{ display: 'flex', gap: '10px', marginTop: '3px' }}
                  >
                    {p.github && (
                      <span style={{ color: '#555', fontSize: '9px' }}>
                        ⌗ {p.github}
                      </span>
                    )}
                    {p.live && (
                      <span style={{ color: '#0077ff', fontSize: '9px' }}>
                        ↗ {p.live}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {d.achievements && d.achievements[0] && (
            <>
              <div
                style={{
                  fontWeight: 800,
                  color: '#0d1117',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '6px',
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '7px',
                  marginTop: '10px',
                }}
              >
                Achievements
              </div>
              {d.achievements[0].split('\n').map(
                (a, i) =>
                  a.trim() && (
                    <div
                      key={i}
                      style={{
                        color: '#333',
                        paddingLeft: '10px',
                        marginBottom: '2px',
                      }}
                    >
                      ★ {a}
                    </div>
                  ),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
