import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  School,
  Home,
  HeartHandshake,
  ArrowRight,
  Info,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe2,
  Mountain,
  Satellite,
  Navigation,
} from 'lucide-react';

export type CenterCategory = 'all' | 'residential' | 'school' | 'community';
export type MapTileStyle = 'streets' | 'satellite' | 'terrain';

export interface LocationCenter {
  id: string;
  name: string;
  alternateName?: string;
  category: 'residential' | 'school' | 'community';
  categoryLabel: string;
  tagColor: string;
  pinBgColor: string;
  icon: React.ComponentType<{ className?: string }>;
  county: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
    elevation: string;
  };
  image: string;
  imageAlt: string;
  summary: string;
  longDescription: string;
  whoIsServed: string;
  keyStats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  whatFurahaProvides: string[];
  dailySchedule: {
    time: string;
    activity: string;
  }[];
  urgentNeeds: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
  donationCause: string;
  facilities: string[];
}

export const KENYA_OPERATING_CENTERS: LocationCenter[] = [
  {
    id: 'amani',
    name: "Amani Children's Home",
    alternateName: "Amani Family Haven & Academy Partnership",
    category: 'residential',
    categoryLabel: 'Residential Care & School Support',
    tagColor: 'bg-[#893d2d] text-white',
    pinBgColor: '#893d2d',
    icon: Home,
    county: 'Kiambu County',
    region: 'Central Kenya Highlands',
    coordinates: {
      lat: -1.1442,
      lng: 36.9817,
      formatted: "1°08'39.1\"S, 36°58'54.1\"E",
      elevation: '1,530m above sea level',
    },
    image: '/images/DSCF0007.jpg',
    imageAlt: "Study classrooms and desks at Amani Children's Home in Kenya",
    summary:
      "A permanent, loving home in Kiambu providing shelter, education, balanced nutrition, and holistic care for orphaned and vulnerable children.",
    longDescription:
      "Amani Children's Home serves as a foundational sanctuary for children who have lost parents or come from extreme family vulnerability. Rather than institutional warehousing, Amani operates on a family-style model where children live in secure cottages with house mothers, receive regular healthcare, and are fully sponsored in local primary and secondary partner schools.",
    whoIsServed:
      '45 full-time resident children (ages 4 to 18+) and dozens of vulnerable day-scholars from the neighboring community.',
    keyStats: [
      { label: 'Resident Children', value: '45+', sublabel: 'Full-time shelter & care' },
      { label: 'School Enrollment', value: '100%', sublabel: 'Enrolled in primary & secondary' },
      { label: 'Daily Meals', value: '135', sublabel: 'Balanced breakfast, lunch & dinner' },
      { label: 'Years in Partnership', value: '6+', sublabel: 'Continuous ministry presence' },
    ],
    whatFurahaProvides: [
      'Full school fees, exam levies, uniforms, and textbooks',
      'Daily nutritional meals (balanced porridge, fresh vegetables, beans, and ugali)',
      'Modern sanitation infrastructure and clean drinking water filtration',
      'Daily devotional mentorship, trauma-informed counseling, and family care',
    ],
    dailySchedule: [
      { time: '06:00 AM', activity: 'Morning prayer, chore fellowship & warm breakfast' },
      { time: '07:30 AM', activity: 'Walk to local partner primary & junior secondary schools' },
      { time: '01:00 PM', activity: 'Hot lunch program at school or center pavilion' },
      { time: '04:30 PM', activity: 'Return home, sports, games & outdoor play' },
      { time: '06:00 PM', activity: 'Supervised homework study hall & tutoring' },
      { time: '07:30 PM', activity: 'Family dinner, scripture reading & evening devotions' },
    ],
    urgentNeeds: [
      'Secondary boarding school tuition sponsorship ($30/mo per student)',
      'Curriculum textbooks for Grades 7 and 8 (Competency-Based Curriculum)',
      'Dry pantry replenishment: maize flour, beans, cooking oil, and lentils',
    ],
    quote: {
      text: "At Amani, these children don't just find a roof over their heads. They find an identity as loved sons and daughters, and the education to rewrite their future.",
      author: 'Mama Naomi',
      role: "Home Administrator & Caregiver, Amani Children's Home",
    },
    donationCause: "Amani Children's Home",
    facilities: [
      'Cottage Dormitories',
      'Study Hall & Library',
      'Community Dining Hall',
      'Borehole Water Filtration',
      'Kitchen Garden',
    ],
  },
  {
    id: 'west-hill',
    name: 'West Hill Learning Community',
    alternateName: 'West Hill Educational Support Center',
    category: 'school',
    categoryLabel: 'Community School & Study Center',
    tagColor: 'bg-[#0284c7] text-white',
    pinBgColor: '#0284c7',
    icon: School,
    county: 'Central Kenya Region',
    region: 'Highland Ridge',
    coordinates: {
      lat: -1.1128,
      lng: 36.6432,
      formatted: "1°06'46.1\"S, 36°38'35.5\"E",
      elevation: '2,270m above sea level',
    },
    image: '/images/Purity.jpg',
    imageAlt: 'West Hill community learners in classroom uniform in Kenya',
    summary:
      'A community educational pillar keeping vulnerable students enrolled in primary and junior secondary school in Kenya.',
    longDescription:
      'Many vulnerable families cannot afford the hidden costs of public schooling—including activity levies, required uniforms, desk fees, and government examination registrations. West Hill steps into this gap so no child is sent home or drops out due to poverty.',
    whoIsServed:
      'Over 120 primary and junior secondary learners living in impoverished peri-urban and tea-estate communities.',
    keyStats: [
      { label: 'Students Supported', value: '120+', sublabel: 'Active academic scholarships' },
      { label: 'School Attendance', value: '98%', sublabel: 'Retention through tuition relief' },
      { label: 'Daily School Lunches', value: '120', sublabel: 'Warm midday meals served' },
      { label: 'Girls Sanitary Kits', value: '100%', sublabel: 'Preventing school absenteeism' },
    ],
    whatFurahaProvides: [
      'Tuition aid, national examination fees (KCPE / KPSEA), and desk stipends',
      'Curriculum books, stationery packs, geometry sets, and durable backpacks',
      'Nutritious mid-day school lunches preventing midday hunger and dropouts',
      'Remedial tutoring sessions led by local volunteer teachers like Teacher Purity',
    ],
    dailySchedule: [
      { time: '07:00 AM', activity: 'Arrival at learning center & morning study review' },
      { time: '08:00 AM', activity: 'Formal classes: Mathematics, English, Kiswahili, Science' },
      { time: '12:45 PM', activity: 'Hot school lunch provided by Furaha nutrition program' },
      { time: '02:00 PM', activity: 'Afternoon interactive STEM, social studies & creative arts' },
      { time: '04:00 PM', activity: 'Remedial tutoring for struggling readers & homework aid' },
      { time: '05:00 PM', activity: 'Youth mentorship circle & distribution of take-home resources' },
    ],
    urgentNeeds: [
      'New desk benches to replace broken wooden furniture in classrooms',
      'Textbooks for junior secondary science and computer literacy kits',
      'Term 2 examination fees for 25 high-risk candidate students',
    ],
    quote: {
      text: "Before Furaha provided our students with lunch and tuition help, children would faint in class by noon. Today, our students are ranking at the top of our zonal exams.",
      author: 'Teacher Purity',
      role: 'Lead Educator & Academic Coordinator, West Hill',
    },
    donationCause: 'West Hill',
    facilities: [
      'Classroom Blocks',
      'Reading & Textbooks Corner',
      'Midday Lunch Pavilion',
      'Sanitation Block',
      'Playground Area',
    ],
  },
];

