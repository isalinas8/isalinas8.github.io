import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { TravelDestination } from '../types';
import { MapPin, ArrowRight, RotateCcw } from 'lucide-react';

interface TravelGlobeProps {
  destinations: TravelDestination[];
  onSelectDestination: (dest: TravelDestination) => void;
}

interface DestinationPoint {
  lat: number;
  lng: number;
  name: string;
  shortName: string;
  country: string;
  region: string;
  durationDays: number;
  year: string;
  category: string;
  coverImage: string;
  destination: TravelDestination;
}

export const TravelGlobe: React.FC<TravelGlobeProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });
  const [selectedPoint, setSelectedPoint] = useState<DestinationPoint | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Map destinations to points with clean ASCII labels (e.g. Sao Miguel without accents)
  const destinationPoints: DestinationPoint[] = useMemo(() => {
    return destinations
      .filter((d) => d.coordinates && typeof d.coordinates.lat === 'number' && typeof d.coordinates.lng === 'number')
      .map((d) => {
        // Ensure clean text without accent glyph issues
        const cleanName = d.title.replace(/ã/g, 'a').replace(/Ã/g, 'A');
        const shortName = cleanName.includes('–')
          ? cleanName.split('–')[0].trim()
          : cleanName.includes('-')
          ? cleanName.split('-')[0].trim()
          : cleanName;

        return {
          lat: d.coordinates!.lat,
          lng: d.coordinates!.lng,
          name: cleanName,
          shortName: shortName,
          country: d.country,
          region: d.region.replace(/ã/g, 'a').replace(/Ã/g, 'A'),
          durationDays: d.durationDays,
          year: d.year,
          category: d.category,
          coverImage: d.coverImage,
          destination: d,
        };
      });
  }, [destinations]);

  // Rings data for pulsating radar ripples at destination coordinates
  const ringsData = useMemo(() => {
    return destinationPoints.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      maxR: 4.5,
      propagationSpeed: 1.4,
      repeatPeriod: 1100,
      color: '#b90014',
    }));
  }, [destinationPoints]);

  // Pause rotation and resume automatically after 10s of inactivity
  const pauseAndScheduleResume = useCallback(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
    }

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
        }
      }
    }, 10000);
  }, []);

  // Responsive container observer - balanced sizing
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        const height = Math.max(420, Math.min(520, Math.round(clientWidth * 0.56)));
        setDimensions({
          width: clientWidth,
          height: height,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Initialize globe controls and initial camera point of view
  const handleGlobeReady = () => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.enableZoom = true;
        controls.minDistance = 130;
        controls.maxDistance = 450;

        // Listen to manual drag/start events on OrbitControls
        controls.addEventListener('start', () => {
          pauseAndScheduleResume();
        });
      }

      // Initial point of view closer for a larger, more impactful globe view
      if (destinationPoints.length > 0) {
        const first = destinationPoints[0];
        globeRef.current.pointOfView(
          { lat: first.lat + 4, lng: first.lng, altitude: 1.8 },
          1000
        );
      }
    }
  };

  // Handler when clicking a location point or label
  const handlePointSelect = (point: DestinationPoint) => {
    setSelectedPoint(point);
    pauseAndScheduleResume();

    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.55 },
        1200
      );
    }
  };

  // Handler to reset the original zoom & camera position
  const handleResetZoom = () => {
    setSelectedPoint(null);
    pauseAndScheduleResume();

    if (globeRef.current) {
      if (destinationPoints.length > 0) {
        const first = destinationPoints[0];
        globeRef.current.pointOfView(
          { lat: first.lat + 4, lng: first.lng, altitude: 1.8 },
          900
        );
      } else {
        globeRef.current.pointOfView(
          { lat: 25, lng: -20, altitude: 1.85 },
          900
        );
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={pauseAndScheduleResume}
      onWheel={pauseAndScheduleResume}
      onTouchStart={pauseAndScheduleResume}
      className="w-full relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing my-2"
      style={{ height: `${dimensions.height}px` }}
    >
      {/* Small Reset Zoom Button in the top right corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleResetZoom();
        }}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 px-2.5 py-1.5 rounded-xl bg-white/85 hover:bg-white text-neutral-800 hover:text-neutral-900 border border-neutral-200/90 shadow-xs hover:shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold group"
        title="Reset original zoom & view"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#b90014] group-hover:-rotate-90 transition-transform duration-300" />
        <span className="text-[11px] font-bold text-neutral-700 group-hover:text-neutral-900">Reset Zoom</span>
      </button>

      {/* 3D Globe Canvas with soft subtle radial edge falloff */}
      <div 
        className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-auto"
        style={{
          maskImage: 'radial-gradient(ellipse 99% 97% at 50% 50%, black 93%, rgba(0, 0, 0, 0.7) 97%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 99% 97% at 50% 50%, black 93%, rgba(0, 0, 0, 0.7) 97%, transparent 100%)'
        }}
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0, 0, 0, 0)"
          globeImageUrl="https://unpkg.com/three-globe@2.45.2/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe@2.45.2/example/img/earth-topology.png"
          showAtmosphere={true}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.16}
          onGlobeReady={handleGlobeReady}
          // Points
          pointsData={destinationPoints}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => '#b90014'}
          pointAltitude={0.06}
          pointRadius={1.35}
          pointResolution={24}
          onPointClick={(point) => {
            handlePointSelect(point as DestinationPoint);
          }}
          // Radar Rings
          ringsData={ringsData}
          ringLat="lat"
          ringLng="lng"
          ringColor="color"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          // Labels
          labelsData={destinationPoints}
          labelLat="lat"
          labelLng="lng"
          labelText={(d) => (d as DestinationPoint).shortName}
          labelSize={1.45}
          labelDotRadius={0.7}
          labelColor={() => '#ffffff'}
          labelAltitude={0.05}
          onLabelClick={(label) => {
            handlePointSelect(label as DestinationPoint);
          }}
        />
      </div>

      {/* Perimeter Edge Gradients: Minimal & micro (12px-16px) for an ultra-subtle border blend */}
      <div className="absolute inset-x-0 top-0 h-3 sm:h-4 bg-gradient-to-b from-[#f9f9f9] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-3 sm:h-4 bg-gradient-to-t from-[#f9f9f9] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-[#f9f9f9] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-3 sm:w-4 bg-gradient-to-l from-[#f9f9f9] to-transparent pointer-events-none z-10" />

      {/* Selected Destination Card Overlay */}
      {selectedPoint && (
        <div 
          className="absolute bottom-4 right-4 z-20 w-80 max-w-[calc(100vw-32px)] bg-neutral-900/95 border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-3 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[#e31b23] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedPoint.region}</span>
            </div>
            <button
              onClick={() => {
                setSelectedPoint(null);
                pauseAndScheduleResume();
              }}
              className="text-neutral-400 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
              title="Close overlay"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-3">
            <img
              src={selectedPoint.coverImage}
              alt={selectedPoint.name}
              className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-white leading-tight truncate">
                {selectedPoint.name}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                <span>{selectedPoint.country}</span>
                <span>&bull;</span>
                <span>{selectedPoint.year}</span>
              </p>
              <div className="mt-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#b90014]/20 text-[#e31b23] border border-[#b90014]/30">
                  {selectedPoint.durationDays} Days Itinerary
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectDestination(selectedPoint.destination)}
            className="w-full py-2 px-3 rounded-xl bg-[#b90014] hover:bg-[#93000d] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer group"
          >
            <span>Explore Detailed Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

