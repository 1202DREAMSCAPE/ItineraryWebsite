import React, { useState } from 'react';
import ItineraryTimeline from './ItineraryTimeline';

const dateMap = [
  { label: 'July 13', dayIndex: 0 },
  { label: 'July 14', dayIndex: 1 },
  { label: 'July 15', dayIndex: 2 },
];

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState(null);

  const now = new Date().toLocaleString();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center">Our Itinerary ⋆𐙚₊˚⊹♡</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dateMap.map(({ label, dayIndex }) => (
          <div
            key={label}
            onClick={() => setSelectedDay(selectedDay === dayIndex ? null : dayIndex)}
            className={`cursor-pointer rounded-xl shadow-md p-6 transition-transform bg-white relative hover:shadow-lg ${
              selectedDay === dayIndex ? 'rotate-y-180' : ''
            }`}
          >
            <div className="text-center font-semibold text-lg">{label}</div>
            {selectedDay === dayIndex && (
              <div className="mt-4 max-h-96 overflow-y-auto animate-fade-in">
                <ItineraryTimeline dayIndex={dayIndex} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
