import React from 'react';

const SettingsUI = ({ settings, updateSettings, isVisible, setIsVisible, saveSettings }) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    onClick={() => setIsVisible(false)}
  >
    <div
      className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col'>
        {Object.keys(settings).map((key) => (
          <div key={key} className='my-3'>
            <label className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
              {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
            </label>
            <input
              type='number'
              className='ml-2 p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200'
              value={settings[key]}
              onChange={(e) => updateSettings(key, parseInt(e.target.value, 10))}
              min='0'
            />
          </div>
        ))}
        <button
          className='mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

export default SettingsUI;
