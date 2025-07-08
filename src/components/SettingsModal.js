
import React from 'react';

const SettingsModal = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4">
        <h2 className="text-lg font-bold text-center">🌼 Options</h2>
        <button
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => onSelect('app')}
        >
          🏠 Dashboard
        </button>
        <button
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => onSelect('profile')}
        >
          👤 Profile Settings
        </button>
        <button
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => onSelect('weather')}
        >
          🌤 Weather (Full View)
        </button>
        <button
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => onSelect('split')}
        >
          🧾 Bill Splitter (Full View)
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
