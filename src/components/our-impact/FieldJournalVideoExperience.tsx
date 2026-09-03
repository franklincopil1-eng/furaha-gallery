import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Film,
  Image as ImageIcon
} from 'lucide-react';

const videoPosterFrame = '/images/DSCF0817.jpg';
const videoOldLatrines = '/images/video_frame_old_bathrooms.jpg';
const videoNeed = '/images/video_frame_need.jpg';
const videoMaterials = '/images/video_frame_materials.jpg';
const videoConstruction = '/images/video_frame_construction.jpg';
const videoCarpentry = '/images/video_frame_carpentry.jpg';
const videoNewBathrooms = '/images/video_frame_new_bathrooms.jpg';

interface Chapter {
  time: number;
  label: string;
  phase: string;
  description: string;
  image: string;
}

const CHAPTERS: Chapter[] = [
  {
    time: 0,
    label: 'Old Bathrooms',
    phase: '00:00',
    description: 'Makeshift pit latrines with rusted corrugated iron and exposed drainage.',
    image: videoOldLatrines,
  },
  {
    time: 3,
    label: 'The Need',
    phase: '00:03',
    description: 'Handwritten "Girls Toilet Please" on iron sheets showing urgent hygiene need.',
    image: videoNeed,
  },
  {
    time: 5,
    label: 'Materials Arrive',
    phase: '00:05',
    description: 'Ceramic toilet fixtures, PVC piping, and timber lumber delivered to site.',
    image: videoMaterials,
  },
  {
    time: 7,
    label: 'Construction Begins',
    phase: '00:07',
    description: 'Local stonemasons laying foundation stone blockwork and concrete lintels.',
    image: videoConstruction,
  },
  {
    time: 9.5,
    label: 'Carpentry & Doors',
    phase: '00:09',
    description: 'Carpenters assembling solid wooden doors and roof framing for privacy.',
    image: videoCarpentry,
  },
  {
    time: 12,
    label: 'New Bathrooms',
    phase: '00:12',
    description: 'Permanent plastered stone washrooms with secure doors and clean drainage.',
    image: videoNewBathrooms,
  },
  {
    time: 14.5,
    label: 'Completed Facility',
    phase: '00:14',
    description: 'Permanent hygienic washrooms operating daily with clean water access.',
    image: videoNewBathrooms,
  },
];

// Direct uploaded video file sources
const LOCAL_VIDEO_SOURCES = [
  '/westhill_sanitation.mp4',
  '/amani-sanitation.mp4',
  '/video.mp4',
  'westhill1 (5).mp4',
];
const POSTER_FRAME = videoPosterFrame;

