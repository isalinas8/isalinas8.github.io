import React from 'react';
import { ScreenType } from '../types';
import { ArrowLeft, User, Compass, MessageSquare, FileText, Share2, Check } from 'lucide-react';

interface HeaderNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenResume: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  onNavigate,
  onOpenResume,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (currentScreen === 'hub') {
    return null;
  }

  const screenTitles: Record<ScreenType, string> = {
    hub: 'Home Hub',
    profile: 'Professional Profile',
    travels: 'Travels',
    'travel-detail': 'Trip Details',
    contact: 'Get in Touch',
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 transition-all duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <button
            id="nav-back-button"
            onClick={() => onNavigate(currentScreen === 'travel-detail' ? 'travels' : 'hub')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-neutral-700 hover:text-[#b90014] hover:bg-[#b90014]/5 transition-all duration-200 border border-neutral-200 hover:border-[#b90014]/30 cursor-pointer"
            title={currentScreen === 'travel-detail' ? 'Back to Travels' : 'Back to Hub'}
          >
            <ArrowLeft className="w-4 h-4 text-[#b90014]" />
            <span>{currentScreen === 'travel-detail' ? 'Back to Travels' : 'Back to Hub'}</span>
          </button>

          <span className="hidden sm:inline text-neutral-300">|</span>
          <span className="hidden sm:inline font-bold text-neutral-900 text-sm">
            {screenTitles[currentScreen]}
          </span>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-profile-tab"
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentScreen === 'profile'
                ? 'bg-[#b90014] text-white shadow-sm'
                : 'text-neutral-600 hover:text-[#b90014] hover:bg-neutral-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Profile</span>
          </button>

          <button
            id="nav-travels-tab"
            onClick={() => onNavigate('travels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentScreen === 'travels' || currentScreen === 'travel-detail'
                ? 'bg-[#b90014] text-white shadow-sm'
                : 'text-neutral-600 hover:text-[#b90014] hover:bg-neutral-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Travels</span>
          </button>

          <button
            id="nav-contact-tab"
            onClick={() => onNavigate('contact')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentScreen === 'contact'
                ? 'bg-[#b90014] text-white shadow-sm'
                : 'text-neutral-600 hover:text-[#b90014] hover:bg-neutral-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Contact</span>
          </button>

          <div className="h-4 w-px bg-neutral-200 mx-1 hidden sm:block"></div>

          {/* Quick Resume Button */}
          {currentScreen === 'profile' && (
            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all border border-neutral-200"
              title="View Resume / CV"
            >
              <FileText className="w-3.5 h-3.5 text-[#b90014]" />
              <span className="hidden sm:inline">CV</span>
            </button>
          )}

          {/* Share Button */}
          <button
            id="nav-share-btn"
            onClick={handleShare}
            className="p-1.5 rounded-lg text-neutral-600 hover:text-[#b90014] hover:bg-neutral-100 transition-all border border-transparent hover:border-neutral-200"
            title="Copy link to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
