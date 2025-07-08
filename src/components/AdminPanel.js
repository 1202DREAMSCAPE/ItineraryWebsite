import React from 'react';

const AdminPanel = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Manage Itinerary</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Activity</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Remove Activity</button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Manage Bill Splitting</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View Payments</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Reset Payments</button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View Users</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Remove User</button>
            </div>
        </div>
    );
};

export default AdminPanel;