// filepath: components/App.jsx
'use client';

import { useState, useRef } from 'react';
import FontLoader from './FontLoader';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Dashboard } from './Dashboard';
import { ResumeBuilder } from './ResumeBuilder';
import { Templates } from './Templates';
import { ATS } from './ATS';
import { AIAssistant } from './AIAssistant';
import { Portfolio } from './Portfolio';
import { ImportResume } from './ImportResume';
import { loadScript } from '../lib/utils';
import { useResumeStore } from '../lib/store';

export default function App() {
  const resume = useResumeStore((s) => s.resume);
  const setResume = useResumeStore((s) => s.setResume);
  const template = useResumeStore((s) => s.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const isDirty = useResumeStore((s) => s.isDirty);
  const markClean = useResumeStore((s) => s.markClean);

  const [page, setPage] = useState('dashboard');
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const previewRef = useRef(null);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

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

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#080c14',
        fontFamily: "'DM Sans',sans-serif",
        overflow: 'hidden',
      }}
    >
      <FontLoader />

      {/* Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            background: notification.type === 'error' ? '#1f0a0a' : '#0a1f14',
            border: `1px solid ${notification.type === 'error' ? '#ef4444' : '#00d4ff'}`,
            borderRadius: '10px',
            padding: '12px 18px',
            color: notification.type === 'error' ? '#f87171' : '#e2e8f0',
            fontSize: '14px',
            animation: 'fadeUp .3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 30px #00000080',
          }}
        >
          {notification.type === 'error' ? '⚠' : '✓'} {notification.msg}
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Topbar */}
        <Topbar
          page={page}
          notify={notify}
          pdfLoading={pdfLoading}
          downloadPDF={downloadPDF}
          isDirty={isDirty}
          markClean={markClean}
        />

        {/* Pages */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: page === 'builder' ? '0' : '28px',
          }}
        >
          {page === 'dashboard' && (
            <Dashboard setPage={setPage} downloadPDF={downloadPDF} />
          )}
          {page === 'import' && (
            <ImportResume notify={notify} setPage={setPage} />
          )}
          {page === 'builder' && (
            <ResumeBuilder
              resume={resume}
              setResume={setResume}
              template={template}
              setTemplate={setTemplate}
              notify={notify}
              pdfLoading={pdfLoading}
              setPdfLoading={setPdfLoading}
              previewRef={previewRef}
              markClean={markClean}
            />
          )}
          {page === 'templates' && (
            <Templates
              resume={resume}
              template={template}
              setTemplate={setTemplate}
              notify={notify}
            />
          )}
          {page === 'ats' && <ATS resume={resume} />}
          {page === 'ai' && <AIAssistant resume={resume} />}
          {page === 'portfolio' && (
            <Portfolio resume={resume} notify={notify} />
          )}
        </div>
      </div>
    </div>
  );
}
