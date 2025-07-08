import React from 'react';
import Itinerary from './components/Itinerary';
import BillSplitter from './components/BillSplitter';
import MoneyTracker from './components/MoneyTracker';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Weather from './components/Weather';
import SpinTheWheel from './components/SpinTheWheel';

function App() {
    return (
        <div className="App">
            <header className="bg-blue-500 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Baguio Trip Planner</h1>
            </header>
            <main className="p-4">
                <Weather />
                <Itinerary />
                <BillSplitter />
                <MoneyTracker />
                <Dashboard />
                <SpinTheWheel />
                <AdminPanel />
            </main>
        </div>
    );
}

export default App;