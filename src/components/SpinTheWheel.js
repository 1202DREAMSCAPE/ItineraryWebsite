import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, TrashIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
    '#F7DC6F', '#BB8FCE', '#82E0AA', '#F1948A', '#85C1E9'
];

const SpinTheWheel = () => {
    const [items, setItems] = useState(['Lunch', 'Dinner', 'Bag of Candy', 'Winner!']);
    const [newItem, setNewItem] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState(null);
    const wheelRef = useRef(null);

    const addItem = () => {
        if (newItem.trim() && !items.includes(newItem.trim())) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
            setWinner(null);
        }
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
        setWinner(null);
    };

    const spin = () => {
        if (spinning || items.length < 2) return;

        setSpinning(true);
        setWinner(null);

        // Random spin amount (at least 5 full rotations + random extra)
        const extraDegrees = Math.floor(Math.random() * 360);
        const spinResult = rotation + (360 * 8) + extraDegrees;
        
        setRotation(spinResult);

        // Calculate winner after animation
        setTimeout(() => {
            setSpinning(false);
            // Normalized degree (0-359). 0 is 12 o'clock.
            // Wheel rotates clockwise, so we subtract extraDegrees from 360 relative to initial position.
            // Pointer is fixed at 0 degrees (top).
            const finalDegree = (spinResult % 360);
            const segmentSize = 360 / items.length;
            
            // The segment at the top is the lucky one.
            // Since the wheel rotates clockwise, the item at index X moves from index*size to index*size + rotation.
            // Winning index = (items.length - floor(normalizedRotation / segmentSize)) % items.length
            const winningIndex = Math.floor(((360 - finalDegree) % 360) / segmentSize);
            setWinner(items[winningIndex]);
        }, 5000); // match transition duration
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in fade-in duration-1000">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    Lucky Wheel
                </h2>
                <p className="text-gray-400 font-medium tracking-wide">Who gets the next treat? Spin to find out!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Wheel Container */}
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="relative group">
                        {/* Static Pointer */}
                        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 z-20">
                            <div className="w-8 h-10 bg-black rounded-b-full shadow-lg relative overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-red-600" />
                            </div>
                        </div>

                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />

                        {/* SVG Wheel */}
                        <div 
                            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-white shadow-2xl overflow-hidden bg-white transition-transform duration-[5s] ease-out"
                            style={{ transform: `rotate(${rotation}deg)` }}
                            ref={wheelRef}
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                {items.map((item, i) => {
                                    const size = 100 / items.length;
                                    const angle = (360 / items.length);
                                    const startAngle = i * angle;
                                    
                                    // Calculate SVG path for sector
                                    const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                                    const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                                    const x2 = 50 + 50 * Math.cos((Math.PI * (startAngle + angle - 90)) / 180);
                                    const y2 = 50 + 50 * Math.sin((Math.PI * (startAngle + angle - 90)) / 180);
                                    
                                    return (
                                        <g key={i}>
                                            <path 
                                                d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                                fill={COLORS[i % COLORS.length]}
                                                className="transition-colors duration-300 hover:brightness-110"
                                            />
                                            <text
                                                x="50"
                                                y="20"
                                                transform={`rotate(${startAngle + angle/2}, 50, 50)`}
                                                fill="white"
                                                textAnchor="middle"
                                                className="text-[4px] font-bold select-none tracking-tighter"
                                                style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))' }}
                                            >
                                                {item.length > 20 ? item.substring(0, 17) + '...' : item}
                                            </text>
                                        </g>
                                    );
                                })}
                                <circle cx="50" cy="50" r="4" fill="white" className="shadow-lg" />
                                <circle cx="50" cy="50" r="2" fill="#333" />
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning || items.length < 2}
                        className={`group relative px-12 py-4 rounded-full font-black text-xl transition-all active:scale-90 ${
                            spinning 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-black text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20'
                        }`}
                    >
                        {spinning ? (
                            <span className="flex items-center gap-2">
                                <ArrowPathIcon className="w-6 h-6 animate-spin" /> SPINNING...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <SparklesIcon className="w-6 h-6 text-yellow-400 group-hover:animate-bounce" /> SPIN NOW!
                            </span>
                        )}
                    </button>
                </div>

                {/* Controls and Results */}
                <div className="space-y-6">
                    {winner && !spinning && (
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl text-center shadow-xl animate-bounce">
                            <p className="text-white text-xs uppercase font-black tracking-widest mb-1 italic">We have a winner!</p>
                            <h3 className="text-4xl font-black text-white drop-shadow-lg">{winner}</h3>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add new choice..."
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                                className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                            />
                            <button
                                onClick={addItem}
                                className="bg-purple-600 text-white p-3 rounded-2xl shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all"
                            >
                                <PlusIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {items.length === 0 && (
                                <p className="text-center text-gray-400 py-8 text-sm italic">Add at least two items to start spinning!</p>
                            )}
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl group hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                        <span className="text-sm font-bold text-gray-700">{item}</span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(idx)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpinTheWheel;
