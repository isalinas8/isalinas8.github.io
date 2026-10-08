import React, { useState } from 'react';
import { ScreenType, Project, AwardItem } from '../types';
import { PROFILE_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, EDUCATION_LIST, CERTIFICATIONS, AWARDS } from '../data/portfolio-data';
import { 
  Briefcase, 
  FolderGit2, 
  Code2, 
  GraduationCap, 
  Award, 
  Trophy,
  FileText, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  MessageSquare,
  Search,
  Layers,
  Cpu,
  Star,
  Medal
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenResume: () => void;
}

type TabType = 'overview' | 'experience' | 'projects' | 'education' | 'awards';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Machine Learning', 'Full-Stack', 'Robotics', 'Data Engineering'];

  const filteredProjects = projectFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === projectFilter);

  return (
    <div className="w-full flex-grow flex flex-col items-center animate-fadeIn pb-20">
      {/* Top Banner & Profile Header */}
      <div className="w-full bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 bg-[#b90014] rounded-full blur-md opacity-30"></div>
              <img
                src={PROFILE_INFO.avatarImage}
                alt={PROFILE_INFO.name}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md bg-neutral-100"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Profile Intro */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                    {PROFILE_INFO.name}
                  </h1>
                  <p className="text-base font-semibold text-[#b90014]">
                    {PROFILE_INFO.title}
                  </p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <button
                    id="profile-view-cv-cta"
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white hover:bg-[#b90014] text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View CV</span>
                  </button>
                  <button
                    id="profile-contact-cta"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#b90014]/10 text-[#b90014] hover:bg-[#b90014] hover:text-white border border-[#b90014]/20 text-xs font-semibold transition-all duration-200 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Get in Touch</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl pt-1 whitespace-pre-line">
                {PROFILE_INFO.bio}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 mt-8 overflow-x-auto pb-1 border-b border-neutral-100 no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'education', label: 'Education & Certs', icon: GraduationCap },
              { id: 'awards', label: 'Awards & Honors', icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`profile-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#b90014] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-[#b90014] hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-[#b90014]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#b90014]/10 text-[#b90014] flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">Software Engineering</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  I build reliable and maintainable software, SDK integrations, developer tools and automated CI/CD solutions that deliver measurable results.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-[#b90014]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#b90014]/10 text-[#b90014] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">AI &amp; Data Science</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  I apply AI and machine learning to real-world challenges in software development, healthcare and traffic optimization. I design and implement agentic AI workflows that autonomously build and validate software.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-[#b90014]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#b90014]/10 text-[#b90014] flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">Versatility &amp; Continuous Learning</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  I enjoy learning new technologies, adapting to different domains and turning complex ideas into practical, high-impact solutions.
                </p>
              </div>
            </div>

            {/* Awards Quick Highlight Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#b90014] text-white flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Cum Laude Valedictorian &amp; 7+ Academic Honors</h3>
                  <p className="text-xs text-neutral-300 mt-0.5">Top 1 / 97 graduates at UAM, SEDEA National Ranking and TomTom Global Hackathon 4th place.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('awards')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all shrink-0 cursor-pointer border border-white/15"
              >
                <span>View All Awards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Featured Projects Highlight */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Featured Technical Work</h2>
                  <p className="text-xs text-neutral-500">Selected production models and engineered architectures</p>
                </div>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-bold text-[#b90014] hover:underline flex items-center gap-1"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECTS.slice(0, 2).map((project) => (
                  <div 
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs hover:shadow-md hover:border-[#b90014]/40 transition-all duration-300 flex flex-col"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-neutral-800 shadow-xs">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm mb-1 group-hover:text-[#b90014] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-100">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Roles Highlight */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Career Timeline</h2>
                  <p className="text-xs text-neutral-500">Engineering leadership, mobile SDKs and enterprise systems</p>
                </div>
                <button
                  onClick={() => setActiveTab('experience')}
                  className="text-xs font-bold text-[#b90014] hover:underline flex items-center gap-1"
                >
                  <span>Full History</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {EXPERIENCES.filter((exp) => !exp.hideInOverview).map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs hover:border-neutral-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-neutral-900 text-sm">{exp.role}</h3>
                      <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded w-fit">{exp.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#b90014] mb-2">{exp.company} · {exp.location}</p>
                    <p className="text-xs text-neutral-600 mb-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.slice(0, 5).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    {exp.links && exp.links.length > 0 && (
                      <div className="pt-2.5 mt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                        {exp.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-700 hover:text-[#b90014] transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-[#b90014]" />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Competencies & Stack Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Technical Competencies &amp; Stack</h2>
                  <p className="text-xs text-neutral-500">Core programming languages, frameworks, developer tools and domain expertise</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm mb-3.5">
                        {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className={`px-3 py-1.5 rounded-lg text-xs inline-block transition-colors ${
                              skill.highlight
                                ? 'bg-[#b90014]/10 text-[#b90014] border border-[#b90014]/20 font-semibold'
                                : 'bg-neutral-100 text-neutral-700 font-medium'
                            }`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-900">Work Experience</h2>
                <p className="text-xs text-neutral-500">Engineering leadership and production data science roles</p>
              </div>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-all border border-neutral-200"
              >
                <FileText className="w-3.5 h-3.5 text-[#b90014]" />
                <span>Full CV</span>
              </button>
            </div>

            <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-3 before:w-0.5 before:bg-neutral-200">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-8 group">
                  {/* Timeline Dot */}
                  <span className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-[#b90014] border-2 border-white shadow-xs group-hover:scale-125 transition-transform"></span>

                  <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-sm hover:border-[#b90014]/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="font-extrabold text-neutral-900 text-base">{exp.role}</h3>
                      <span className="text-xs font-semibold text-[#b90014] bg-[#b90014]/10 px-2.5 py-0.5 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-neutral-700 mb-3">
                      {exp.company} <span className="text-neutral-400 font-normal">· {exp.location} ({exp.type})</span>
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Key Outcomes:</h4>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#b90014] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium border border-neutral-200">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {exp.links && exp.links.length > 0 && (
                      <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                        {exp.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-800 bg-neutral-50 hover:bg-[#b90014]/10 hover:text-[#b90014] border border-neutral-200 hover:border-[#b90014]/40 transition-all shadow-2xs group cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#b90014] group-hover:scale-110 transition-transform" />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. FEATURED PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900">Featured Projects</h2>
              <p className="text-xs text-neutral-500">Selected open-source engines, AI applications and distributed platforms</p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    projectFilter === cat
                      ? 'bg-[#b90014] text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs hover:shadow-md hover:border-[#b90014]/40 transition-all duration-300 flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-neutral-800 shadow-xs">
                      {project.category}
                    </span>
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white tracking-wide">
                      {project.tagline}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-neutral-900 text-base mb-1 group-hover:text-[#b90014] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.metrics && (
                      <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#b90014] shrink-0" />
                        <span>{project.metrics}</span>
                      </div>
                    )}

                    <div className="space-y-3 pt-2 border-t border-neutral-100">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>

                      {(project.githubUrl || project.demoUrl) && (
                        <div className="flex items-center gap-3 pt-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-[#b90014] transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Code Repository</span>
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b90014] hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>{project.demoLabel || 'Live System Demo'}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EDUCATION & CERTS TAB */}
        {activeTab === 'education' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900">Academic Degrees &amp; Certifications</h2>
              <p className="text-xs text-neutral-500">Formal training in computer science, machine learning and advanced English</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Degrees</span>
                </h3>

                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                    <h4 className="font-extrabold text-neutral-900 text-sm mb-1">{edu.degree}</h4>
                    <p className="text-xs font-semibold text-[#b90014] mb-1">{edu.institution}</p>
                    <p className="text-xs text-neutral-500 mb-2">{edu.location} · {edu.period}</p>
                    {edu.honors && (
                      <p className="text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 font-medium">
                        {edu.honors}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b90014] flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Certifications &amp; Accreditations</span>
                </h3>

                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-neutral-900 text-sm mb-1">{cert.name}</h4>
                      <p className="text-xs font-semibold text-neutral-600">{cert.issuer} · Issued {cert.year}</p>
                    </div>
                    {cert.credentialId && (
                      <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">Credential ID</span>
                        <span className="font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. AWARDS & HONORS TAB */}
        {activeTab === 'awards' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-900">Awards, Honors &amp; Recognitions</h2>
                <p className="text-xs text-neutral-500">National excellence rankings, academic valedictorian honors and global hackathon achievements</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#b90014] bg-[#b90014]/10 px-3 py-1.5 rounded-xl border border-[#b90014]/20 w-fit">
                <Trophy className="w-3.5 h-3.5" />
                <span>7 Major Accolades</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AWARDS.map((award) => (
                <div
                  key={award.id}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:border-[#b90014]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#b90014]/10 text-[#b90014] flex items-center justify-center shrink-0">
                          <Medal className="w-4 h-4" />
                        </div>
                        {award.rank && (
                          <span className="text-xs font-extrabold text-[#b90014] bg-[#b90014]/10 px-2.5 py-0.5 rounded-md border border-[#b90014]/20">
                            {award.rank}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-neutral-400">
                        {award.date}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-neutral-900 text-sm mb-1 leading-snug">
                        {award.title}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-600 mb-2">
                        {award.issuer} {award.badge && <span className="text-neutral-400 font-normal">· {award.badge}</span>}
                      </p>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>

                  {award.link && (
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-end">
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b90014] hover:underline"
                      >
                        <span>Official Verification</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Cross-Screen Navigation CTAs */}
        <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            id="profile-nav-to-travels-btn"
            onClick={() => onNavigate('travels')}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-[#b90014] hover:bg-[#b90014]/5 text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#b90014]">Next Section</span>
              <Compass className="w-4 h-4 text-[#b90014] transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#b90014]">Travels</h4>
            <p className="text-xs text-neutral-500 mt-1">Explore itineraries, routes and photography from São Miguel, Azores.</p>
          </button>

          <button
            id="profile-nav-to-contact-btn"
            onClick={() => onNavigate('contact')}
            className="p-5 rounded-2xl bg-[#b90014] text-white hover:bg-[#93000d] text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">Get in Touch</span>
              <MessageSquare className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-white text-base">Let's Connect</h4>
            <p className="text-xs text-white/80 mt-1">Send a message for collaborations, consulting, or job opportunities.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
