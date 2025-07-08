import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import avatar5 from '../assets/avatars/avatar5.png';
import avatar6 from '../assets/avatars/avatar6.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setNickname(data.nickname || '');
        setSelectedAvatar(data.profilePic || '');
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser]);

  const handleSave = async () => {
    const ref = doc(db, 'users', currentUser.uid);
    await setDoc(ref, { nickname, profilePic: selectedAvatar }, { merge: true });

    toast.success('Profile updated!', {
      duration: 2000,
    });
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="bg-green-100 p-6 rounded shadow max-w-xl mx-auto space-y-4">
      <Toaster position="top-center" /> {/* Toast anchor */}

      <h2 className="text-xl font-bold mb-2">👤 Profile Settings</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`avatar-${i}`}
            className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
              selectedAvatar === src ? 'border-green-600' : 'border-transparent'
            }`}
            onClick={() => setSelectedAvatar(src)}
          />
        ))}
      </div>

      <input
        className="w-full p-2 border rounded"
        placeholder="Enter nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <button
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Dashboard;