export const FieldJournalVideoExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(17);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [manualConvergence, setManualConvergence] = useState(false);

  // Scroll-driven composition pipeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  // Smooth scroll interpolation transforms for desktop multi-window convergence
  // Window 1: Top-Left Detail (Masonry & Foundation)
  const win1X = useTransform(scrollYProgress, [0.1, 0.55], ['-24px', '0px']);
  const win1Y = useTransform(scrollYProgress, [0.1, 0.55], ['-18px', '0px']);
  const win1Scale = useTransform(scrollYProgress, [0.1, 0.55], [0.96, 1.0]);

  // Window 2: Top-Right Detail (Walls & Framing)
  const win2X = useTransform(scrollYProgress, [0.1, 0.55], ['24px', '0px']);
  const win2Y = useTransform(scrollYProgress, [0.1, 0.55], ['-12px', '0px']);
  const win2Scale = useTransform(scrollYProgress, [0.1, 0.55], [0.96, 1.0]);

  // Window 3: Bottom-Center Context (Grounds & Sanitation)
  const win3Y = useTransform(scrollYProgress, [0.1, 0.55], ['20px', '0px']);
  const win3Scale = useTransform(scrollYProgress, [0.1, 0.55], [0.97, 1.0]);

  // Convergence factor (0 = fragmented, 1 = fully unified master theater)
  const convergenceProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const [isScrolledConverged, setIsScrolledConverged] = useState(false);

  useEffect(() => {
    const unsubscribe = convergenceProgress.on('change', (latest) => {
      setIsScrolledConverged(latest >= 0.85);
    });
    return () => unsubscribe();
  }, [convergenceProgress]);

  const isConverged = isScrolledConverged || manualConvergence || shouldReduceMotion;

  // Video event handlers
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true);
        setIsEnded(false);
        setManualConvergence(true);
      }).catch(() => {
        // Fallback for browsers that block play
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);

    // Update active chapter
    const current = video.currentTime;
    let foundIndex = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (current >= CHAPTERS[i].time) {
        foundIndex = i;
        break;
      }
    }
    setActiveChapterIndex(foundIndex);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 60);
      setIsVideoLoaded(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const jumpToChapter = (chapterTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = chapterTime;
    setCurrentTime(chapterTime);
    setManualConvergence(true);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => {
      setIsPlaying(true);
      setIsEnded(false);
    }).catch(() => {});
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="field-journal-video"
      ref={containerRef}
      data-journey-id="field-journal-video"
      data-journey-role="field-evidence"
      data-journey-entry="top-left"
      data-journey-exit="bottom-center"
      className="py-14 sm:py-20 lg:py-24 bg-[#1e1715] text-[#f7f5f2] relative overflow-hidden border-y border-[#382d29]"
    >
      {/* Background Subtle Linen Grain & Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#3a251e]/40 via-[#1e1715] to-[#140f0e] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#893d2d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#ef802e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#893d2d]/30 text-[#f7e4b7] text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#893d2d]/50">
              <Film className="w-3 h-3 text-[#ef802e]" />
              <span>Real Field Documentary</span>
            </span>
            <span className="text-[#a89e98] text-xs font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#893d2d]" />
              <span>Amani School & Children’s Community · Kenya</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            The Sanitation Project: From Groundwork to Clean Water
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#cfc8c2] font-light leading-relaxed">
            Authentic field footage capturing the construction of permanent, dignified sanitation and wash facilities. Watch the progression from rusted makeshift latrines to new stone washrooms and grateful students.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CINEMATIC THEATER CONTAINER (ONE MASTER VIDEO, SPLIT CROP WINDOWS) */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-[#140f0e] border border-[#3d322e] p-3 sm:p-5 lg:p-6 shadow-2xl overflow-hidden">
          
          {/* Master Video Element (Hidden in DOM for audio/time syncing, displayed via primary & crop viewports) */}
          <video
            ref={videoRef}
            poster={POSTER_FRAME}
            playsInline
            muted={isMuted}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            className="sr-only"
            aria-label="Documentary field footage of toilet and sanitation facility construction in Kenya"
          >
            {LOCAL_VIDEO_SOURCES.map((src, i) => (
              <source key={i} src={src} type="video/mp4" />
            ))}
          </video>

          {/* DESKTOP FRAGMENTED MULTI-WINDOW STATE (When not yet converged & motion enabled) */}
          {!isConverged && (
            <div className="hidden lg:grid grid-cols-12 gap-4 aspect-[16/9] w-full relative">
              
              {/* Window 1: Top-Left (Close Detail: Old Bathrooms & Need) */}
              <motion.div
                style={{
                  x: win1X,
                  y: win1Y,
                  scale: win1Scale,
                }}
                onClick={() => {
                  setManualConvergence(true);
                  togglePlay();
                }}
                className="col-span-7 row-span-1 relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg cursor-pointer group"
              >
                {/* Viewport into Old Bathrooms */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={videoOldLatrines}
                    alt="Old makeshift pit latrine with rusted corrugated iron"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                  {/* Window Editorial Tag */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-mono tracking-wider flex items-center gap-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef802e] animate-pulse" />
                    <span>01 · OLD BATHROOMS (THE NEED)</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                    <span className="text-[11px] font-medium bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                      Rusted iron latrines ("Girls Toilet Please")
                    </span>
                    <span className="text-[10px] text-[#f7e4b7] flex items-center gap-1 bg-[#893d2d]/80 px-2 py-0.5 rounded">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Click to Play Film</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Window 2: Top-Right (Structural Wall & Door Carpentry) */}
              <motion.div
                style={{
                  x: win2X,
                  y: win2Y,
                  scale: win2Scale,
                }}
                onClick={() => {
                  setManualConvergence(true);
                  togglePlay();
                }}
                className="col-span-5 row-span-1 relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg cursor-pointer group"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={videoConstruction}
                    alt="Stonemasons building stone block walls and fitting timber doors"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-mono tracking-wider flex items-center gap-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef802e]" />
                    <span>02 · MASONRY & CARPENTRY</span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    Reinforced stone walls & timber doors
                  </div>
                </div>
              </motion.div>

              {/* Window 3: Bottom-Center (Completed Facility) */}
              <motion.div
                style={{
                  y: win33YTransform(win3Y),
                  scale: win3Scale,
                }}
                onClick={() => {
                  setManualConvergence(true);
                  togglePlay();
                }}
                className="col-span-12 relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg cursor-pointer group max-h-[180px]"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={videoNewBathrooms}
                    alt="Completed new sanitation washroom block"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-mono tracking-wider flex items-center gap-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#893d2d]" />
                    <span>03 · COMPLETED SANITATION FACILITY</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs text-white font-semibold">
                      Scroll or click to converge windows into the unified documentary film
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#f7e4b7] bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                      <Layers className="w-3.5 h-3.5 text-[#ef802e]" />
                      <span>Converging 3 Perspectives</span>
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          )}

          {/* UNIFIED FULL CINEMATIC SCREEN (Active on convergence, mobile, or play) */}
          <div className={`${!isConverged ? 'lg:hidden' : 'block'} relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-inner`}>
            
            {/* Primary Interactive Video Viewport */}
            <div className="relative w-full h-full">
              
              {/* Fallback image / Poster if paused (shows active chapter frame) */}
              {!isPlaying && !isEnded && (
                <img
                  src={CHAPTERS[activeChapterIndex]?.image || POSTER_FRAME}
                  alt={CHAPTERS[activeChapterIndex]?.label || "Amani construction documentary footage"}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Render canvas/playback surface */}
              {isPlaying && (
                <video
                  playsInline
                  autoPlay
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                >
                  {LOCAL_VIDEO_SOURCES.map((src, i) => (
                    <source key={i} src={src} type="video/mp4" />
                  ))}
                </video>
              )}

              {/* Initial Overlay / Play Invite */}
              {!isPlaying && !isEnded && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors flex flex-col items-center justify-center cursor-pointer p-4 text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#893d2d] hover:bg-[#733123] text-white flex items-center justify-center shadow-2xl border border-white/20 transition-transform mb-4"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </motion.div>
                  
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide block mb-1">
                    Watch the Field Documentary Film
                  </span>
                  <span className="text-xs sm:text-sm text-[#e0deda] font-light max-w-md">
                    Uncut record of the school sanitation and wash facility construction.
                  </span>
                </div>
              )}

              {/* End State Replay Screen */}
              {isEnded && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-12 h-12 rounded-full bg-[#893d2d]/30 text-[#f7e4b7] border border-[#893d2d] flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                    Field Record Complete
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cfc8c2] max-w-md mb-5 font-light leading-relaxed">
                    Real sanitation infrastructure work completed in Kenya, safeguarding the health and dignity of children and teachers.
                  </p>
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 bg-[#893d2d] hover:bg-[#733123] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Watch Again</span>
                  </button>
                </div>
              )}

              {/* In-Video Active Chapter Watermark */}
              {isPlaying && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white flex items-center gap-2 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#ef802e] animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wider font-semibold">
                    PHASE {activeChapterIndex + 1}: {CHAPTERS[activeChapterIndex]?.label.toUpperCase()}
                  </span>
                </div>
              )}

            </div>

            {/* Cinematic Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 z-20 flex flex-col gap-2">
              
              {/* Micro Timeline Progress Line */}
              <div className="relative w-full h-2 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer overflow-hidden transition-all group">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-[#ef802e] transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Chapter Notch Indicators */}
                {CHAPTERS.map((ch, idx) => (
                  <div
                    key={idx}
                    className="absolute top-0 bottom-0 w-0.5 bg-white/60 z-10 pointer-events-none"
                    style={{ left: `${(ch.time / duration) * 100}%` }}
                    title={ch.label}
                  />
                ))}
              </div>

              {/* Lower Control Actions */}
              <div className="flex items-center justify-between text-white text-xs">
                
                {/* Left: Play/Pause & Time */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div className="font-mono text-[11px] text-[#e0deda] flex items-center gap-1">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/60">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Center: Current Chapter Description (Hidden on smallest screens) */}
                <div className="hidden md:flex items-center gap-1.5 text-xs text-[#f7e4b7] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#ef802e]" />
                  <span>{CHAPTERS[activeChapterIndex]?.description}</span>
                </div>

                {/* Right: Sound & Fullscreen */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-[#ef802e]" />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 7 EDITORIAL CHAPTER SELECTORS WITH DIRECT AUTHENTIC VIDEO FRAME THUMBNAILS */}
          {/* ========================================================================= */}
          <div className="mt-4 sm:mt-6 pt-4 border-t border-[#3d322e]/80">
            <div className="text-[11px] uppercase tracking-widest text-[#a89e98] font-bold mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#ef802e]" />
                <span>Documentary Field Phases (Extracted from Video)</span>
              </span>
              <span className="text-[#f7e4b7] font-mono lowercase">00:17 uncut record</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
              {CHAPTERS.map((chapter, index) => {
                const isActive = activeChapterIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => jumpToChapter(chapter.time)}
                    className={`p-2 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between group overflow-hidden ${
                      isActive
                        ? 'bg-[#893d2d]/30 border-[#ef802e]/80 text-white shadow-md ring-1 ring-[#ef802e]/40'
                        : 'bg-[#181210] border-[#382d29] text-[#b8b0a9] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {/* Chapter Visual Thumbnail */}
                    <div className="relative w-full h-16 sm:h-20 rounded-lg overflow-hidden mb-1.5 bg-black/40">
                      <img 
                        src={chapter.image} 
                        alt={chapter.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-[#ef802e] font-bold bg-black/70 px-1 py-0.5 rounded">
                          {chapter.phase}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#ef802e] animate-ping" />
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] sm:text-xs font-bold text-white mb-0.5 truncate">
                      {chapter.label}
                    </div>

                    <p className="text-[10px] text-[#cfc8c2] leading-tight line-clamp-2 font-light">
                      {chapter.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// Helper for third window Y offset calculation
function win33YTransform(win3Y: any) {
  return win3Y;
}