// Tile Layer configurations with high reliability and zero API key requirements
const TILE_LAYERS: Record<MapTileStyle, { url: string; attribution: string; maxZoom: number; subdomains?: string }> = {
  streets: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
    maxZoom: 19,
    subdomains: 'abcd',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org" target="_blank" rel="noreferrer">OpenTopoMap</a>',
    maxZoom: 17,
    subdomains: 'abc',
  },
};

interface KenyaInteractiveLocationsMapProps {
  onSupportCenter?: (centerName: string) => void;
  onExploreWork?: () => void;
  className?: string;
  initialCenterId?: string;
}

export const KenyaInteractiveLocationsMap: React.FC<KenyaInteractiveLocationsMapProps> = ({
  onSupportCenter,
  onExploreWork,
  className = '',
  initialCenterId,
}) => {
  const [selectedCenterId, setSelectedCenterId] = useState<string>(
    initialCenterId || KENYA_OPERATING_CENTERS[0].id
  );
  const [activeCategory, setActiveCategory] = useState<CenterCategory>('all');
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('streets');
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'schedule' | 'needs'>('overview');
  const [viewScope, setViewScope] = useState<'corridor' | 'kenya' | 'focus'>('corridor');
  const [isCopiedGps, setIsCopiedGps] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const currentCenter =
    KENYA_OPERATING_CENTERS.find((c) => c.id === selectedCenterId) ||
    KENYA_OPERATING_CENTERS[0];

  const displayedCenters = KENYA_OPERATING_CENTERS.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  // Helper to generate custom HTML pin for Leaflet
  const createMarkerIcon = (center: LocationCenter, isSelected: boolean) => {
    const pulseRing = isSelected
      ? `<span class="absolute -inset-2.5 rounded-full animate-ping opacity-40" style="background-color: ${center.pinBgColor}"></span>
         <span class="absolute -inset-1.5 rounded-full opacity-30" style="background-color: ${center.pinBgColor}"></span>`
      : '';

    const labelBadge = `
      <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-md pointer-events-none transition-all duration-200 ${
        isSelected
          ? 'bg-[#201a18] text-white ring-2 ring-white scale-105'
          : 'bg-white/95 text-[#201a18] border border-[#ebdcd0]'
      }">
        ${center.name.split(' ')[0]}
      </div>
    `;

    const svgPath =
      center.category === 'residential'
        ? '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
        : center.category === 'school'
        ? '<path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/>'
        : '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>';

    const html = `
      <div class="relative group cursor-pointer" style="transform: translate(-50%, -100%);">
        ${pulseRing}
        ${labelBadge}
        <div class="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-200 group-hover:scale-110 ${
          isSelected ? 'ring-3 ring-white scale-110' : ''
        }" style="background-color: ${center.pinBgColor}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            ${svgPath}
          </svg>
        </div>
        <div class="w-2.5 h-2.5 mx-auto -mt-1 rotate-45 border-r border-b shadow-xs" style="background-color: ${center.pinBgColor}"></div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html,
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -42],
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered on the Central Kenya Operating Corridor
    const map = L.map(mapContainerRef.current, {
      center: [-1.18, 36.81],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false, // Avoid trapping page scroll
    });

    // Add clean zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Tile Layer
    const layerConfig = TILE_LAYERS[tileStyle];
    const initialLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains || 'abc',
    }).addTo(map);

    tileLayerRef.current = initialLayer;
    mapInstanceRef.current = map;

    // Add visual operating corridor connection polyline
    const corridorCoords: [number, number][] = [
      [-1.1128, 36.6432], // West Hill
      [-1.1442, 36.9817], // Amani
    ];

    L.polyline(corridorCoords, {
      color: '#893d2d',
      weight: 2,
      opacity: 0.45,
      dashArray: '5, 8',
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when tileStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const layerConfig = TILE_LAYERS[tileStyle];
    const newLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains || 'abc',
    }).addTo(map);

    tileLayerRef.current = newLayer;
  }, [tileStyle]);

  // Sync Markers with Map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.keys(markersRef.current).forEach((key) => {
      markersRef.current[key]?.remove();
    });
    markersRef.current = {};

    displayedCenters.forEach((center) => {
      const isSelected = center.id === selectedCenterId;
      const icon = createMarkerIcon(center, isSelected);

      const marker = L.marker([center.coordinates.lat, center.coordinates.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 100,
        title: center.name,
      }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="font-family: inherit; min-width: 220px; padding: 4px;">
          <div style="font-size: 11px; font-weight: 700; color: #717275; text-transform: uppercase; margin-bottom: 2px;">
            ${center.county}
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #201a18; margin-bottom: 6px;">
            ${center.name}
          </div>
          <div style="font-size: 12px; color: #59524e; line-height: 1.4; margin-bottom: 8px;">
            ${center.summary}
          </div>
          <div style="font-size: 11px; color: #893d2d; font-weight: 700;">
            ${center.keyStats[0].label}: ${center.keyStats[0].value}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: false,
        className: 'custom-clean-popup',
      });

      marker.on('click', () => {
        handleSelectCenter(center.id);
      });

      markersRef.current[center.id] = marker;
    });
  }, [displayedCenters, selectedCenterId]);

  const handleSelectCenter = (centerId: string) => {
    setSelectedCenterId(centerId);
    const center = KENYA_OPERATING_CENTERS.find((c) => c.id === centerId);
    if (!center || !mapInstanceRef.current) return;

    mapInstanceRef.current.flyTo([center.coordinates.lat, center.coordinates.lng], 14, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    // Automatically open the popup for this marker
    const marker = markersRef.current[centerId];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 700);
    }

    // Scroll to detail drawer on mobile
    if (window.innerWidth < 1024) {
      const detailPanel = document.getElementById('kenya-center-detail-panel');
      if (detailPanel) {
        setTimeout(() => {
          detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    }
  };

  const handleViewScope = (scope: 'corridor' | 'kenya' | 'focus') => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    setViewScope(scope);

    if (scope === 'corridor') {
      // Fit bounds of the 3 main centers with generous padding
      const bounds = L.latLngBounds(
        KENYA_OPERATING_CENTERS.map((c) => [c.coordinates.lat, c.coordinates.lng])
      );
      map.flyToBounds(bounds.pad(0.35), { duration: 1.2 });
    } else if (scope === 'kenya') {
      // Whole country of Kenya
      map.flyTo([0.35, 37.5], 6.5, { duration: 1.5 });
    } else if (scope === 'focus') {
      // High-resolution street/satellite view of the selected center
      map.flyTo([currentCenter.coordinates.lat, currentCenter.coordinates.lng], 16, {
        duration: 1.2,
      });
    }
  };

  const handleCycleCenter = (direction: 'next' | 'prev') => {
    const currentIndex = KENYA_OPERATING_CENTERS.findIndex((c) => c.id === selectedCenterId);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= KENYA_OPERATING_CENTERS.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = KENYA_OPERATING_CENTERS.length - 1;
    handleSelectCenter(KENYA_OPERATING_CENTERS[nextIndex].id);
  };

  const copyGpsCoordinates = () => {
    navigator.clipboard.writeText(
      `${currentCenter.coordinates.lat}, ${currentCenter.coordinates.lng}`
    );
    setIsCopiedGps(true);
    setTimeout(() => setIsCopiedGps(false), 2000);
  };

  return (
    <section
      id="kenya-operations-map"
      className={`py-12 sm:py-20 bg-[#faf8f5] text-[#201a18] border-y border-[#ebdcd0] ${className}`}
      aria-labelledby="kenya-map-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#893d2d]/10 text-[#893d2d] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Geographic Map</span>
          </div>
          <h2
            id="kenya-map-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#201a18] mb-3"
          >
            Where Furaha Ministries Operates in Kenya
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#59524e] font-normal leading-relaxed">
            Real geographic map of Furaha&apos;s partner centers in Kenya. Pan, zoom, switch between high-resolution satellite imagery or street maps, and click any center to inspect daily rhythms, student enrollment, and field needs.
          </p>
        </div>

        {/* Filter Toolbar & Map Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#ebdcd0]">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0] hover:bg-[#ebdcd0]/30'
              }`}
            >
              All Centers ({KENYA_OPERATING_CENTERS.length})
            </button>
            <button
              onClick={() => setActiveCategory('residential')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'residential'
                  ? 'bg-[#893d2d] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0] hover:bg-[#ebdcd0]/30'
              }`}
            >
              <Home className="w-3 h-3" />
              <span>Children&apos;s Home</span>
            </button>
            <button
              onClick={() => setActiveCategory('school')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'school'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0] hover:bg-[#ebdcd0]/30'
              }`}
            >
              <School className="w-3 h-3" />
              <span>Community Schools</span>
            </button>
            <button
              onClick={() => setActiveCategory('community')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === 'community'
                  ? 'bg-[#d97706] text-white shadow-xs'
                  : 'bg-white text-[#59524e] hover:text-[#201a18] border border-[#ebdcd0] hover:bg-[#ebdcd0]/30'
              }`}
            >
              <HeartHandshake className="w-3 h-3" />
              <span>Urban Grassroots Centers</span>
            </button>
          </div>

          {/* Map Layer Switcher (Streets, Satellite, Terrain) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#717275] hidden sm:inline">Layer:</span>
            <div className="inline-flex rounded-lg bg-white p-1 border border-[#ebdcd0] shadow-2xs">
              <button
                onClick={() => setTileStyle('streets')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  tileStyle === 'streets'
                    ? 'bg-[#893d2d] text-white font-semibold'
                    : 'text-[#59524e] hover:text-[#201a18]'
                }`}
                title="Clean Street & Community Map"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Streets</span>
              </button>
              <button
                onClick={() => setTileStyle('satellite')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  tileStyle === 'satellite'
                    ? 'bg-[#893d2d] text-white font-semibold'
                    : 'text-[#59524e] hover:text-[#201a18]'
                }`}
                title="Real Satellite Aerial Photography"
              >
                <Satellite className="w-3.5 h-3.5" />
                <span>Satellite</span>
              </button>
              <button
                onClick={() => setTileStyle('terrain')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  tileStyle === 'terrain'
                    ? 'bg-[#893d2d] text-white font-semibold'
                    : 'text-[#59524e] hover:text-[#201a18]'
                }`}
                title="Topographic Elevation & Ridge Map"
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>Terrain</span>
              </button>
            </div>
          </div>

        </div>

        {/* Main Grid: Real Leaflet Map (Left/Top) + Center Detail Card (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =========================================================
              LEFT COLUMN (col-span-7): Real Leaflet Interactive Map
             ========================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="relative bg-white rounded-3xl border border-[#ebdcd0] p-2 sm:p-3 shadow-sm overflow-hidden">
              
              {/* Floating Camera Preset Controls (Top-Left) */}
              <div className="absolute top-5 left-5 z-[500] flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#ebdcd0] shadow-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#201a18] tracking-tight">
                    Active Ground Operations
                  </span>
                </div>

                <div className="bg-white/95 backdrop-blur-xs rounded-xl border border-[#ebdcd0] shadow-sm p-1 flex items-center gap-1">
                  <button
                    onClick={() => handleViewScope('corridor')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewScope === 'corridor'
                        ? 'bg-[#893d2d] text-white'
                        : 'text-[#59524e] hover:bg-[#faf8f5]'
                    }`}
                    title="Frame the Operating Partner Centers in Kenya"
                  >
                    Partner Centers
                  </button>
                  <button
                    onClick={() => handleViewScope('kenya')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewScope === 'kenya'
                        ? 'bg-[#893d2d] text-white'
                        : 'text-[#59524e] hover:bg-[#faf8f5]'
                    }`}
                    title="View entire Kenya from Lake Victoria to Indian Ocean"
                  >
                    Whole Kenya
                  </button>
                  <button
                    onClick={() => handleViewScope('focus')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewScope === 'focus'
                        ? 'bg-[#893d2d] text-white'
                        : 'text-[#59524e] hover:bg-[#faf8f5]'
                    }`}
                    title="Zoom in close to the currently selected center"
                  >
                    Pin Zoom
                  </button>
                </div>
              </div>

              {/* Real Leaflet Map Canvas */}
              <div
                ref={mapContainerRef}
                className="w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden z-10"
                style={{ background: '#e2d9ce' }}
                aria-label="Interactive map showing Furaha operating centers in Kenya"
              />

              {/* Map Footer Bar with Geographic Metadata */}
              <div className="mt-3 px-2 pt-2 border-t border-[#ebdcd0]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#59524e]">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#893d2d]" />
                  <span>Selected: <strong>{currentCenter.name}</strong> ({currentCenter.region})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#717275]">{currentCenter.coordinates.formatted}</span>
                  <button
                    onClick={copyGpsCoordinates}
                    className="text-[11px] font-bold text-[#893d2d] hover:underline cursor-pointer"
                  >
                    {isCopiedGps ? 'Copied!' : 'Copy GPS'}
                  </button>
                </div>
              </div>

            </div>

            {/* Quick-Switch Cards Below Map */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {KENYA_OPERATING_CENTERS.map((center) => {
                const isSelected = selectedCenterId === center.id;
                const IconComponent = center.icon;

                return (
                  <button
                    key={center.id}
                    onClick={() => handleSelectCenter(center.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#893d2d] ring-2 ring-[#893d2d]/20 shadow-md scale-[1.02]'
                        : 'bg-white/90 border-[#ebdcd0] hover:bg-white hover:border-[#893d2d]/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: center.pinBgColor }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#201a18] block truncate">
                          {center.name}
                        </span>
                        <span className="text-[11px] text-[#717275] block truncate">
                          {center.county}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ebdcd0]/60 text-[11px]">
                      <span className="text-[#893d2d] font-bold">{center.keyStats[0].value} {center.keyStats[0].label}</span>
                      <span className="text-[#717275]">Fly to pin &rarr;</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Real Geographic Corridor Context Note */}
            <div className="p-4 rounded-2xl bg-white border border-[#ebdcd0] text-xs text-[#59524e] leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-[#893d2d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#201a18] font-bold">Why These Communities?</strong> Furaha concentrates its partnerships with local community programs in Kenya. This allows our local team to conduct weekly in-person site visits, deliver bulk foodstuffs efficiently, and monitor students without heavy administrative overhead.
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (col-span-5): Selected Center Detail Panel
             ========================================================= */}
          <div
            id="kenya-center-detail-panel"
            className="lg:col-span-5 bg-white rounded-3xl border border-[#ebdcd0] shadow-sm overflow-hidden flex flex-col"
          >
            {/* Center Image Header with Badges */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#201a18]">
              <img
                src={currentCenter.image}
                alt={currentCenter.imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Floating Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${currentCenter.tagColor} shadow-2xs`}>
                  {currentCenter.categoryLabel}
                </span>

                <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-[#201a18] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Partner</span>
                </span>
              </div>

              {/* Bottom Image Overlay: Title & Region */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5 drop-shadow-xs">
                  {currentCenter.name}
                </h3>
                <p className="text-xs font-medium text-white/85 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#f7e4b7]" />
                  <span>{currentCenter.county} · {currentCenter.region}</span>
                </p>
                <p className="text-[11px] text-white/70 mt-0.5">
                  Elevation: {currentCenter.coordinates.elevation}
                </p>
              </div>
            </div>

            {/* Navigation Tabs for Center Details */}
            <div className="flex border-b border-[#ebdcd0] bg-[#faf8f5] px-4 pt-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-[#893d2d] text-[#893d2d]'
                    : 'border-transparent text-[#717275] hover:text-[#201a18]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === 'stats'
                    ? 'border-[#893d2d] text-[#893d2d]'
                    : 'border-transparent text-[#717275] hover:text-[#201a18]'
                }`}
              >
                Key Metrics
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === 'schedule'
                    ? 'border-[#893d2d] text-[#893d2d]'
                    : 'border-transparent text-[#717275] hover:text-[#201a18]'
                }`}
              >
                Daily Rhythm
              </button>
              <button
                onClick={() => setActiveTab('needs')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === 'needs'
                    ? 'border-[#893d2d] text-[#893d2d]'
                    : 'border-transparent text-[#717275] hover:text-[#201a18]'
                }`}
              >
                Field Needs
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-1">
                          Community Profile
                        </span>
                        <p className="text-xs sm:text-sm text-[#59524e] leading-relaxed font-normal">
                          {currentCenter.longDescription}
                        </p>
                      </div>

                      <div className="p-3.5 bg-[#faf8f5] rounded-2xl border border-[#ebdcd0]">
                        <span className="text-[11px] font-bold text-[#201a18] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#893d2d]" />
                          <span>Who Is Served Here</span>
                        </span>
                        <p className="text-xs sm:text-sm text-[#59524e]">
                          {currentCenter.whoIsServed}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-[#201a18] uppercase tracking-wider block mb-2">
                          What Furaha Provides Directly
                        </span>
                        <ul className="space-y-1.5">
                          {currentCenter.whatFurahaProvides.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#59524e]">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* On-Site Facilities Chips */}
                      <div>
                        <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-1.5">
                          On-Site Facilities
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentCenter.facilities.map((fac, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-[#faf8f5] text-[#59524e] border border-[#ebdcd0] px-2.5 py-1 rounded-md"
                            >
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* External Map Link */}
                      <div className="pt-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${currentCenter.coordinates.lat},${currentCenter.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#893d2d] hover:underline"
                        >
                          <span>Open coordinates in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'stats' && (
                    <motion.div
                      key="stats"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider block mb-2">
                        Operational Impact Metrics
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {currentCenter.keyStats.map((stat, i) => (
                          <div
                            key={i}
                            className="bg-[#faf8f5] border border-[#ebdcd0] p-3.5 rounded-2xl"
                          >
                            <span className="text-2xl sm:text-3xl font-extrabold text-[#893d2d] block tracking-tight">
                              {stat.value}
                            </span>
                            <span className="text-xs font-bold text-[#201a18] block mt-0.5">
                              {stat.label}
                            </span>
                            <span className="text-[11px] text-[#717275] block mt-0.5">
                              {stat.sublabel}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Director / Teacher Field Quote */}
                      <div className="p-4 bg-[#893d2d]/5 border-l-4 border-[#893d2d] rounded-r-2xl mt-4">
                        <p className="text-xs sm:text-sm italic text-[#201a18] leading-relaxed mb-2">
                          &ldquo;{currentCenter.quote.text}&rdquo;
                        </p>
                        <div className="text-xs">
                          <span className="font-bold text-[#893d2d] block">{currentCenter.quote.author}</span>
                          <span className="text-[11px] text-[#717275]">{currentCenter.quote.role}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'schedule' && (
                    <motion.div
                      key="schedule"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-[#717275] uppercase tracking-wider">
                          A Typical Day on the Ground
                        </span>
                        <span className="text-[11px] text-[#893d2d] font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>East Africa Time (EAT)</span>
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {currentCenter.dailySchedule.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#ebdcd0]/70"
                          >
                            <span className="text-xs font-mono font-bold text-[#893d2d] bg-white px-2 py-0.5 rounded border border-[#ebdcd0] shrink-0">
                              {item.time}
                            </span>
                            <span className="text-xs sm:text-sm text-[#201a18]">
                              {item.activity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'needs' && (
                    <motion.div
                      key="needs"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-[#893d2d] uppercase tracking-wider block mb-1">
                          Current Field Requests
                        </span>
                        <p className="text-xs text-[#717275] mb-3">
                          These are concrete, verified items requested by on-site teachers and caregivers to sustain daily operations.
                        </p>

                        <div className="space-y-2.5">
                          {currentCenter.urgentNeeds.map((need, i) => (
                            <div
                              key={i}
                              className="p-3 bg-[#faf8f5] rounded-xl border border-[#ebdcd0] flex items-start gap-2.5"
                            >
                              <Sparkles className="w-4 h-4 text-[#893d2d] shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-[#201a18] font-medium">
                                {need}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                        <strong>100% Transparency:</strong> When you designate a donation for {currentCenter.name}, funds go directly to local schools, grain suppliers, and caregivers in Kenya.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons: Support This Center + Cycle Next */}
              <div className="pt-5 mt-5 border-t border-[#ebdcd0] flex flex-wrap items-center justify-between gap-3">
                {onSupportCenter && (
                  <button
                    onClick={() => onSupportCenter(currentCenter.donationCause)}
                    className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Support {currentCenter.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-1.5 ms-auto">
                  <button
                    onClick={() => handleCycleCenter('prev')}
                    className="px-2.5 py-1.5 rounded-lg border border-[#ebdcd0] text-xs font-semibold text-[#59524e] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                    title="Previous operating center"
                  >
                    &larr; Prev
                  </button>
                  <button
                    onClick={() => handleCycleCenter('next')}
                    className="px-2.5 py-1.5 rounded-lg border border-[#ebdcd0] text-xs font-semibold text-[#59524e] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                    title="Next operating center"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
