import { useState, useEffect, useCallback, useRef } from 'react';

const useBreathSettings = (initialSettings) => {
  const [settings, setSettings] = useState(initialSettings);
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(initialSettings.inhale);
  const [isPaused, setIsPaused] = useState(false);
  const startTime = useRef(performance.now());
  const elapsedPausedTime = useRef(0);

  const updateSettings = useCallback((key, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
    if (phase === key) {
      setTimeLeft(value);
    }
  }, [phase]);

  useEffect(() => {
    const handleTick = () => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          let nextPhase;

          switch (phase) {
            case 'inhale':
              nextPhase = settings.hold === 0 ? 'exhale' : 'hold';
              break;
            case 'hold':
              nextPhase = settings.exhale === 0 ? 'holdAfterExhale' : 'exhale';
              break;
            case 'exhale':
              nextPhase = settings.holdAfterExhale === 0 ? 'inhale' : 'holdAfterExhale';
              break;
            case 'holdAfterExhale':
              nextPhase = settings.inhale === 0 ? 'exhale' : 'inhale';
              break;
            default:
              nextPhase = 'inhale';
          }

          while (settings[nextPhase] === 0) {
            switch (nextPhase) {
              case 'inhale':
                nextPhase = settings.hold === 0 ? 'exhale' : 'hold';
                break;
              case 'hold':
                nextPhase = settings.exhale === 0 ? 'holdAfterExhale' : 'exhale';
                break;
              case 'exhale':
                nextPhase = settings.holdAfterExhale === 0 ? 'inhale' : 'holdAfterExhale';
                break;
              case 'holdAfterExhale':
                nextPhase = settings.inhale === 0 ? 'exhale' : 'inhale';
                break;
              default:
                nextPhase = 'inhale';
            }
          }

          setPhase(nextPhase);
          startTime.current = performance.now();
          elapsedPausedTime.current = 0;
          return settings[nextPhase];
        }
        return prevTime - 0.05;
      });
    };

    if (!isPaused) {
      const interval = setInterval(handleTick, 50);
      return () => clearInterval(interval);
    }
  }, [phase, settings, isPaused]);

  const togglePausePlay = () => {
    if (isPaused) {
      startTime.current = performance.now() - elapsedPausedTime.current * 1000;
    } else {
      elapsedPausedTime.current += (performance.now() - startTime.current) / 1000;
    }
    setIsPaused(!isPaused);
  };

  return {
    settings,
    phase,
    timeLeft,
    isPaused,
    updateSettings,
    setPhase,
    setTimeLeft,
    togglePausePlay,
  };
};

export default useBreathSettings;
