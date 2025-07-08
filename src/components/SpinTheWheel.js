import React, { useState } from 'react';

const SpinTheWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);

    const segments = ['🍕 Pizza', '🍔 Burger', '🍣 Sushi', '🍦 Ice Cream', '🍩 Donut', '🍕 Pizza'];

    const spinWheel = () => {
        setSpinning(true);
        const randomIndex = Math.floor(Math.random() * segments.length);
        setTimeout(() => {
            setResult(segments[randomIndex]);
            setSpinning(false);
        }, 2000); // Spin duration
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Spin the Wheel!</h2>
            <div className={`wheel ${spinning ? 'spinning' : ''}`}>
                {segments.map((segment, index) => (
                    <div key={index} className="segment">{segment}</div>
                ))}
            </div>
            <button 
                onClick={spinWheel} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                disabled={spinning}
            >
                {spinning ? 'Spinning...' : 'Spin'}
            </button>
            {result && <p className="mt-4 text-xl">You got: {result}</p>}
        </div>
    );
};

export default SpinTheWheel;