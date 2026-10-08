import React from 'react';
import { ScreenType } from '../types';
import { MapPin, Compass, Code, Briefcase } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenResume }) => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white py-12 mt-auto border-t border-neutral-900">
      <div className="max-w-[640px] mx-auto px-4 flex flex-col items-center space-y-6">
        {/* Row of Icon Buttons */}
        <div className="flex items-center justify-center gap-6">
          <button
            id="footer-icon-travels"
            onClick={() => onNavigate('travels')}
            className="text-[#b90014] hover:opacity-80 hover:scale-110 active:scale-95 transition-all p-2 rounded-full cursor-pointer"
            title="Travels"
          >
            <MapPin className="w-6 h-6 text-[#b90014]" />
          </button>

          <button
            id="footer-icon-compass"
            onClick={() => onNavigate('hub')}
            className="text-[#b90014] hover:opacity-80 hover:scale-110 active:scale-95 transition-all p-2 rounded-full cursor-pointer"
            title="Home Hub"
          >
            <Compass className="w-6 h-6 text-[#b90014]" />
          </button>

          <button
            id="footer-icon-code"
            onClick={() => onNavigate('profile')}
            className="text-[#b90014] hover:opacity-80 hover:scale-110 active:scale-95 transition-all p-2 rounded-full cursor-pointer"
            title="Technical Skills & Projects"
          >
            <Code className="w-6 h-6 text-[#b90014]" />
          </button>

          <button
            id="footer-icon-briefcase"
            onClick={onOpenResume}
            className="text-[#b90014] hover:opacity-80 hover:scale-110 active:scale-95 transition-all p-2 rounded-full cursor-pointer"
            title="Curriculum Vitae"
          >
            <Briefcase className="w-6 h-6 text-[#b90014]" />
          </button>
        </div>

        {/* Text Attributions & Copyright */}
        <div className="text-center space-y-2">
          <p className="text-sm font-bold text-white">Created By Nacho Salinas.</p>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            &copy; 2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
