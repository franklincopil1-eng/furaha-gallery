import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type DataSaverPreference = 'auto' | 'on' | 'off';

interface PerformanceContextType {
  dataSaverMode: DataSaverPreference;
  setDataSaverMode: (mode: DataSaverPreference) => void;
  isLiteMode: boolean;
  isLowBandwidth: boolean;
  isLowPowerDevice: boolean;
  connectionType: string;
  toggleDataSaver: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  dataSaverMode: 'auto',
  setDataSaverMode: () => {},
  isLiteMode: false,
  isLowBandwidth: false,
  isLowPowerDevice: false,
  connectionType: '4g',
  toggleDataSaver: () => {},
});

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataSaverMode, setDataSaverModeState] = useState<DataSaverPreference>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('furaha_data_saver');
      if (stored === 'on' || stored === 'off' || stored === 'auto') return stored;
    }
    return 'auto';
  });

  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string>('4g');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect device capabilities
    const checkDevice = () => {
      // Check CPU cores (hardwareConcurrency <= 4 indicates budget mobile / low power)
      const cores = navigator.hardwareConcurrency || 4;
      // Check RAM (deviceMemory <= 4 indicates lower memory)
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
      
      const lowPower = cores <= 4 || memory <= 4;
      setIsLowPowerDevice(lowPower);

      // Check Network connection API
      const conn = (navigator as unknown as {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
          addEventListener?: (type: string, listener: () => void) => void;
          removeEventListener?: (type: string, listener: () => void) => void;
        };
      }).connection;

      if (conn) {
        const updateNetworkInfo = () => {
          const effType = conn.effectiveType || '4g';
          setConnectionType(effType);
          const isSlow = conn.saveData === true || ['slow-2g', '2g', '3g'].includes(effType);
          setIsLowBandwidth(isSlow);
        };

        updateNetworkInfo();

        if (conn.addEventListener) {
          conn.addEventListener('change', updateNetworkInfo);
          return () => {
            if (conn.removeEventListener) {
              conn.removeEventListener('change', updateNetworkInfo);
            }
          };
        }
      }
    };

    const cleanup = checkDevice();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const isLiteMode = useMemo(() => {
    if (dataSaverMode === 'on') return true;
    if (dataSaverMode === 'off') return false;
    // 'auto' mode: activate if either low bandwidth or low power device is detected
    return isLowBandwidth || isLowPowerDevice;
  }, [dataSaverMode, isLowBandwidth, isLowPowerDevice]);

  // Sync class on documentElement for CSS styling
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isLiteMode) {
        document.documentElement.classList.add('lite-mode');
      } else {
        document.documentElement.classList.remove('lite-mode');
      }
    }
  }, [isLiteMode]);

  const setDataSaverMode = (mode: DataSaverPreference) => {
    setDataSaverModeState(mode);
    try {
      localStorage.setItem('furaha_data_saver', mode);
    } catch {
      // ignore localstorage errors
    }
  };

  const toggleDataSaver = () => {
    if (dataSaverMode === 'on') {
      setDataSaverMode('off');
    } else if (dataSaverMode === 'off') {
      setDataSaverMode('auto');
    } else {
      setDataSaverMode('on');
    }
  };

  return (
    <PerformanceContext.Provider
      value={{
        dataSaverMode,
        setDataSaverMode,
        isLiteMode,
        isLowBandwidth,
        isLowPowerDevice,
        connectionType,
        toggleDataSaver,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);
