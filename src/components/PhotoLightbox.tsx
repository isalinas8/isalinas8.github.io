import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { TravelDestination } from '../types';

interface PhotoLightboxProps {
  destination: TravelDestination | null;
  initialPhotoIndex?: number;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  destination,
  initialPhotoIndex = 0,
  onClose,
}) => {
  const photos = destination?.gallery && destination.gallery.length > 0
    ? destination.gallery
    : (destination ? [destination.coverImage] : []);

  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);

  // Synchronize currentIndex whenever initialPhotoIndex or destination changes
  useEffect(() => {
    if (photos.length > 0) {
      const clamped = Math.max(0, Math.min(initialPhotoIndex, photos.length - 1));
      setCurrentIndex(clamped);
    } else {
      setCurrentIndex(0);
    }
  }, [initialPhotoIndex, destination, photos.length]);

  // Keyboard navigation for Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!destination) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [destination, photos.length, onClose]);

  if (!destination) return null;

  const currentPhoto = photos[currentIndex] || destination.coverImage;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-4 py-3 bg-black/60 border-b border-neutral-800 flex items-center justify-between text-white text-sm z-10">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-neutral-200">
              <MapPin className="w-4 h-4 text-[#e31b23]" />
              {destination.title}, {destination.country}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Photo Area */}
        <div className="relative flex-1 flex items-center justify-center bg-black min-h-[320px] sm:min-h-[460px] overflow-hidden group">
          <img
            src={currentPhoto}
            alt={`${destination.title} photo`}
            className="max-h-[65vh] w-auto object-contain mx-auto transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-[#b90014] text-white backdrop-blur-sm transition-all duration-200"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-[#b90014] text-white backdrop-blur-sm transition-all duration-200"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Thumbnails row */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700/50">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'bg-[#e31b23] scale-125'
                      : 'bg-neutral-500 hover:bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Details Bar */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 text-neutral-300 text-xs sm:text-sm">
          <p className="font-medium text-white mb-2 leading-relaxed">{destination.story}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {destination.highlights.map((h, i) => (
              <span 
                key={i} 
                className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-950/40 text-red-500 border border-red-800/50"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
