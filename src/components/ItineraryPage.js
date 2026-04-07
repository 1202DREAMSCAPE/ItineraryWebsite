import React, { useState, useEffect } from 'react';
import itineraryData from './ItineraryData';
import { 
    ClockIcon, 
    MapPinIcon, 
    CurrencyDollarIcon, 
    CalendarIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import { 
    MdRestaurant, 
    MdDirectionsWalk, 
    MdLocalCafe, 
    MdPhotoCamera, 
    MdShoppingBag 
} from 'react-icons/md';

import day1 from '../assets/images/day1.jpg';
import day2 from '../assets/images/day2.jpg';
import day3 from '../assets/images/day3.png';

const dayImages = [day1, day2, day3];

const getEventIcon = (time, place) => {
    const lowerPlace = place.toLowerCase();
    const lowerTime = time.toLowerCase();
    
    if (lowerTime.includes('breakfast') || lowerTime.includes('lunch') || lowerTime.includes('dinner') || lowerTime.includes('snack')) 
        return <MdRestaurant className="w-5 h-5 text-orange-500" />;
    if (lowerPlace.includes('cafe') || lowerPlace.includes('coffee')) 
        return <MdLocalCafe className="w-5 h-5 text-brown-600" />;
    if (lowerPlace.includes('walk') || lowerPlace.includes('stroll') || lowerPlace.includes('park')) 
        return <MdDirectionsWalk className="w-5 h-5 text-green-600" />;
    if (lowerPlace.includes('mural') || lowerPlace.includes('garden') || lowerPlace.includes('church') || lowerPlace.includes('view')) 
        return <MdPhotoCamera className="w-5 h-5 text-blue-500" />;
    if (lowerPlace.includes('souvenir') || lowerPlace.includes('mall') || lowerPlace.includes('sm')) 
        return <MdShoppingBag className="w-5 h-5 text-purple-500" />;
    
    return <MapPinIcon className="w-5 h-5 text-gray-400" />;
};

const extractCost = (place) => {
    const match = place.match(/₱(\d+)/);
    return match ? match[0] : null;
};

const cleanPlace = (place) => {
    return place.split('(~')[0].split('–')[0].trim();
};

const getTimeRange = (timeLabel) => {
    const label = timeLabel.toLowerCase();
    if (label.includes('breakfast')) return [7, 9];
    if (label.includes('morning')) return [9, 12];
    if (label.includes('lunch')) return [12, 14];
    if (label.includes('afternoon')) return [14, 18];
    if (label.includes('dinner')) return [18, 20];
    if (label.includes('evening') || label.includes('snack')) return [20, 24];
    return null;
};

const ItineraryPage = () => {
    const [activeDay, setActiveDay] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); // update every minute
        return () => clearInterval(timer);
    }, []);

    const currentDay = itineraryData[activeDay];
    const currentHour = currentTime.getHours();

    // Determine target active event
    const getActiveEventIndex = () => {
        // Find last event that has a time label matching current hour
        let lastMatchingIndex = -1;
        currentDay.events.forEach((ev, idx) => {
            const range = getTimeRange(ev.time);
            if (range && currentHour >= range[0] && currentHour < range[1]) {
                lastMatchingIndex = idx;
            }
        });

        // If no direct label found (events without time labels follow the previous one),
        // we might need a more complex logic, but let's stick to the labels for now.
        // Let's refine: if an event is between two labeled times, it belongs to the previous label's window.
        let actualActiveIndex = -1;
        for (let i = 0; i < currentDay.events.length; i++) {
            const range = getTimeRange(currentDay.events[i].time);
            if (range) {
                if (currentHour >= range[0] && currentHour < range[1]) {
                    actualActiveIndex = i;
                }
            } else if (actualActiveIndex !== -1 && i > actualActiveIndex) {
                 // Non-labeled event following an active labeled event? 
                 // Let's just keep the last label active until a new label starts.
            }
        }
        return lastMatchingIndex;
    };

    const activeEventIndex = getActiveEventIndex();

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-700">
            {/* Hero Header */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl mb-8 shadow-2xl">
                <img 
                    src={dayImages[activeDay]} 
                    alt="Baguio View" 
                    className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest mb-2">
                        <CalendarIcon className="w-4 h-4" />
                        Baguio Adventure 2025
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        {currentDay.day.replace('📅 ', '')}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2 md:px-0">
                {/* Day Selector */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Select Journey Day</h3>
                    <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {itineraryData.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveDay(idx)}
                                className={`flex-shrink-0 lg:w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border-2 ${
                                    activeDay === idx 
                                    ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200 translate-x-1' 
                                    : 'bg-white border-gray-100 text-gray-500 hover:border-green-200 hover:bg-green-50'
                                }`}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                                        activeDay === idx ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold opacity-70">Day {idx + 1}</p>
                                        <p className="font-black text-sm whitespace-nowrap">
                                            {idx === 0 ? 'City Core' : idx === 1 ? 'Camp John Hay' : 'Mountains'}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:block bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white overflow-hidden relative group">
                        <div className="relative z-10">
                            <p className="text-white/60 text-xs font-bold uppercase mb-4">Live Status</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-xs text-white/50 leading-relaxed italic">
                                    Highlighting your potential current location based on the itinerary schedule!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-10 relative">
                        {/* Progress Line */}
                        <div className="absolute left-10 md:left-14 top-20 bottom-20 w-0.5 bg-gray-100" />
                        
                        {/* Active Progress Overlay */}
                        {activeEventIndex !== -1 && (
                            <div 
                                className="absolute left-10 md:left-14 top-20 w-0.5 bg-gradient-to-b from-green-500 to-green-300 shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-1000"
                                style={{ height: `calc(${activeEventIndex * 10}rem + 2rem)` }} // Rough estimation for visualization
                            />
                        )}

                        <div className="space-y-10 relative">
                            {currentDay.events.map((event, i) => {
                                const cost = extractCost(event.place);
                                const placeName = cleanPlace(event.place);
                                const isActive = activeEventIndex === i;
                                const isPast = activeEventIndex > i;
                                
                                return (
                                    <div key={i} className={`flex gap-6 md:gap-10 items-start group transition-all duration-500 ${isPast ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                                        {/* Time Indicator */}
                                        <div className="flex flex-col items-center pt-1.5 w-12 md:w-20">
                                            <div className={`relative z-10 w-5 h-5 rounded-full border-[3px] border-white shadow-md transition-all duration-500 ${
                                                isActive 
                                                ? 'bg-green-500 ring-8 ring-green-100 scale-125 animate-pulse' 
                                                : isPast ? 'bg-green-200' : 'bg-gray-300'
                                            }`} />
                                            {event.time && (
                                                <span className={`text-[10px] md:text-xs font-black uppercase tracking-tighter mt-3 whitespace-nowrap text-center ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {event.time}
                                                </span>
                                            )}
                                        </div>

                                        {/* Event Card */}
                                        <div className={`flex-1 rounded-2xl p-4 md:p-6 transition-all duration-500 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                                            isActive 
                                            ? 'bg-green-50 border-green-200 shadow-xl shadow-green-100/50 scale-[1.02]' 
                                            : 'bg-gray-50/50 hover:bg-white border-transparent hover:border-gray-100'
                                        }`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors ${isActive ? 'bg-white text-green-600' : 'bg-white shadow-sm'}`}>
                                                    {getEventIcon(event.time, event.place)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`font-black tracking-tight ${isActive ? 'text-green-900' : 'text-gray-800'} md:text-lg`}>{placeName}</h4>
                                                        {isActive && <BoltIcon className="w-4 h-4 text-green-500 animate-bounce" />}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPinIcon className="w-3.5 h-3.5 text-gray-400" />
                                                        <span className="text-xs text-gray-500 font-medium">Baguio City</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start md:items-end gap-2">
                                                {cost && (
                                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isActive ? 'bg-white/60' : 'bg-emerald-50'}`}>
                                                        <CurrencyDollarIcon className="w-4 h-4 text-emerald-600" />
                                                        <span className="text-[10px] font-black text-emerald-700 tracking-wide">Est. {cost}</span>
                                                    </div>
                                                )}
                                                {isActive && (
                                                    <span className="text-[10px] bg-green-200 text-green-700 px-2 py-0.5 rounded font-black uppercase tracking-widest animate-pulse">
                                                        Happening Now
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryPage;
