import React from 'react';
import { ScreenType } from '../types';
import { PROFILE_INFO } from '../data/portfolio-data';
import { ArrowRight, Plane, MessageSquare, FileText, Sparkles, MapPin, Instagram, Linkedin, Github } from 'lucide-react';

interface HubScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenResume: () => void;
}

export const HubScreen: React.FC<HubScreenProps> = ({ onNavigate, onOpenResume }) => {
  return (
    <div className="w-full flex-grow flex flex-col items-center">
      {/* Hero Background Image */}
      <div className="w-full h-48 sm:h-56 md:h-72 relative z-0 overflow-hidden bg-neutral-200">
        <img
          src={PROFILE_INFO.heroImage}
          alt="Dolomites Lago di Braies alpine landscape"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Subtle top gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Content Canvas (Bio Link Container, max-w-xl) */}
      <main className="w-full max-w-[640px] mx-auto px-4 sm:px-6 pb-20 flex flex-col items-center relative z-10 -mt-16 md:-mt-20">
        {/* Profile Section */}
        <section className="w-full flex flex-col items-center text-center space-y-6 mb-8" id="home">
          {/* Profile Avatar with subtle Red Halo */}
          <div className="relative group cursor-pointer" onClick={() => onNavigate('profile')}>
            <div className="absolute -inset-1 bg-[#b90014] rounded-full blur-md opacity-25 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
            <img
              src={PROFILE_INFO.avatarImage}
              alt="Portrait of Nacho Salinas"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-500 group-hover:scale-105 z-10 bg-neutral-100"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Nacho Salinas
            </h1>
            <p className="text-base sm:text-lg font-medium text-neutral-600 max-w-md mx-auto">
              Software Engineer &amp; Data Scientist
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#b90014]" />
              <span>Madrid, Spain</span>
            </div>
          </div>

          {/* Social Links (Chips/Round Icons) */}
          <div className="flex flex-row items-center justify-center gap-4 pt-1">
            {/* Instagram Quick Link */}
            <a
              id="hub-social-instagram-link"
              href={PROFILE_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 text-[#b90014] bg-white hover:border-[#b90014] hover:bg-[#b90014]/5 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* LinkedIn Quick Link */}
            <a
              id="hub-social-linkedin-link"
              href={PROFILE_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 text-[#b90014] bg-white hover:border-[#b90014] hover:bg-[#b90014]/5 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* GitHub Quick Link */}
            <a
              id="hub-social-github-link"
              href={PROFILE_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 text-[#b90014] bg-white hover:border-[#b90014] hover:bg-[#b90014]/5 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Vertical Link Navigation Buttons */}
        <section className="w-full flex flex-col space-y-4">
          {/* Primary Action Button: Professional Profile */}
          <button
            id="hub-primary-profile-btn"
            onClick={() => onNavigate('profile')}
            className="w-full bg-[#b90014] text-white border border-transparent rounded-xl py-4 px-6 flex items-center justify-center group hover:bg-[#93000d] active:bg-[#72000a] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-center font-bold text-base tracking-wide">
              <span>Professional Profile</span>
              <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>

          {/* Secondary Action Button: Travels */}
          <button
            id="hub-secondary-travels-btn"
            onClick={() => onNavigate('travels')}
            className="w-full bg-white text-neutral-800 border border-neutral-200 rounded-xl py-4 px-6 flex items-center justify-center group hover:border-[#b90014] hover:text-[#b90014] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#b90014]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            <div className="flex items-center justify-center font-bold text-base relative z-10 tracking-wide">
              <span>Travels</span>
              <Plane className="w-4 h-4 ml-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </button>

          {/* Tertiary Action Button: Get in Touch */}
          <button
            id="hub-tertiary-contact-btn"
            onClick={() => onNavigate('contact')}
            className="w-full bg-white text-neutral-800 border border-neutral-200 rounded-xl py-4 px-6 flex items-center justify-center group hover:border-[#b90014] hover:text-[#b90014] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#b90014]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
            <div className="flex items-center justify-center font-bold text-base relative z-10 tracking-wide">
              <span>Get in Touch</span>
              <MessageSquare className="w-4 h-4 ml-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </section>

        {/* Direct Resume CTA */}
        <div className="w-full mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-center">
          <button
            id="hub-view-resume-badge-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-[#b90014]/10 hover:text-[#b90014] border border-neutral-200 hover:border-[#b90014]/30 text-xs font-semibold text-neutral-700 transition-all duration-200 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#b90014]" />
            <span>View Curriculum Vitae (CV)</span>
            <Sparkles className="w-3.5 h-3.5 text-[#b90014]" />
          </button>
        </div>
      </main>
    </div>
  );
};
