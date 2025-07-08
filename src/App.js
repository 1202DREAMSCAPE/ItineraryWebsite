import React, { useEffect, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

import { useAuth } from './contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './firebase';

import Weather from './components/Weather';
import Itinerary from './components/Itinerary';
import BillSplitter from './components/BillSplitter';
import MoneyTracker from './components/MoneyTracker';
import ProfileSettings from './components/ProfileSettings';
import SpinTheWheel from './components/SpinTheWheel';
import Login from './components/Login';

function App() {
  const { currentUser, loading } = useAuth();
  const [nickname, setNickname] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [view, setView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNickname(data.nickname || '');
          setProfilePic(data.profilePic || '');
        }
      }
    };
    fetchUserData();
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
    <div>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#64A36F] text-white shadow">
        <div className="flex items-center space-x-4">
          <img
            src={profilePic || `https://ui-avatars.com/api/?name=${nickname || 'User'}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold">🌼 Baguio Trip</h1>
            <p className="text-sm">Welcome, {nickname || currentUser.email}!</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-white/20 p-2 rounded-full"
          >
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => signOut(auth)}
            className="bg-white text-[#64A36F] px-3 py-1 rounded font-semibold hover:bg-yellow-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Modal Menu */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold text-center">🌟 Menu</h2>
            <button onClick={() => { setView('dashboard'); setIsModalOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">🏠 Dashboard</button>
            <button onClick={() => { setView('profile'); setIsModalOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">👤 Profile Settings</button>
            <button onClick={() => { setView('weather'); setIsModalOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">🌤 Weather</button>
            <button onClick={() => { setView('split'); setIsModalOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">🧾 Bill Splitter</button>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Close</button>
          </div>
        </div>
      )}

      {/* Main layout based on selected view */}
      <main className="p-6 max-w-5xl mx-auto space-y-4">
        {view === 'dashboard' && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Weather small />
            <Itinerary small />
            <BillSplitter small />
            <MoneyTracker small />
            <SpinTheWheel small />
          </div>
        )}
        {view === 'profile' && <ProfileSettings />}
        {view === 'weather' && <Weather />}
        {view === 'split' && <BillSplitter />}
      </main>
    </div>
  );
}

export default App;
