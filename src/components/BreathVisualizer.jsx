import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import SignUpLoginForm from './SignUpLoginForm';
import useBreathSettings from './useBreathSettings';
import SettingsUI from './SettingsUI';

const BreathVisualizer = () => {
  const initialSettings = { inhale: 4, hold: 7, exhale: 8, holdAfterExhale: 5 };
  const { settings, phase, timeLeft, isPaused, updateSettings, togglePausePlay } = useBreathSettings(initialSettings);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scale, setScale] = useState(1);
  const [isSULFormVisible, setIsSULFormVisible] = useState(false); // State for SignUp/Login Form visibility
  const requestRef = useRef();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const saveSettings = () => {
    console.log('Settings saved:', settings);
    setIsSettingsVisible(false);
  };

  const calculateScale = () => {
    const inhaleScale = 1 + 0.45; 
    const exhaleScale = 1 - 0.15; 

    if (phase === 'inhale') {
      return 1 + 0.45 * (1 - timeLeft / initialSettings.inhale); 
    }
    if (phase === 'hold') {
      return inhaleScale; 
    }
    if (phase === 'exhale') {
      return inhaleScale - (inhaleScale - exhaleScale) * (1 - timeLeft / initialSettings.exhale); 
    }
    if (phase === 'holdAfterExhale') {
      return exhaleScale; 
    }
    return scale; 
  };

  const animate = () => {
    const newScale = calculateScale();
    setScale(newScale);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [phase, timeLeft]);

  const scaleStyle = {
    transform: `scale(${scale})`,
  };

  return (
    <div className='transition-background duration-500 relative flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900'>
      <SettingsUI 
        settings={settings} 
        updateSettings={updateSettings} 
        isVisible={isSettingsVisible} 
        setIsVisible={setIsSettingsVisible} 
        saveSettings={saveSettings}
      />
      {isSULFormVisible && (
        <SignUpLoginForm isVisible={isSULFormVisible} setIsVisible={setIsSULFormVisible} />
      )}
      <div className='absolute top-4 right-4 flex items-center space-x-4'>
        <button onClick={() => setIsSULFormVisible(true)} className='text-1xl cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-125'>
          <AccountCircle /> Login
        </button>
      </div>
      <div
        className={`flex flex-col items-center justify-center rounded-full mt-8 transition-all duration-500 ease-in-out ${phase === 'inhale' ? 'w-96 h-96' : phase === 'exhale' ? 'w-72 h-72' : 'w-80 h-80'} bg-blue-200 dark:bg-blue-800 mb-12`} // Added margin-bottom to avoid overlap
        style={{ ...scaleStyle, boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', border: 'none' }}
      >
        <div className='text-lg font-semibold uppercase text-gray-800 dark:text-gray-200'>{phase === 'holdAfterExhale' || phase === 'hold' ? 'hold' : phase}</div>
        <div className='text-5xl text-gray-800 dark:text-gray-200'>{Math.round(timeLeft)}s</div>
      </div>
      <div className='flex mt-10 space-x-4 items-center'>
        {isPaused ? (
          <FaPlay
            className='text-4xl cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-125'
            onClick={togglePausePlay}
          />
        ) : (
          <FaPause
            className='text-4xl cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-125'
            onClick={togglePausePlay}
          />
        )}
        <MdSettings
          className='text-4xl cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-125'
          onClick={() => setIsSettingsVisible(true)}
        />
        <button
          onClick={toggleDarkMode}
          className='flex items-center justify-center text-4xl cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-125'
        >
          {darkMode ? <Brightness7 fontSize="inherit" /> : <Brightness4 fontSize="inherit" />}
        </button>
      </div>
    </div>
  );
};

export default BreathVisualizer;
