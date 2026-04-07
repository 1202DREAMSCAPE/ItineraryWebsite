import React from 'react';

export default function ItineraryTimeline({ dayIndex }) {
  const { day, events } = itinerary[dayIndex];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 py-3 shadow-sm text-center font-bold text-lg text-green-700">
        {day}
      </div>

      {events.map((event, idx) => (
        <div key={idx} className="flex items-start gap-3">
          {event.time && (
            <div className="text-xs text-gray-500 mt-2 w-20 shrink-0 font-medium">
              {event.time}
            </div>
          )}
          <div className="bg-green-50 rounded-xl p-3 text-sm shadow w-full">
            {event.place}
          </div>
        </div>
      ))}
    </div>
  );
}

