import React from 'react';

const Itinerary = () => {
    const activities = [
        { day: 1, time: '10:00 AM', activity: 'Arrival in Baguio' },
        { day: 1, time: '12:00 PM', activity: 'Lunch at Café by the Ruins' },
        { day: 1, time: '2:00 PM', activity: 'Visit Burnham Park' },
        { day: 1, time: '5:00 PM', activity: 'Check-in at Hotel' },
        { day: 1, time: '7:00 PM', activity: 'Dinner at Good Taste' },
        { day: 2, time: '8:00 AM', activity: 'Breakfast at Hotel' },
        { day: 2, time: '9:00 AM', activity: 'Visit Mines View Park' },
        { day: 2, time: '12:00 PM', activity: 'Lunch at a Local Eatery' },
        { day: 2, time: '2:00 PM', activity: 'Explore Session Road' },
        { day: 2, time: '6:00 PM', activity: 'Dinner at a Local Restaurant' },
        { day: 3, time: '8:00 AM', activity: 'Breakfast and Check-out' },
        { day: 3, time: '10:00 AM', activity: 'Visit Botanical Garden' },
        { day: 3, time: '12:00 PM', activity: 'Lunch and Departure' },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Itinerary for Baguio Trip</h2>
            <ul className="list-disc pl-5">
                {activities.map((activity, index) => (
                    <li key={index} className="mb-2">
                        <strong>Day {activity.day}:</strong> {activity.time} - {activity.activity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Itinerary;