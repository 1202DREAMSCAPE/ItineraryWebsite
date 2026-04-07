import React, { useEffect, useState } from 'react';
import {
  PlusIcon,
  UserCircleIcon,
  HomeIcon,
  SunIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

import { useDebouncedCallback } from './utils/useDebouncedCallback';
import { injectLavaLampBackground } from './utils/lavaLampBackground';

import BillSplitter from './components/BillSplitter';
import SpinTheWheel from './components/SpinTheWheel';
import ItineraryPage from './components/ItineraryPage';
import OweTracker from './components/OweTracker';

function App() {
  const [nickname] = useState('Friend');
  const [view, setView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('split');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      setDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleViewChange = useDebouncedCallback((viewName) => {
    setView(viewName);
  }, 300);

  useEffect(() => {
    injectLavaLampBackground();
  }, []);

  return (
    <div className="min-h-screen relative pb-24 lava-lamp-bg">
      {/* Lava blobs */}
      <div className="lava-blob blob-1 z-0"></div>
      <div className="lava-blob blob-2 z-0"></div>
      <div className="lava-blob blob-3 z-0"></div>
      <div className="lava-blob blob-4 z-0"></div>
      <div className="lava-blob blob-5 z-0"></div>
      <div className="lava-blob blob-6 z-0"></div>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#64A36F] text-white px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">🌼 Baguio Trip 2025</h1>
        </div>
      </header>

      <div className="relative z-10">
      {/* Main Content */}
      <main className="p-4 max-w-5xl mx-auto space-y-6">
        <div className="mt-2 mb-2 px-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi {nickname} 👋
          </h2>
          <p className="text-gray-600 font-semibold text-sm">{dateTime}</p>
        </div>

        {view === 'dashboard' && (
          <>
            <div className="flex justify-around items-center bg-white shadow rounded-xl py-3 mb-4">
              <button onClick={() => setActiveTab('split')} className={`text-center ${activeTab === 'split' ? 'text-blue-600' : 'text-gray-400'}`}>
                <DocumentTextIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Split</span>
              </button>
              <button onClick={() => setActiveTab('owe')} className={`text-center ${activeTab === 'owe' ? 'text-blue-600' : 'text-gray-400'}`}>
                <CurrencyDollarIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Owe</span>
              </button>
              <button onClick={() => setActiveTab('wheel')} className={`text-center ${activeTab === 'wheel' ? 'text-blue-600' : 'text-gray-400'}`}>
                <SparklesIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Spin</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow p-5 animate-fade-in">
              {activeTab === 'split' && (
                <>
                  {/* <h2 className="text-lg font-bold mb-2">🧾 Bill Splitter</h2> */}
                  <BillSplitter small />
                </>
              )}
              {activeTab === 'owe' && (
                <>
                  {/* <h2 className="text-lg font-bold mb-2">💸 Owe Tracker</h2> */}
                  <OweTracker small />
                </>
              )}
              {activeTab === 'wheel' && (
                <>
                  {/* <h2 className="text-lg font-bold mb-2">🎯 Spin the Wheel</h2> */}
                  <SpinTheWheel small />
                </>
              )}
            </div>
          </>
        )}

        {view === 'split' && <BillSplitter />}
        {view === 'itinerary' && <ItineraryPage />}
        {view === 'owe' && <OweTracker />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around py-3">
        <button onClick={() => handleViewChange('dashboard')} className={`flex flex-col items-center text-sm ${view === 'dashboard' ? 'text-purple-600' : 'text-gray-500'}`}>
          <HomeIcon className="w-6 h-6" />
          Home
        </button>
        <button onClick={() => handleViewChange('itinerary')} className={`flex flex-col items-center text-sm ${view === 'itinerary' ? 'text-purple-600' : 'text-gray-500'}`}>
          <PlusIcon className="w-6 h-6" />
          Itinerary
        </button>
      </nav>
    </div>
    </div>
  );
}

export default App;
