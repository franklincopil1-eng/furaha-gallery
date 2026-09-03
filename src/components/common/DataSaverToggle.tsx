import React, { useState } from 'react';
import { Gauge, Zap, ChevronDown, Check, Wifi, AlertCircle } from 'lucide-react';
import { usePerformance, DataSaverPreference } from '../../context/PerformanceContext';

export const DataSaverToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { dataSaverMode, setDataSaverMode, isLiteMode, isLowBandwidth, connectionType } = usePerformance();
  const [open, setOpen] = useState(false);

  const options: { mode: DataSaverPreference; label: string; desc: string }[] = [
    {
      mode: 'auto',
      label: 'Auto (Recommended)',
      desc: isLowBandwidth
        ? `Active: detected ${connectionType.toUpperCase()} connection`
        : 'Activates automatically on slow 2G/3G data or low-power devices',
    },
    {
      mode: 'on',
      label: 'Data Saver On',
      desc: 'Optimizes images, disables heavy blur, and pauses autoplay to save mobile data & battery',
    },
    {
      mode: 'off',
      label: 'Data Saver Off',
      desc: 'Full animations and cinematic effects enabled',
    },
  ];

  if (compact) {
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          id="data-saver-compact-btn"
          aria-label="Toggle Data Saver Mode"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
            isLiteMode
              ? 'bg-[#893d2d] text-white shadow-sm'
              : 'bg-white/15 hover:bg-white/25 text-white'
          }`}
          title="Data & Battery Saver Settings"
        >
          {isLiteMode ? <Zap className="w-3.5 h-3.5 text-[#f7e4b7] animate-pulse" /> : <Gauge className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {dataSaverMode === 'on' ? 'Data Saver: ON' : isLiteMode ? 'Lite Mode' : 'Data Saver'}
          </span>
          <ChevronDown className="w-3 h-3 opacity-75" />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-[#e9eaeb] p-2 z-50 text-[#2e2e2e]">
              <div className="px-3 py-2 border-b border-[#f0f0f0] mb-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#201a18] flex items-center gap-1.5 uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-[#893d2d]" />
                    Data & Speed Saver
                  </span>
                  {isLowBandwidth && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" />
                      Slow {connectionType.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#717275] mt-1 leading-snug">
                  Designed to keep Furaha fast and lightweight on budget phones and rural mobile networks in Kenya & worldwide.
                </p>
              </div>

              <div className="space-y-1">
                {options.map((opt) => (
                  <button
                    key={opt.mode}
                    onClick={() => {
                      setDataSaverMode(opt.mode);
                      setOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between cursor-pointer ${
                      dataSaverMode === opt.mode
                        ? 'bg-[#893d2d]/10 text-[#893d2d] font-semibold'
                        : 'hover:bg-[#faf8f5] text-[#4a4a4a]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-medium">
                        {opt.label}
                      </div>
                      <p className="text-[10px] text-[#717275] font-normal mt-0.5 leading-snug">
                        {opt.desc}
                      </p>
                    </div>
                    {dataSaverMode === opt.mode && <Check className="w-4 h-4 text-[#893d2d] shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] border border-[#e9eaeb] rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#893d2d]/10 flex items-center justify-center text-[#893d2d]">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#201a18]">Low Bandwidth & Battery Optimization</h4>
            <p className="text-xs text-[#717275]">
              {isLiteMode
                ? 'Lite mode active: optimized for lower mobile data and smooth performance.'
                : 'Standard mode active: high-fidelity visuals enabled.'}
            </p>
          </div>
        </div>
        {isLowBandwidth && (
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Slow Connection Detected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
        {options.map((opt) => (
          <button
            key={opt.mode}
            onClick={() => setDataSaverMode(opt.mode)}
            className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
              dataSaverMode === opt.mode
                ? 'border-[#893d2d] bg-[#893d2d]/5 text-[#893d2d] font-semibold ring-1 ring-[#893d2d]'
                : 'border-[#e9eaeb] bg-white hover:border-[#893d2d]/40 text-[#4a4a4a]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span>{opt.label}</span>
              {dataSaverMode === opt.mode && <Check className="w-3.5 h-3.5 text-[#893d2d]" />}
            </div>
            <p className="text-[11px] text-[#717275] font-normal leading-snug">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
