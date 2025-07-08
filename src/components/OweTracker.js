import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

export default function OweTracker({ small }) {
  const { currentUser } = useAuth();
  const [type, setType] = useState('I owe');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [friends, setFriends] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const oweRef = collection(db, 'oweTracker');

  useEffect(() => {
    if (!currentUser) return;

    const q = query(oweRef, where('userId', '==', currentUser.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });

    return () => unsub();
  }, [currentUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const names = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().nickname || doc.data().name || '',
      }));
      setFriends(names);
    };
    fetchFriends();
  }, []);

  const handleAdd = async () => {
    if (!name || !amount || isNaN(amount)) return;

    const entry = {
      userId: currentUser.uid,
      type,
      name,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    await addDoc(oweRef, entry);

    const matchedFriend = friends.find(
      (f) => f.name.toLowerCase() === name.toLowerCase()
    );

    if (matchedFriend) {
      const reversedType = type === 'I owe' ? 'owes me' : 'I owe';
      const reversedEntry = {
        userId: matchedFriend.id,
        type: reversedType,
        name: currentUser.displayName || 'Someone',
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      };
      await addDoc(oweRef, reversedEntry);
    }

    setName('');
    setAmount('');
    setSuggestions([]);

    toast.success('Owe log added successfully!', {
      duration: 2000,
    });
  };

  const formatAmount = (value) => {
    return value.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className={`${small ? '' : 'max-w-md mx-auto'} relative`}>
      <Toaster position="top-center" /> {/* Toast anchor */}

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
        {/* Checkbox toggle */}
        <div className="flex items-center gap-2 sm:col-span-1">
          <label className="flex items-center text-sm gap-1">
            <input
              type="checkbox"
              checked={type === 'I owe'}
              onChange={() => setType('I owe')}
            />
            I owe
          </label>
          <label className="flex items-center text-sm gap-1">
            <input
              type="checkbox"
              checked={type === 'owes me'}
              onChange={() => setType('owes me')}
            />
            Owes me
          </label>
        </div>

        {/* Name input with suggestions */}
        <div className="relative">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded w-full text-sm"
            value={name}
            onChange={(e) => {
              const val = e.target.value;
              setName(val);
              const matches = friends
                .map((f) => f.name)
                .filter((n) => n.toLowerCase().includes(val.toLowerCase()));
              setSuggestions(matches.slice(0, 5));
            }}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-auto text-sm">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setName(s);
                    setSuggestions([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Amount input */}
        <input
          type="number"
          placeholder="₱"
          className="p-2 border rounded w-full text-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Add button */}
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm w-full"
        >
          Add
        </button>
      </div>

      {/* Entries display */}
      {entries.length === 0 ? (
        <p className="text-center text-sm text-gray-400">No entries yet 🌸</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className={`p-3 rounded shadow-sm text-sm flex flex-col ${
                entry.type === 'I owe' ? 'bg-red-100' : 'bg-green-100'
              }`}
            >
              <div className="flex justify-between items-center">
                {entry.type === 'I owe' ? (
                  <span>
                    You owe <span className="font-bold">{entry.name}</span>
                  </span>
                ) : (
                  <span>
                    <span className="font-bold">{entry.name}</span> owes you
                  </span>
                )}
                <span className="font-bold">
                  {formatAmount(entry.amount)}
                </span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {format(new Date(entry.date), 'PP p')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
