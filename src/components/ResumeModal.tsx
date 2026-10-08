import React, { useState } from 'react';
import { X, Download, Copy, Check, Briefcase, GraduationCap, Award, Trophy, Code, MapPin, Mail, Sparkles, Medal, ExternalLink } from 'lucide-react';
import { PROFILE_INFO, EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS, SKILL_CATEGORIES, AWARDS } from '../data/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const text = `
Nacho Salinas — Software Engineer & Data Scientist
Location: ${PROFILE_INFO.location}
Email: ${PROFILE_INFO.email}
GitHub / Web: ${PROFILE_INFO.socials.github}

Executive Profile:
${PROFILE_INFO.bio}

Professional Experience:
${EXPERIENCES.map(e => `• ${e.role} at ${e.company} (${e.period}, ${e.location})\n  ${e.description}\n  Highlights: ${e.highlights.join('; ')}`).join('\n\n')}

Awards & Honors:
${AWARDS.map(a => `• ${a.title} (${a.issuer}, ${a.date}) — ${a.rank ? `[${a.rank}] ` : ''}${a.description}`).join('\n')}

Education:
${EDUCATION_LIST.map(ed => `• ${ed.degree} — ${ed.institution} (${ed.period}) ${ed.honors ? `[${ed.honors}]` : ''}`).join('\n')}

Certifications:
${CERTIFICATIONS.map(c => `• ${c.name} (${c.issuer}, ${c.year})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b90014] animate-pulse"></span>
            <h3 className="font-bold text-neutral-900 text-lg">Curriculum Vitae — Nacho Salinas</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="resume-copy-summary-btn"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all cursor-pointer"
              title="Copy formatted plain text summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              id="resume-download-pdf-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#b90014] hover:bg-[#93000d] transition-all shadow-xs disabled:opacity-75 cursor-pointer"
            >
              {downloading ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : downloadSuccess ? (
                <Check className="w-3.5 h-3.5 text-white" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadSuccess ? 'Downloaded!' : downloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              id="resume-close-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable CV) */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-neutral-800 text-sm leading-relaxed">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">Nacho Salinas</h1>
              <p className="text-base font-semibold text-[#b90014] mt-0.5">Software Engineer &amp; Data Scientist</p>
            </div>
            <div className="space-y-1 text-xs text-neutral-600 sm:text-right">
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b90014]" />
                <span>{PROFILE_INFO.location}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#b90014]" />
                <a href={`mailto:${PROFILE_INFO.email}`} className="text-neutral-800 font-medium hover:underline">{PROFILE_INFO.email}</a>
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" />
              Executive Profile
            </h2>
            <p className="text-neutral-700 leading-relaxed text-sm bg-neutral-50 p-4 rounded-xl border border-neutral-200 whitespace-pre-line">
              {PROFILE_INFO.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-4">
              <Briefcase className="w-4 h-4" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-neutral-200">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#b90014]"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-neutral-900 text-base">{exp.role}</h3>
                    <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">{exp.period}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#b90014] mb-2">{exp.company} <span className="text-neutral-400 font-normal">· {exp.location}</span></p>
                  <p className="text-neutral-600 mb-2 text-xs sm:text-sm">{exp.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600 mb-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-snug">{h}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {exp.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#b90014] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{l.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-4">
              <Trophy className="w-4 h-4" />
              Awards, Honors &amp; Recognitions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {AWARDS.map((award) => (
                <div key={award.id} className="p-3.5 rounded-xl border border-neutral-200 bg-white shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-extrabold text-[#b90014] bg-[#b90014]/10 px-2 py-0.5 rounded">
                        {award.rank || award.badge}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">{award.date}</span>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-xs mt-1">{award.title}</h3>
                    <p className="text-[11px] text-neutral-500 font-medium">{award.issuer}</p>
                    <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-4">
              <Code className="w-4 h-4" />
              Technical Competencies &amp; Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="p-3.5 rounded-xl border border-neutral-200 bg-white shadow-2xs">
                  <h3 className="text-xs font-bold text-neutral-900 mb-2">{cat.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className={`text-xs px-2 py-0.5 rounded-md ${
                          s.highlight
                            ? 'bg-[#b90014]/10 text-[#b90014] font-semibold border border-[#b90014]/20'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-3">
                <GraduationCap className="w-4 h-4" />
                Education &amp; Degrees
              </h2>
              <div className="space-y-3">
                {EDUCATION_LIST.map((edu, i) => (
                  <div key={i} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                    <h3 className="font-bold text-neutral-900 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-neutral-600">{edu.institution} ({edu.period})</p>
                    {edu.honors && <p className="text-[11px] text-[#b90014] mt-1 font-medium">{edu.honors}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5 mb-3">
                <Award className="w-4 h-4" />
                Certifications
              </h2>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                    <h3 className="font-bold text-neutral-900 text-xs">{cert.name}</h3>
                    <p className="text-xs text-neutral-600">{cert.issuer} · {cert.year}</p>
                    {cert.credentialId && <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{cert.credentialId}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>Updated · Madrid, Spain</span>
          <button
            onClick={onClose}
            className="font-semibold text-[#b90014] hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
