// filepath: components/ResumeBuilder.jsx
import { useState } from 'react';
import { Icon } from './Icon';
import { FormSection } from './FormSection';
import { ResumePreview } from './ResumePreview';
import { templates } from '../lib/defaultResume';
import { callAI } from './callAI';
import { loadScript } from '../lib/utils';

const FieldGrid = ({ cols = 2, children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: '14px',
    }}
  >
    {children}
  </div>
);
const Field = ({ label, children }) => (
  <div>
    <label>{label}</label>
    {children}
  </div>
);

const tabs = [
  { id: 'personal', label: 'Personal', icon: 'mail' },
  { id: 'summary', label: 'Summary', icon: 'resume' },
  { id: 'skills', label: 'Skills', icon: 'code' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'github' },
  { id: 'education', label: 'Education', icon: 'award' },
  { id: 'more', label: 'More', icon: 'star' },
];

export function ResumeBuilder({
  resume,
  setResume,
  template,
  setTemplate,
  notify,
  pdfLoading,
  setPdfLoading,
  previewRef,
  markClean,
}) {
  const [activeTab, setActiveTab] = useState('personal');
  const [aiLoading, setAiLoading] = useState(false);

  const downloadPDF = async () => {
    const node = previewRef.current;
    if (!node) {
      notify('Go to Resume Builder page first, then click Download', 'error');
      return;
    }
    setPdfLoading(true);
    notify('⏳ Preparing your PDF...');
    try {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      );
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      );
      const { jsPDF } = window.jspdf;
      const canvas = await window.html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: node.scrollWidth,
        height: node.scrollHeight,
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = canvas.width;
      const imgH = canvas.height;
      const pdfImgH = (imgH / imgW) * pageW;
      if (pdfImgH <= pageH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pdfImgH);
      } else {
        let yOff = 0;
        const pageHpx = (pageH / pageW) * imgW;
        while (yOff < imgH) {
          const sliceH = Math.min(pageHpx, imgH - yOff);
          const sc = document.createElement('canvas');
          sc.width = imgW;
          sc.height = sliceH;
          sc.getContext('2d').drawImage(
            canvas,
            0,
            yOff,
            imgW,
            sliceH,
            0,
            0,
            imgW,
            sliceH,
          );
          if (yOff > 0) pdf.addPage();
          pdf.addImage(
            sc.toDataURL('image/jpeg', 1.0),
            'JPEG',
            0,
            0,
            pageW,
            (sliceH / imgW) * pageW,
          );
          yOff += sliceH;
        }
      }
      const fname = (resume.personal.name || 'Resume').replace(/\s+/g, '_');
      pdf.save(`${fname}_Resume.pdf`);
      notify('✅ PDF downloaded!');
    } catch (err) {
      notify('❌ ' + err.message, 'error');
    }
    setPdfLoading(false);
  };

  // Update functions
  const updatePersonal = (f, v) =>
    setResume((r) => ({ ...r, personal: { ...r.personal, [f]: v } }));
  const updateSkillCat = (cat, v) =>
    setResume((r) => ({
      ...r,
      skills: {
        ...r.skills,
        [cat]: v
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      },
    }));
  const addSkillCat = () => {
    const n = prompt('Category name:');
    if (n) setResume((r) => ({ ...r, skills: { ...r.skills, [n]: [] } }));
  };
  const removeSkillCat = (cat) =>
    setResume((r) => {
      const s = { ...r.skills };
      delete s[cat];
      return { ...r, skills: s };
    });
  const addExp = () =>
    setResume((r) => ({
      ...r,
      experience: [
        ...r.experience,
        {
          id: Date.now(),
          company: '',
          role: '',
          duration: '',
          responsibilities: '',
          technologies: '',
        },
      ],
    }));
  const updExp = (id, f, v) =>
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => (e.id === id ? { ...e, [f]: v } : e)),
    }));
  const delExp = (id) =>
    setResume((r) => ({
      ...r,
      experience: r.experience.filter((e) => e.id !== id),
    }));
  const addProj = () =>
    setResume((r) => ({
      ...r,
      projects: [
        ...r.projects,
        {
          id: Date.now(),
          title: '',
          description: '',
          technologies: '',
          github: '',
          live: '',
        },
      ],
    }));
  const updProj = (id, f, v) =>
    setResume((r) => ({
      ...r,
      projects: r.projects.map((p) => (p.id === id ? { ...p, [f]: v } : p)),
    }));
  const delProj = (id) =>
    setResume((r) => ({
      ...r,
      projects: r.projects.filter((p) => p.id !== id),
    }));
  const addEdu = () =>
    setResume((r) => ({
      ...r,
      education: [
        ...r.education,
        { id: Date.now(), institution: '', degree: '', duration: '', gpa: '' },
      ],
    }));
  const updEdu = (id, f, v) =>
    setResume((r) => ({
      ...r,
      education: r.education.map((e) => (e.id === id ? { ...e, [f]: v } : e)),
    }));
  const delEdu = (id) =>
    setResume((r) => ({
      ...r,
      education: r.education.filter((e) => e.id !== id),
    }));
  const addCert = () =>
    setResume((r) => ({
      ...r,
      certifications: [
        ...r.certifications,
        { id: Date.now(), name: '', issuer: '', year: '' },
      ],
    }));
  const updCert = (id, f, v) =>
    setResume((r) => ({
      ...r,
      certifications: r.certifications.map((c) =>
        c.id === id ? { ...c, [f]: v } : c,
      ),
    }));
  const delCert = (id) =>
    setResume((r) => ({
      ...r,
      certifications: r.certifications.filter((c) => c.id !== id),
    }));

  const generateSummary = async () => {
    setAiLoading(true);
    const prompt = `Write a compelling 2-3 sentence professional summary for a MERN developer resume. Skills: ${Object.values(resume.skills).flat().slice(0, 8).join(', ')}. Companies: ${resume.experience.map((e) => e.company).join(', ')}. Return ONLY the summary, no quotes.`;
    try {
      const result = await callAI(prompt);
      setResume((r) => ({ ...r, summary: result }));
      notify('✨ Summary generated!');
    } catch (e) {
      notify('❌ ' + e.message, 'error');
    }
    setAiLoading(false);
  };

  const improveResp = async (expId, resp) => {
    setAiLoading(true);
    const prompt = `Rewrite this resume bullet for maximum impact with action verbs and quantified results. Original: "${resp}" Return ONLY the improved text.`;
    try {
      const result = await callAI(prompt);
      notify('✨ Improved!');
      return result;
    } catch (e) {
      notify('❌ ' + e.message, 'error');
      return resp;
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '420px 1fr',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Form */}
      <div
        style={{
          borderRight: '1px solid #152236',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Tabs */}
        <div
          style={{
            borderBottom: '1px solid #152236',
            padding: '0 16px',
            display: 'flex',
            overflowX: 'auto',
            background: '#0a1220',
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '14px 12px',
                background: 'none',
                border: 'none',
                borderBottom:
                  activeTab === t.id
                    ? '2px solid #00d4ff'
                    : '2px solid transparent',
                color: activeTab === t.id ? '#e2e8f0' : '#4a7aab',
                fontSize: '12px',
                fontWeight: activeTab === t.id ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Sans',sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '-1px',
              }}
            >
              <Icon
                name={t.icon}
                size={12}
                color={activeTab === t.id ? '#00d4ff' : '#4a7aab'}
              />{' '}
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {activeTab === 'personal' && (
            <div className="fade-up">
              <FormSection title="Personal Information" icon="mail">
                <FieldGrid>
                  <Field label="Full Name">
                    <input
                      value={resume.personal.name}
                      onChange={(e) => updatePersonal('name', e.target.value)}
                      placeholder="Alex Chen"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      value={resume.personal.email}
                      onChange={(e) => updatePersonal('email', e.target.value)}
                      placeholder="alex@example.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={resume.personal.phone}
                      onChange={(e) => updatePersonal('phone', e.target.value)}
                      placeholder="+1 555 234 5678"
                    />
                  </Field>
                  <Field label="Location">
                    <input
                      value={resume.personal.location}
                      onChange={(e) =>
                        updatePersonal('location', e.target.value)
                      }
                      placeholder="San Francisco, CA"
                    />
                  </Field>
                  <Field label="LinkedIn">
                    <input
                      value={resume.personal.linkedin}
                      onChange={(e) =>
                        updatePersonal('linkedin', e.target.value)
                      }
                      placeholder="linkedin.com/in/..."
                    />
                  </Field>
                  <Field label="GitHub">
                    <input
                      value={resume.personal.github}
                      onChange={(e) => updatePersonal('github', e.target.value)}
                      placeholder="github.com/..."
                    />
                  </Field>
                </FieldGrid>
                <div style={{ marginTop: '14px' }}>
                  <Field label="Portfolio URL">
                    <input
                      value={resume.personal.portfolio}
                      onChange={(e) =>
                        updatePersonal('portfolio', e.target.value)
                      }
                      placeholder="yourportfolio.dev"
                    />
                  </Field>
                </div>
              </FormSection>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="fade-up">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span className="section-title" style={{ marginBottom: 0 }}>
                  Professional Summary
                </span>
                <button
                  className="btn-primary"
                  onClick={generateSummary}
                  disabled={aiLoading}
                  style={{ fontSize: '12px', padding: '8px 14px' }}
                >
                  {aiLoading ? (
                    <span className="spin-el" />
                  ) : (
                    <Icon name="spark" size={12} color="#fff" />
                  )}{' '}
                  AI Generate
                </button>
              </div>
              <Field label="Summary">
                <textarea
                  rows={5}
                  value={resume.summary}
                  onChange={(e) =>
                    setResume((r) => ({ ...r, summary: e.target.value }))
                  }
                  placeholder="Full-stack developer with X years..."
                />
              </Field>
              <div
                style={{
                  marginTop: '10px',
                  background: '#0a1628',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  border: '1px solid #1e3a5f',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    color: '#4a7aab',
                    marginBottom: '6px',
                    fontWeight: 600,
                  }}
                >
                  ✦ ATS TIP
                </div>
                <div style={{ fontSize: '12px', color: '#7eb8ff' }}>
                  Include 3-4 key technologies, years of experience, and a
                  measurable impact.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="fade-up">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span className="section-title" style={{ marginBottom: 0 }}>
                  Skills
                </span>
                <button
                  className="btn-secondary"
                  onClick={addSkillCat}
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                >
                  <Icon name="plus" size={12} color="#7eb8ff" /> Add Category
                </button>
              </div>
              {Object.entries(resume.skills).map(([cat, skills]) => (
                <div
                  key={cat}
                  style={{
                    marginBottom: '14px',
                    background: '#0a1628',
                    borderRadius: '10px',
                    padding: '14px',
                    border: '1px solid #152236',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: '12px',
                        color: '#00d4ff',
                        fontWeight: 500,
                      }}
                    >
                      {cat}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => removeSkillCat(cat)}
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    value={skills.join(', ')}
                    onChange={(e) => updateSkillCat(cat, e.target.value)}
                    placeholder="React.js, TypeScript..."
                  />
                  <div
                    style={{
                      marginTop: '6px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                    }}
                  >
                    {skills.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="fade-up">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span className="section-title" style={{ marginBottom: 0 }}>
                  Work Experience
                </span>
                <button
                  className="btn-secondary"
                  onClick={addExp}
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                >
                  <Icon name="plus" size={12} color="#7eb8ff" /> Add
                </button>
              </div>
              {resume.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  style={{
                    background: '#0a1628',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #152236',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#7eb8ff',
                      }}
                    >
                      Experience #{idx + 1}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => delExp(exp.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <FieldGrid>
                    <Field label="Company">
                      <input
                        value={exp.company}
                        onChange={(e) =>
                          updExp(exp.id, 'company', e.target.value)
                        }
                        placeholder="TechCorp Inc."
                      />
                    </Field>
                    <Field label="Role">
                      <input
                        value={exp.role}
                        onChange={(e) => updExp(exp.id, 'role', e.target.value)}
                        placeholder="Senior Developer"
                      />
                    </Field>
                  </FieldGrid>
                  <div style={{ marginTop: '10px' }}>
                    <Field label="Duration">
                      <input
                        value={exp.duration}
                        onChange={(e) =>
                          updExp(exp.id, 'duration', e.target.value)
                        }
                        placeholder="Jan 2022 – Present"
                      />
                    </Field>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <Field label="Technologies">
                      <input
                        value={exp.technologies}
                        onChange={(e) =>
                          updExp(exp.id, 'technologies', e.target.value)
                        }
                        placeholder="React, Node.js, MongoDB"
                      />
                    </Field>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <label>Responsibilities (one per line)</label>
                      <button
                        className="btn-ghost"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                        onClick={async () => {
                          const lines = exp.responsibilities
                            .split('\n')
                            .filter(Boolean);
                          if (lines.length > 0) {
                            const imp = await improveResp(exp.id, lines[0]);
                            updExp(
                              exp.id,
                              'responsibilities',
                              [imp, ...lines.slice(1)].join('\n'),
                            );
                          }
                        }}
                      >
                        <Icon name="spark" size={10} color="#00d4ff" /> AI
                        Improve
                      </button>
                    </div>
                    <textarea
                      value={exp.responsibilities}
                      onChange={(e) =>
                        updExp(exp.id, 'responsibilities', e.target.value)
                      }
                      placeholder="Led development of...\nBuilt real-time dashboard..."
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="fade-up">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span className="section-title" style={{ marginBottom: 0 }}>
                  Projects
                </span>
                <button
                  className="btn-secondary"
                  onClick={addProj}
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                >
                  <Icon name="plus" size={12} color="#7eb8ff" /> Add Project
                </button>
              </div>
              {resume.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  style={{
                    background: '#0a1628',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #152236',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#7eb8ff',
                      }}
                    >
                      Project #{idx + 1}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => delProj(proj.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <Field label="Project Title">
                    <input
                      value={proj.title}
                      onChange={(e) =>
                        updProj(proj.id, 'title', e.target.value)
                      }
                      placeholder="DevConnect Platform"
                    />
                  </Field>
                  <div style={{ marginTop: '10px' }}>
                    <Field label="Description">
                      <textarea
                        value={proj.description}
                        onChange={(e) =>
                          updProj(proj.id, 'description', e.target.value)
                        }
                        placeholder="Full-stack application that..."
                        rows={3}
                      />
                    </Field>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <Field label="Technologies">
                      <input
                        value={proj.technologies}
                        onChange={(e) =>
                          updProj(proj.id, 'technologies', e.target.value)
                        }
                        placeholder="React, Node.js, MongoDB"
                      />
                    </Field>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <FieldGrid>
                      <Field label="GitHub URL">
                        <input
                          value={proj.github}
                          onChange={(e) =>
                            updProj(proj.id, 'github', e.target.value)
                          }
                          placeholder="github.com/..."
                        />
                      </Field>
                      <Field label="Live URL">
                        <input
                          value={proj.live}
                          onChange={(e) =>
                            updProj(proj.id, 'live', e.target.value)
                          }
                          placeholder="myproject.vercel.app"
                        />
                      </Field>
                    </FieldGrid>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="fade-up">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span className="section-title" style={{ marginBottom: 0 }}>
                  Education
                </span>
                <button
                  className="btn-secondary"
                  onClick={addEdu}
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                >
                  <Icon name="plus" size={12} color="#7eb8ff" /> Add
                </button>
              </div>
              {resume.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  style={{
                    background: '#0a1628',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #152236',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#7eb8ff',
                      }}
                    >
                      Education #{idx + 1}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => delEdu(edu.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <FieldGrid>
                    <Field label="Institution">
                      <input
                        value={edu.institution}
                        onChange={(e) =>
                          updEdu(edu.id, 'institution', e.target.value)
                        }
                        placeholder="MIT"
                      />
                    </Field>
                    <Field label="Degree">
                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          updEdu(edu.id, 'degree', e.target.value)
                        }
                        placeholder="B.S. Computer Science"
                      />
                    </Field>
                    <Field label="Duration">
                      <input
                        value={edu.duration}
                        onChange={(e) =>
                          updEdu(edu.id, 'duration', e.target.value)
                        }
                        placeholder="2016 – 2020"
                      />
                    </Field>
                    <Field label="GPA">
                      <input
                        value={edu.gpa}
                        onChange={(e) => updEdu(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8 / 4.0"
                      />
                    </Field>
                  </FieldGrid>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'more' && (
            <div className="fade-up">
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <span className="section-title" style={{ marginBottom: 0 }}>
                    Certifications
                  </span>
                  <button
                    className="btn-secondary"
                    onClick={addCert}
                    style={{ fontSize: '12px', padding: '7px 12px' }}
                  >
                    <Icon name="plus" size={12} color="#7eb8ff" /> Add
                  </button>
                </div>
                {resume.certifications.map((cert, idx) => (
                  <div
                    key={cert.id}
                    style={{
                      background: '#0a1628',
                      borderRadius: '10px',
                      padding: '14px',
                      border: '1px solid #152236',
                      marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#7eb8ff' }}>
                        Cert #{idx + 1}
                      </span>
                      <button
                        className="btn-danger"
                        onClick={() => delCert(cert.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <FieldGrid>
                      <Field label="Name">
                        <input
                          value={cert.name}
                          onChange={(e) =>
                            updCert(cert.id, 'name', e.target.value)
                          }
                          placeholder="AWS Certified Developer"
                        />
                      </Field>
                      <Field label="Issuer">
                        <input
                          value={cert.issuer}
                          onChange={(e) =>
                            updCert(cert.id, 'issuer', e.target.value)
                          }
                          placeholder="Amazon Web Services"
                        />
                      </Field>
                      <Field label="Year">
                        <input
                          value={cert.year}
                          onChange={(e) =>
                            updCert(cert.id, 'year', e.target.value)
                          }
                          placeholder="2023"
                        />
                      </Field>
                    </FieldGrid>
                  </div>
                ))}
              </div>
              <span className="section-title">Achievements</span>
              <Field label="Achievements (one per line)">
                <textarea
                  rows={5}
                  value={resume.achievements[0] || ''}
                  onChange={(e) =>
                    setResume((r) => ({ ...r, achievements: [e.target.value] }))
                  }
                  placeholder="Speaker at ReactConf 2023...\n500+ GitHub stars..."
                />
              </Field>
            </div>
          )}
        </div>

        {/* Save button */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #152236',
            background: '#0a1220',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            className="btn-primary"
            onClick={() => {
              markClean?.();
              notify('Resume saved!');
            }}
            style={{ flex: 1 }}
          >
            <Icon name="check" size={14} color="#fff" /> Save Resume
          </button>
          <button
            className="btn-secondary"
            onClick={downloadPDF}
            disabled={pdfLoading}
            style={{ flex: 1 }}
          >
            {pdfLoading ? (
              <span className="spin-el-blue" />
            ) : (
              <Icon name="download" size={14} color="#7eb8ff" />
            )}
            {pdfLoading ? ' Generating...' : ' Download PDF'}
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#0d1520',
        }}
      >
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #152236',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0a1220',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="eye" size={14} color="#4a7aab" />
            <span
              style={{ fontSize: '13px', color: '#7eb8ff', fontWeight: 500 }}
            >
              Live Preview
            </span>
            <span className="tag" style={{ fontSize: '10px' }}>
              {templates.find((t) => t.id === template)?.name}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              overflowX: 'auto',
              maxWidth: '70%',
              paddingBottom: '2px',
            }}
          >
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border:
                    template === t.id
                      ? '1px solid #00d4ff'
                      : '1px solid #1e3a5f',
                  background: template === t.id ? '#0d1f38' : 'transparent',
                  color: template === t.id ? '#00d4ff' : '#4a7aab',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans',sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            ref={previewRef}
            style={{
              width: '595px',
              maxWidth: '100%',
              background: '#fff',
              boxShadow: '0 20px 60px #000000a0',
              borderRadius: '4px',
              overflow: 'hidden',
              minHeight: '842px',
            }}
          >
            <ResumePreview data={resume} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
