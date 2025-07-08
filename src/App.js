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

import { useAuth } from './contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import { useDebouncedCallback } from './utils/useDebouncedCallback';

import Weather from './components/Weather';
import BillSplitter from './components/BillSplitter';
import MoneyTracker from './components/MoneyTracker';
import ProfileSettings from './components/ProfileSettings';
import SpinTheWheel from './components/SpinTheWheel';
import Login from './components/Login';
import ItineraryPage from './components/ItineraryPage';
import OweTracker from './components/OweTracker';


function App() {
  const { currentUser, loading } = useAuth();
  const [nickname, setNickname] = useState('');
  const [view, setView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('weather');
  
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

    updateTime(); // initial call
    const interval = setInterval(updateTime, 10000); // update every 10s

    return () => clearInterval(interval);
  }, []);


  const handleViewChange = useDebouncedCallback((viewName) => {
    setView(viewName);
  }, 300);

  useEffect(() => {
    const fetchNickname = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNickname(docSnap.data().nickname || '');
        }
      }
    };
    fetchNickname();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!currentUser) return <Login />;

  return (
    <div className="min-h-screen bg-[#EEF0FD] relative pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#64A36F] text-white px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">🌼 Baguio Trip 2025</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img
              src={
                currentUser?.photoURL ||
                require('./assets/avatars/avatar1.png') // adjust if using imports
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-5xl mx-auto space-y-6">
          {/* Personalized greeting */}
        <div className="mt-2 mb-2 px-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi {nickname || currentUser.email.split('@')[0]} 👋
          </h2>
          <p className="text-gray-600 font-semibold text-sm">{dateTime}</p>
          </div>
        {view === 'dashboard' && (
          <>
            {/* Top Icon Tab Navigation */}
            <div className="flex justify-around items-center bg-white shadow rounded-xl py-3 mb-4">
              <button onClick={() => setActiveTab('weather')} className={`text-center ${activeTab === 'weather' ? 'text-blue-600' : 'text-gray-400'}`}>
                <SunIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Weather</span>
              </button>
              <button onClick={() => setActiveTab('split')} className={`text-center ${activeTab === 'split' ? 'text-blue-600' : 'text-gray-400'}`}>
                <DocumentTextIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Splitter</span>
              </button>
              <button onClick={() => setActiveTab('money')} className={`text-center ${activeTab === 'money' ? 'text-blue-600' : 'text-gray-400'}`}>
                <CurrencyDollarIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Money</span>
              </button>
              <button onClick={() => setActiveTab('owe')} className={`text-center ${view === 'owe' ? 'text-blue-600' : 'text-gray-400'}`}>
                <CurrencyDollarIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Owe</span>
              </button>
              <button onClick={() => setActiveTab('wheel')} className={`text-center ${activeTab === 'wheel' ? 'text-blue-600' : 'text-gray-400'}`}>
                <SparklesIcon className="w-6 h-6 mx-auto" />
                <span className="text-xs">Spin</span>
              </button>
            </div>

            {/* Component View */}
            <div className="bg-white rounded-xl shadow p-5 animate-fade-in">
              {activeTab === 'weather' && (
                <>
                  <h2 className="text-lg font-bold mb-2">🌤 Weather Forecast</h2>
                  <Weather small />
                </>
              )}
              {activeTab === 'split' && (
                <>
                  <h2 className="text-lg font-bold mb-2">🧾 Bill Splitter</h2>
                  <BillSplitter small />
                </>
              )}
              {activeTab === 'money' && (
                <>
                  <h2 className="text-lg font-bold mb-2">💰 Money Tracker</h2>
                  <MoneyTracker small />
                </>
              )}
              {activeTab === 'owe' && (
                <>
                  <h2 className="text-lg font-bold mb-2">💸 Owe Tracker</h2>
                  <OweTracker small />
                  </>
                  )}
              {activeTab === 'wheel' && (
                <>
                  <h2 className="text-lg font-bold mb-2">🎯 Spin the Wheel</h2>
                  <SpinTheWheel small />
                </>
              )}
            </div>
          </>
        )}

        {view === 'profile' && <ProfileSettings />}
        {view === 'weather' && <Weather />}
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
        <button onClick={() => handleViewChange('profile')} className={`flex flex-col items-center text-sm ${view === 'profile' ? 'text-purple-600' : 'text-gray-500'}`}>
          <UserCircleIcon className="w-6 h-6" />
          Profile
        </button>
        <button onClick={() => handleViewChange('itinerary')} className={`flex flex-col items-center text-sm ${view === 'itinerary' ? 'text-purple-600' : 'text-gray-500'}`}>
          <PlusIcon className="w-6 h-6" />
          Itinerary
        </button>
      </nav>
    </div>
  );
}

export default App;
