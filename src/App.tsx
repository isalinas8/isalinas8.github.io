import React, { useState, useEffect } from 'react';
import { ScreenType, TravelDestination } from './types';
import { TRAVEL_DESTINATIONS } from './data/portfolio-data';
import { HeaderNav } from './components/HeaderNav';
import { HubScreen } from './components/HubScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TravelsScreen } from './components/TravelsScreen';
import { TravelDetailScreen } from './components/TravelDetailScreen';
import { ContactScreen } from './components/ContactScreen';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PhotoLightbox } from './components/PhotoLightbox';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('hub');
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(TRAVEL_DESTINATIONS[0]);
  const [lightboxDestination, setLightboxDestination] = useState<TravelDestination | null>(null);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState<number>(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Scroll to top whenever screen changes
  const handleNavigate = (screen: ScreenType, dest?: TravelDestination) => {
    if (dest) {
      setSelectedDestination(dest);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (dest: TravelDestination, photoIdx: number = 0) => {
    setLightboxDestination(dest);
    setLightboxInitialIndex(photoIdx);
  };

  const handleCloseLightbox = () => {
    setLightboxDestination(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c] font-sans selection:bg-[#b90014] selection:text-white">
      {/* Sticky Sub-navigation when navigating outside the main hub */}
      <HeaderNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Dynamic View */}
      <div className="flex-1 flex flex-col">
        {currentScreen === 'hub' && (
          <HubScreen
            onNavigate={handleNavigate}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={handleNavigate}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}

        {currentScreen === 'travels' && (
          <TravelsScreen
            onNavigate={handleNavigate}
            onSelectDestination={(dest) => {
              setSelectedDestination(dest);
              handleNavigate('travel-detail');
            }}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentScreen === 'travel-detail' && selectedDestination && (
          <TravelDetailScreen
            destination={selectedDestination}
            onNavigate={handleNavigate}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactScreen
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Persistent Elegant Dark Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Interactive CV / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Global Photo Lightbox */}
      {lightboxDestination && (
        <PhotoLightbox
          key={`${lightboxDestination.id}-${lightboxInitialIndex}`}
          destination={lightboxDestination}
          initialPhotoIndex={lightboxInitialIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
}
