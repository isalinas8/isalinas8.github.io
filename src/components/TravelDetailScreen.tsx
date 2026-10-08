import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ScreenType, TravelDestination, ItineraryDay } from '../types';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Utensils, 
  Compass, 
  Lightbulb, 
  ImageIcon, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Layers, 
  Share2, 
  Check, 
  Maximize2,
  Backpack,
  AlertCircle,
  MoveHorizontal,
  ExternalLink,
  Map as MapIcon,
  Route
} from 'lucide-react';

interface TravelDetailScreenProps {
  destination: TravelDestination;
  onNavigate: (screen: ScreenType) => void;
  onOpenLightbox: (destination: TravelDestination, initialIndex?: number) => void;
}

export const TravelDetailScreen: React.FC<TravelDetailScreenProps> = ({
  destination,
  onNavigate,
  onOpenLightbox,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDayByDay, setShowDayByDay] = useState(false);

  // Timeline Scroll & Drag State
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = timelineScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);
  }, []);

  useEffect(() => {
    // Initial check & resize listener
    checkScrollability();
    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollability, destination, showDayByDay]);

  // Scroll to center active day when selected
  const handleSelectDay = (idx: number) => {
    setActiveDayIndex(idx);
    const container = timelineScrollRef.current;
    const targetBox = document.getElementById(`timeline-compact-box-${destination.itinerary?.[idx]?.dayNumber}`);
    if (container && targetBox) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetBox.getBoundingClientRect();
      const scrollOffset = targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleScrollBy = (offset: number) => {
    const el = timelineScrollRef.current;
    if (el) {
      el.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScrollability, 250);
    }
  };

  // Mouse Drag to Scroll
  const onMouseDown = (e: React.MouseEvent) => {
    const el = timelineScrollRef.current;
    if (!el) return;
    setIsMouseDown(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
    setHasMoved(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const el = timelineScrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 6) {
      setHasMoved(true);
    }
    el.scrollLeft = scrollLeftPos - walk;
    checkScrollability();
  };

  const onMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setTimeout(checkScrollability, 100);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentDay: ItineraryDay | undefined = destination.itinerary?.[activeDayIndex];

  // Resolve Google MyMaps URLs
  const effectiveMyMapsUrl = destination.myMapsUrl || 
    (destination.id === 'travel-5' || destination.title.toLowerCase().includes('miguel')
      ? 'https://www.google.com/maps/d/edit?mid=1gsAu8eovJZox_gy4v-ZjVi9SRc15Oso&usp=sharing'
      : undefined);

  const getMyMapsEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/mid=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.google.com/maps/d/embed?mid=${match[1]}`;
    }
    if (url.includes('/embed')) return url;
    return null;
  };

  const myMapsEmbedSrc = getMyMapsEmbedUrl(effectiveMyMapsUrl);

  return (
    <div className="w-full flex-grow flex flex-col items-center animate-fadeIn pb-24">
      {/* Hero Visual Header */}
      <div className="w-full h-72 sm:h-96 md:h-[420px] relative z-0 overflow-hidden bg-neutral-900">
        <img
          src={destination.coverImage}
          alt={destination.title}
          decoding="async"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-black/20 pointer-events-none" />

        {/* Floating Top Controls */}
        <div className="absolute top-4 left-4 right-4 max-w-4xl mx-auto flex items-center justify-between z-10">
          <button
            id="detail-back-to-travels"
            onClick={() => onNavigate('travels')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-[#b90014] text-white backdrop-blur-md transition-all text-xs font-bold shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Travels</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="detail-share-btn"
              onClick={handleShare}
              className="p-2 rounded-xl bg-black/60 hover:bg-neutral-800 text-white backdrop-blur-md transition-all cursor-pointer shadow-md"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              id="detail-open-full-gallery-hero-btn"
              onClick={() => onOpenLightbox(destination, 0)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#b90014] hover:bg-[#93000d] text-white transition-all text-xs font-bold shadow-md cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Open Full Gallery</span>
            </button>
          </div>
        </div>

        {/* Hero Title and Badges */}
        <div className="absolute bottom-6 left-4 right-4 max-w-4xl mx-auto z-10 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/90 text-neutral-900 font-bold text-xs flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#b90014]" />
              {destination.region}, {destination.country}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#e31b23]" />
              {destination.year}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#b90014] text-white font-bold text-xs">
              {destination.durationDays} Days Itinerary
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            {destination.title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-200 mt-1 max-w-2xl drop-shadow-sm font-medium">
            {destination.summary}
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        
        {/* 1. KEY TRIP STATS / RESUMEN: Duración, Fecha Ideal y Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="group p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 ease-out">
            <div className="flex items-center gap-2 text-[#b90014] font-bold text-xs uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Duration &amp; Pace</span>
            </div>
            <p className="text-base font-extrabold text-neutral-900">{destination.durationDays} Planned Days</p>
            <p className="text-xs text-neutral-500 mt-0.5">Active pace, ideal for exploration and trekking</p>
          </div>

          <div className="group p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 ease-out">
            <div className="flex items-center gap-2 text-[#b90014] font-bold text-xs uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Best Season</span>
            </div>
            <p className="text-base font-extrabold text-neutral-900">{destination.bestSeason}</p>
            <p className="text-xs text-neutral-500 mt-0.5">Favorable weather and optimal daylight</p>
          </div>

          <div className="group p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 ease-out">
            <div className="flex items-center gap-2 text-[#b90014] font-bold text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Category / Terrain</span>
            </div>
            <p className="text-base font-extrabold text-neutral-900">{destination.category}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{destination.region}</p>
          </div>
        </div>

        {/* General Description Story (Directly above Day by Day Planning, without a card box) */}
        {destination.story && (
          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {destination.story}
          </p>
        )}

        {/* 2. BLACK BANNER CARD: "See Day by Day Planning" */}
        <div 
          id="see-day-by-day-card"
          onClick={() => setShowDayByDay(prev => !prev)}
          className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-neutral-700 transition-all group"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#b90014] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>See Day by Day Planning</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#b90014] text-white">
                  {destination.durationDays} Days
                </span>
              </h3>
              <p className="text-xs text-neutral-300 mt-0.5">
                Explore the chronological itinerary with daily highlights, photos, key spots &amp; gastronomy.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDayByDay(prev => !prev);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all shrink-0 cursor-pointer border border-white/15"
          >
            <span>{showDayByDay ? 'Hide Day by Day' : 'View Day by Day'}</span>
            {showDayByDay ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* SECTION: DAY BY DAY PLANNING (SE MUESTRA AL HACER CLICK EN LA CAJA NEGRA) */}
        {showDayByDay && (
          <section id="day-by-day-section" className="space-y-6 animate-fadeInSlideUp pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b90014]/10 text-[#b90014] text-xs font-bold uppercase tracking-wider mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Detailed Itinerary</span>
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                  Day-by-Day Planning (Timeline)
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-500 font-medium">
                  Click any day or scroll the timeline
                </span>
                <button
                  onClick={() => setShowDayByDay(false)}
                  className="text-xs font-bold text-neutral-500 hover:text-[#b90014] transition-colors cursor-pointer"
                >
                  Collapse &uarr;
                </button>
              </div>
            </div>

            {/* UNIFIED INTERACTIVE TIMELINE (EJE CRONOLÓGICO CON CAJAS ENLAZADAS) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                    Route Timeline
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                    <MoveHorizontal className="w-3 h-3 text-[#b90014]" />
                    <span>Drag or scroll horizontally to navigate</span>
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#b90014] bg-[#b90014]/10 px-2.5 py-0.5 rounded-full">
                  Day {activeDayIndex + 1} of {destination.itinerary?.length || 0}
                </span>
              </div>

              {/* Interactive Timeline Track with Connected Boxes & Drag Support */}
              <div className="relative">
                {/* Right Overflow / Scroll Indicator */}
                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-3 z-20 flex items-center pr-1 pl-8 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none">
                    <button
                      id="timeline-scroll-right-btn"
                      onClick={() => handleScrollBy(220)}
                      className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b90014] text-white shadow-md flex items-center justify-center hover:bg-[#93000d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}

                {/* Left Overflow / Scroll Indicator */}
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-3 z-20 flex items-center pl-1 pr-8 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none">
                    <button
                      id="timeline-scroll-left-btn"
                      onClick={() => handleScrollBy(-220)}
                      className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-neutral-800 border border-neutral-300 shadow-md flex items-center justify-center hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
                    </button>
                  </div>
                )}

                {/* Scrollable Track */}
                <div
                  ref={timelineScrollRef}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUpOrLeave}
                  onMouseLeave={onMouseUpOrLeave}
                  onScroll={checkScrollability}
                  className="overflow-x-auto pb-3 pt-2 px-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center min-w-max py-2 relative">
                    {destination.itinerary?.map((day, idx) => {
                      const isActive = activeDayIndex === idx;
                      const isPassed = idx < activeDayIndex;
                      const isLast = idx === (destination.itinerary?.length || 0) - 1;

                      return (
                        <React.Fragment key={day.dayNumber}>
                          {/* Compact Box: DAY X + Titulo */}
                          <button
                            id={`timeline-compact-box-${day.dayNumber}`}
                            onClick={() => {
                              if (!hasMoved) {
                                handleSelectDay(idx);
                              }
                            }}
                            className={`relative z-10 w-44 sm:w-52 min-h-[72px] p-3 sm:p-3.5 rounded-xl text-left transition-all duration-200 border cursor-pointer shrink-0 flex flex-col justify-center ${
                              isActive
                                ? 'bg-[#b90014] text-white border-[#b90014] shadow-md ring-4 ring-[#b90014]/20 scale-102'
                                : isPassed
                                ? 'bg-neutral-50 text-neutral-800 border-neutral-300 hover:border-[#b90014]/60 hover:bg-white shadow-2xs'
                                : 'bg-white text-neutral-800 border-neutral-200 hover:border-[#b90014]/60 hover:bg-neutral-50 shadow-2xs'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : isPassed
                                  ? 'bg-neutral-200/80 text-neutral-800'
                                  : 'bg-[#b90014]/10 text-[#b90014]'
                              }`}>
                                DAY {day.dayNumber}
                              </span>
                              {isActive && (
                                <span className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                              isActive ? 'text-white' : 'text-neutral-900'
                            }`}>
                              {day.title}
                            </h4>
                          </button>

                          {/* Connecting Line Segment between boxes */}
                          {!isLast && (
                            <div className={`w-6 sm:w-8 h-0.5 shrink-0 transition-colors z-0 ${
                              isPassed || (isActive && idx < activeDayIndex)
                                ? 'bg-neutral-800'
                                : isActive
                                ? 'bg-[#b90014]'
                                : 'bg-neutral-200'
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVE DAY DETAIL BOX */}
            {currentDay && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-8 animate-fadeIn">
                {/* Header of Active Day */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 rounded-lg bg-[#b90014] text-white text-xs font-extrabold tracking-wider">
                        DAY {currentDay.dayNumber}
                      </span>
                      <span className="text-xs font-bold text-neutral-500">{currentDay.subtitle}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                      {currentDay.title}
                    </h3>
                  </div>

                  {/* Day Navigation buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveDayIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeDayIndex === 0}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      &larr; Previous Day
                    </button>
                    <button
                      onClick={() => setActiveDayIndex((prev) => Math.min((destination.itinerary?.length || 1) - 1, prev + 1))}
                      disabled={activeDayIndex === (destination.itinerary?.length || 1) - 1}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#b90014] text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Next Day &rarr;
                    </button>
                  </div>
                </div>

                {/* Day Narrative / Summary */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-neutral-700 text-sm leading-relaxed">
                  <p className="font-medium">{currentDay.summary}</p>
                </div>

                {/* Day Photos (if any) */}
                {currentDay.photos && currentDay.photos.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#b90014]" />
                        Day {currentDay.dayNumber} Photos
                      </span>
                      <span className="text-neutral-400 text-[11px] font-normal">Click to enlarge</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentDay.photos.map((photoUrl, pIdx) => {
                        let galleryIdx = destination.gallery?.indexOf(photoUrl) ?? -1;
                        if (galleryIdx < 0 && destination.gallery) {
                          const targetFilename = photoUrl.split('/').pop()?.split('?')[0];
                          galleryIdx = destination.gallery.findIndex((g) => {
                            const gFilename = g.split('/').pop()?.split('?')[0];
                            return gFilename === targetFilename;
                          });
                        }
                        const openIndex = galleryIdx >= 0 ? galleryIdx : 0;
                        return (
                          <div
                            key={pIdx}
                            onClick={() => onOpenLightbox(destination, openIndex)}
                            className="h-56 rounded-2xl overflow-hidden relative cursor-pointer group border border-neutral-200 shadow-2xs hover:border-[#b90014]"
                          >
                            <img
                              src={photoUrl}
                              alt={`${currentDay.title} photo ${pIdx + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>View Fullscreen</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Activities & Places to Visit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Activities list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b90014]" />
                      <span>What We Did This Day</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                      {currentDay.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b90014] mt-2 shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. Places visited */}
                  {currentDay.placesToVisit && currentDay.placesToVisit.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#b90014]" />
                        <span>Places &amp; Key Landmarks</span>
                      </h4>
                      <div className="space-y-2">
                        {currentDay.placesToVisit.map((place, i) => {
                          const placeLink = place.url || place.link;
                          return (
                            <div key={i} className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-1 transition-all">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {placeLink ? (
                                    <a
                                      href={placeLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#b90014] transition-colors inline-flex items-center gap-1.5 group truncate"
                                      title={`Open link for ${place.name}`}
                                    >
                                      <span className="truncate group-hover:underline">{place.name}</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-[#b90014] shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                  ) : (
                                    <span className="font-bold text-xs sm:text-sm text-neutral-900 truncate">{place.name}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {placeLink && (
                                    <a
                                      href={placeLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] font-semibold text-[#b90014] hover:underline flex items-center gap-0.5"
                                      title={`View link for ${place.name}`}
                                    >
                                      <span>View link</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                  {place.type && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 font-semibold text-neutral-600">
                                      {place.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {place.note && <p className="text-xs text-neutral-500">{place.note}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Restaurants & Gastronomy + Day Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                  {/* Gastronomy */}
                  {currentDay.restaurants && currentDay.restaurants.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                        <Utensils className="w-4 h-4 text-[#b90014]" />
                        <span>Dining &amp; What to Order</span>
                      </h4>
                      <div className="space-y-2">
                        {currentDay.restaurants.map((rest, i) => {
                          const restaurantLink = rest.url || rest.link;
                          return (
                            <div key={i} className="p-3.5 rounded-xl bg-[#b90014]/5 border border-[#b90014]/15 space-y-1.5 transition-all">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {restaurantLink ? (
                                    <a
                                      href={restaurantLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#b90014] transition-colors inline-flex items-center gap-1.5 group truncate"
                                      title={`Open link for ${rest.name}`}
                                    >
                                      <span className="truncate group-hover:underline">{rest.name}</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-[#b90014] shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                  ) : (
                                    <span className="font-bold text-xs sm:text-sm text-neutral-900 truncate">{rest.name}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {restaurantLink && (
                                    <a
                                      href={restaurantLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[11px] font-semibold text-[#b90014] hover:text-white bg-white hover:bg-[#b90014] px-2 py-0.5 rounded-md border border-[#b90014]/25 transition-all inline-flex items-center gap-1"
                                      title={`View link or location for ${rest.name}`}
                                    >
                                      <span>View link</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                  {rest.rating && (
                                    <span className="text-xs font-bold text-[#b90014] bg-white px-2 py-0.5 rounded-md border border-[#b90014]/20">
                                      ★ {rest.rating}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {rest.dish && (
                                <p className="text-xs text-neutral-700">
                                  <strong>Recommended dish:</strong> {rest.dish}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Day Specific Tips */}
                  {currentDay.tips && currentDay.tips.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Practical Tips for This Day</span>
                      </h4>
                      <div className="space-y-2">
                        {currentDay.tips.map((tip, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-800 space-y-1">
                            <p className="font-medium leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 3. GOOGLE MYMAPS INTERACTIVO */}
        {myMapsEmbedSrc && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b90014]/10 text-[#b90014] text-xs font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google My Maps</span>
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                  Interactive Route &amp; Places Map
                </h2>
              </div>

              {effectiveMyMapsUrl && (
                <a
                  href={effectiveMyMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:border-[#b90014] hover:text-[#b90014] text-neutral-700 text-xs font-bold shadow-2xs transition-all shrink-0 group cursor-pointer"
                  title="Open this route directly in Google Maps in a new tab"
                >
                  <span>Open Full Google Map</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#b90014] group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Google My Maps Embed Container */}
            <div className="w-full h-[450px] sm:h-[520px] rounded-3xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100 relative">
              <iframe
                src={myMapsEmbedSrc}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={`${destination.title} Google My Maps`}
              />
            </div>
            <p className="text-xs text-neutral-500 text-right">
              Use your mouse or fingers to pan, zoom, and inspect waypoints directly on Google Maps.
            </p>
          </section>
        )}

        {/* 5. TIPS GENERALES DEL VIAJE & QUE LLEVAR EN TU MOCHILA (Tras el mapa) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tips Generales del Viaje */}
          {destination.generalTips && destination.generalTips.length > 0 && (
            <div className="group p-6 rounded-3xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 ease-out space-y-4">
              <h3 className="font-extrabold text-base text-neutral-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                <span>General Trip Tips</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
                {destination.generalTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b90014] mt-2 shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Que Llevar en tu Mochila */}
          {destination.recommendedGear && destination.recommendedGear.length > 0 && (
            <div className="group p-6 rounded-3xl bg-white border border-neutral-200 shadow-2xs hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 ease-out space-y-4">
              <h3 className="font-extrabold text-base text-neutral-900 flex items-center gap-2">
                <Backpack className="w-5 h-5 text-[#b90014] group-hover:scale-110 transition-transform duration-300" />
                <span>What to Pack in Your Backpack</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
                {destination.recommendedGear.map((gear, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                    <span className="leading-relaxed">{gear}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={() => onNavigate('travels')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 hover:text-[#b90014] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#b90014]" />
            <span>Back to Travels</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#b90014] hover:underline cursor-pointer"
          >
            <span>Ask me about this route &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

