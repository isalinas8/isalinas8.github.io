import React, { useState } from 'react';
import { ScreenType, TravelDestination } from '../types';
import { TRAVEL_DESTINATIONS } from '../data/portfolio-data';
import { TravelGlobe } from './TravelGlobe';
import { 
  MapPin, 
  Compass, 
  Maximize2,
  User,
  MessageSquare,
  BookOpen,
  ChevronRight,
  Globe as GlobeIcon
} from 'lucide-react';

interface TravelsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectDestination: (dest: TravelDestination) => void;
  onOpenLightbox: (destination: TravelDestination, initialIndex?: number) => void;
}

export const TravelsScreen: React.FC<TravelsScreenProps> = ({
  onNavigate,
  onSelectDestination,
  onOpenLightbox,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showGlobe, setShowGlobe] = useState<boolean>(true);

  const categories = ['All', ...Array.from(new Set(TRAVEL_DESTINATIONS.map(d => d.category)))];

  const filteredDestinations = categoryFilter === 'All'
    ? TRAVEL_DESTINATIONS
    : TRAVEL_DESTINATIONS.filter(d => d.category === categoryFilter);

  const totalCountries = new Set(TRAVEL_DESTINATIONS.map(d => d.country)).size;
  const totalTravels = TRAVEL_DESTINATIONS.length;

  return (
    <div className="w-full flex-grow flex flex-col items-center animate-fadeIn pb-20">
      {/* Top Banner */}
      <div className="w-full bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b90014]/10 text-[#b90014] text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Travel Journal &amp; Routes</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Travels
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mt-1 leading-relaxed">
                Documenting volcanic calderas, emerald crater lakes, and Atlantic coastal trails.
              </p>
            </div>

            {/* Travel Stats Quick Cards */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center min-w-[90px]">
                <span className="block text-2xl font-black text-neutral-900">{totalCountries}</span>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">{totalCountries === 1 ? 'Country' : 'Countries'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-center min-w-[90px]">
                <span className="block text-2xl font-black text-[#b90014]">{totalTravels}</span>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">{totalTravels === 1 ? 'Travel' : 'Travels'}</span>
              </div>
            </div>
          </div>

          {/* Controls Bar: Category Filters & Globe Visibility Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">Filter:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#b90014] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 3D Globe Toggle Button */}
            <button
              onClick={() => setShowGlobe(prev => !prev)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                showGlobe
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              <GlobeIcon className={`w-3.5 h-3.5 ${showGlobe ? 'text-[#e31b23]' : 'text-neutral-500'}`} />
              <span>{showGlobe ? 'Hide 3D Globe' : 'Show 3D Globe'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-10">
        {/* 3D Interactive World Globe (integrated seamlessly into the page) */}
        {showGlobe && (
          <section className="w-full animate-fadeIn">
            <TravelGlobe
              destinations={filteredDestinations}
              onSelectDestination={onSelectDestination}
            />
          </section>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Detailed Itineraries &amp; Guides
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Select a travel destination to view daily logs, interactive maps, and gastronomy.
            </p>
          </div>
        </div>

        {/* Destinations Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs hover:shadow-lg hover:border-[#b90014]/50 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo Display */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={dest.coverImage}
                  alt={dest.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-white/95 text-neutral-900 font-bold text-xs shadow-lg backdrop-blur-xs flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <BookOpen className="w-3.5 h-3.5 text-[#b90014]" />
                    <span>View Full Itinerary ({dest.durationDays} Days)</span>
                  </span>
                </div>

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-neutral-800 shadow-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#b90014]" />
                    {dest.country}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white">
                    {dest.year}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#b90014] text-white">
                    {dest.durationDays} Days
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-lg tracking-tight drop-shadow-xs">{dest.title}</h3>
                  <p className="text-xs text-neutral-200 drop-shadow-xs">{dest.region}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-3">
                    {dest.summary || dest.story}
                  </p>

                  {/* Mini-Itinerary Summary preview */}
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                      <span className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#b90014]" />
                        Route Planning &amp; Highlights
                      </span>
                      <span className="text-[#b90014] font-semibold">{dest.itinerary?.length || 0} Days Itinerary</span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">
                      {dest.itinerary?.map(d => `Day ${d.dayNumber}: ${d.title}`).join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    id={`dest-view-details-${dest.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDestination(dest);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 group-hover:bg-[#b90014] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Itinerary &amp; Tips</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    id={`dest-open-gallery-btn-${dest.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(dest, 0);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                    title="Open Full Gallery"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#b90014]" />
                    <span className="hidden sm:inline">Open Full Gallery</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Screen Navigation Links */}
        <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            id="travels-nav-to-profile-btn"
            onClick={() => onNavigate('profile')}
            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-[#b90014] hover:bg-[#b90014]/5 text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-[#b90014]">Learn More</span>
              <User className="w-4 h-4 text-[#b90014] transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base group-hover:text-[#b90014]">Professional Profile</h4>
            <p className="text-xs text-neutral-500 mt-1">Explore ML engineering experience, technical projects, and skills.</p>
          </button>

          <button
            id="travels-nav-to-contact-btn"
            onClick={() => onNavigate('contact')}
            className="p-5 rounded-2xl bg-[#b90014] text-white hover:bg-[#93000d] text-left group transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">Get in Touch</span>
              <MessageSquare className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="font-bold text-white text-base">Contact Nacho</h4>
            <p className="text-xs text-white/80 mt-1">Connect directly for collaborations, travel tips, or engineering inquiries.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
