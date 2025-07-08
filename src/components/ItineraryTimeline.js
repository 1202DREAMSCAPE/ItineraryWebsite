import React from 'react';

const itinerary = [
  {
    day: "📅 Day 1 – City Core + Good Taste & Cafés",
    events: [
      { time: "🍳 Breakfast", place: "Good Taste Cafe & Restaurant" },
      { time: "🕘 Morning", place: "Burnham Park – Free" },
      { time: "", place: "Botanical Garden – ₱100" },
      { time: "", place: "Walk along Session Road" },
      { time: "🍱 Lunch", place: "Guys on the Hood – Mixed meal (~₱300)" },
      { time: "🕒 Afternoon", place: "SM City Baguio, Sky Ranch (~₱100)" },
      { time: "", place: "Good Shepherd (~₱150)" },
      { time: "", place: "Rebel Bakehouse (~₱250)" },
      { time: "🍲 Early Dinner", place: "Bahay / Luto" },
      { time: "🍨 Evening Snack", place: "Scenic stroll / small treat" },
    ],
  },
  {
    day: "📅 Day 2 – Camp John Hay + Outlook Drive",
    events: [
      { time: "🍳 Breakfast", place: "Hot Cat Coffee (~₱200)" },
      { time: "🕘 Morning", place: "Camp John Hay – Free" },
      { time: "", place: "Bell House & Cemetery – ₱85" },
      { time: "", place: "Wright Park – Free" },
      { time: "", place: "Horseback Ride – ₱200" },
      { time: "", place: "The Mansion – Free" },
      { time: "🍱 Lunch", place: "Agara Ramen (~₱400)" },
      { time: "☕ Post-lunch", place: "Chocolate de Batirol (~₱200)" },
      { time: "🕒 Afternoon", place: "Teachers’ Camp – Free" },
      { time: "", place: "Garden paths or rest" },
      { time: "🍽 Dinner", place: "Arca’s Yard Café (~₱450)" },
    ],
  },
  {
    day: "📅 Day 3 – La Trinidad + Mountain Views",
    events: [
      { time: "🍳 Breakfast", place: "Seollem Café (~₱250)" },
      { time: "🕘 Morning", place: "Strawberry Farm (~₱200)" },
      { time: "", place: "StoBoSa Mural – Free" },
      { time: "", place: "Bell Church – Free" },
      { time: "", place: "Souvenirs (~₱200)" },
      { time: "🍱 Lunch", place: "Grumpy Joe’s (~₱350)" },
      { time: "🕒 Afternoon", place: "Tam-awan Village – ₱60" },
      { time: "", place: "Igorot Stone Kingdom – ₱100" },
      { time: "", place: "Outlook drive – optional" },
      { time: "☕ Snack", place: "Cafe de Angelo (~₱350)" },
      { time: "🍽 Dinner", place: "Pinikpikan + Pinuneg (~₱300–400)" },
    ],
  },
];

export default function ItineraryTimeline({ dayIndex }) {
  const { day, events } = itinerary[dayIndex];

  return (
    <div>
      <h4 className="text-center font-semibold text-sm mb-4">{day}</h4>
      <div className="relative border-l-2 border-green-300 pl-4 space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="relative">
            {event.time && (
              <div className="text-xs text-green-600 font-semibold mb-1">{event.time}</div>
            )}
            <div className="bg-green-50 p-3 rounded shadow hover:shadow-md transition">
              {event.place}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
