import React, { useState } from 'react';
import { ScreenType } from '../types';
import { PROFILE_INFO } from '../data/portfolio-data';
import contactIllustration from '../assets/images/professional-profile/nacho-lara.jpg';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Instagram, 
  Copy, 
  Check, 
  MessageSquare, 
  MapPin, 
  User, 
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface ContactScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center animate-fadeIn pb-20">
      {/* Top Banner */}
      <div className="w-full bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b90014]/10 text-[#b90014] text-xs font-bold uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open for Inquiries</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Get in Touch
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed">
                Have an engineering opportunity, project collaboration, or just want to connect? Feel free to reach out.
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center">
              <img 
                src={contactIllustration} 
                alt="Nacho Salinas & companion illustration" 
                loading="lazy"
                decoding="async"
                className="w-40 sm:w-48 md:w-56 h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Direct Email & Base Location */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#b90014]/10 text-[#b90014] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base">Direct Email</h3>
                  <p className="text-xs text-neutral-500 font-mono break-all mt-0.5">{PROFILE_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  id="contact-compose-email-link"
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#b90014] hover:bg-[#93000d] text-white text-xs font-bold text-center transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <span>Compose Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors border border-neutral-200 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Base Location */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-600 space-y-1.5">
              <p className="font-bold text-neutral-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#b90014]" />
                <span>Base Location</span>
              </p>
              <p className="font-medium text-neutral-800">Madrid, Spain (Central European Time / UTC+1)</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Regularly collaborating with teams in Europe, US, and remote global hubs.
              </p>
            </div>
          </div>

          {/* Right Column: Social & Online Profiles */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm sm:text-base">Online Profiles</h3>
            
            <div className="space-y-2">
              <a
                id="contact-linkedin-link"
                href={PROFILE_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-[#b90014]/5 hover:text-[#b90014] border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#b90014]" />
                  <span>LinkedIn</span>
                </span>
                <span className="text-neutral-400 group-hover:text-[#b90014] flex items-center gap-1 text-xs">
                  Connect <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                id="contact-github-link"
                href={PROFILE_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-[#b90014]/5 hover:text-[#b90014] border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-[#b90014]" />
                  <span>GitHub</span>
                </span>
                <span className="text-neutral-400 group-hover:text-[#b90014] flex items-center gap-1 text-xs">
                  Follow <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                id="contact-instagram-link"
                href={PROFILE_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-[#b90014]/5 hover:text-[#b90014] border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#b90014]" />
                  <span>Instagram</span>
                </span>
                <span className="text-neutral-400 group-hover:text-[#b90014] flex items-center gap-1 text-xs">
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Cross-Navigation Footer Links */}
        <div className="pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            id="contact-nav-to-hub-btn"
            onClick={() => onNavigate('hub')}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-[#b90014] hover:bg-[#b90014]/5 text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#b90014]">Back to Start</span>
              <User className="w-4 h-4 text-[#b90014] transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#b90014]">Home Hub &amp; Links</h4>
            <p className="text-xs text-neutral-500 mt-1">Return to the primary bio-link screen and overview.</p>
          </button>

          <button
            id="contact-nav-to-travels-btn"
            onClick={() => onNavigate('travels')}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-[#b90014] hover:bg-[#b90014]/5 text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#b90014]">Explore</span>
              <Compass className="w-4 h-4 text-[#b90014] transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#b90014]">Travels</h4>
            <p className="text-xs text-neutral-500 mt-1">Explore travel itineraries and routes from São Miguel, Azores.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
