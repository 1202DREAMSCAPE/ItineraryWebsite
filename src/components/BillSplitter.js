import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, UserPlusIcon, CalculatorIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BillSplitter = () => {
    const [friends, setFriends] = useState(() => {
        const saved = localStorage.getItem('bt-friends');
        return saved ? JSON.parse(saved) : ['You', 'Friend 1', 'Friend 2'];
    });
    
    const [bills, setBills] = useState(() => {
        const saved = localStorage.getItem('bt-bills');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Dinner at Good Taste', amount: 1500, participants: ['You', 'Friend 1', 'Friend 2'], paidBy: 'You' },
            { id: 2, name: 'Taxi', amount: 300, participants: ['You', 'Friend 1'], paidBy: 'Friend 1' }
        ];
    });

    const [newFriendName, setNewFriendName] = useState('');
    const [showAddBill, setShowAddBill] = useState(false);
    const [newBill, setNewBill] = useState({ name: '', amount: '', participants: [], paidBy: 'You' });
    const [selectedBillDetails, setSelectedBillDetails] = useState(null);

    // Persist data
    useEffect(() => {
        localStorage.setItem('bt-friends', JSON.stringify(friends));
    }, [friends]);

    useEffect(() => {
        localStorage.setItem('bt-bills', JSON.stringify(bills));
        // Sync with Owe Tracker logic (this will trigger components that listen to localStorage)
        window.dispatchEvent(new Event('storage'));
    }, [bills]);

    const addFriend = () => {
        if (newFriendName.trim() && !friends.includes(newFriendName.trim())) {
            setFriends([...friends, newFriendName.trim()]);
            setNewFriendName('');
        }
    };

    const removeFriend = (name) => {
        setFriends(friends.filter(f => f !== name));
        setBills(bills.map(bill => ({
            ...bill,
            participants: bill.participants.filter(p => p !== name),
            paidBy: bill.paidBy === name ? friends.find(f => f !== name) || 'You' : bill.paidBy
        })));
    };

    const addNewBill = () => {
        if (newBill.name && newBill.amount > 0 && newBill.participants.length > 0) {
            setBills([...bills, { ...newBill, id: Date.now(), amount: parseFloat(newBill.amount) }]);
            setNewBill({ name: '', amount: '', participants: [], paidBy: friends[0] || 'You' });
            setShowAddBill(false);
        }
    };

    const deleteBill = (id) => {
        setBills(bills.filter(b => b.id !== id));
    };

    const toggleParticipant = (friend) => {
        setNewBill(prev => {
            const participants = prev.participants.includes(friend)
                ? prev.participants.filter(p => p !== friend)
                : [...prev.participants, friend];
            return { ...prev, participants };
        });
    };

    const getDebtMatrix = () => {
        const matrix = {}; // { winner: { loser: amount } }
        
        bills.forEach(bill => {
            const payer = bill.paidBy;
            const splitAmount = bill.amount / bill.participants.length;
            
            bill.participants.forEach(participant => {
                if (participant === payer) return;
                
                if (!matrix[payer]) matrix[payer] = {};
                if (!matrix[payer][participant]) matrix[payer][participant] = 0;
                matrix[payer][participant] += splitAmount;
            });
        });
        
        return matrix;
    };

    const debtMatrix = getDebtMatrix();
    const totalTripCost = bills.reduce((acc, b) => acc + b.amount, 0);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="bg-white rounded-3xl p-6 shadow-xl text-black border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                            Bill Splitter
                        </h2>
                        <p className="text-gray-500 text-sm">Track who paid and who owes</p>
                    </div>
                </div>

                {/* Friends Management */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
                        <UserPlusIcon className="w-4 h-4 mr-2" /> Friends List
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {friends.map(f => (
                            <span key={f} className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium group transition-all hover:bg-gray-200">
                                {f}
                                {f !== 'You' && (
                                    <button onClick={() => removeFriend(f)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <TrashIcon className="w-3 h-3" />
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add friend name..."
                            value={newFriendName}
                            onChange={(e) => setNewFriendName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addFriend()}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                        <button 
                            onClick={addFriend}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Bills Management */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-gray-600 flex items-center">
                            <CalculatorIcon className="w-4 h-4 mr-2" /> Recent Bills
                        </h3>
                        <button 
                            onClick={() => setShowAddBill(!showAddBill)}
                            className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center hover:bg-gray-800 transition-all"
                        >
                            <PlusIcon className="w-4 h-4 mr-1" /> New Bill
                        </button>
                    </div>

                    {showAddBill && (
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Label</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Lunch at 50th Diner"
                                        value={newBill.name}
                                        onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Amount (₱)</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={newBill.amount}
                                        onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Who Paid?</p>
                                    <select 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        value={newBill.paidBy}
                                        onChange={(e) => setNewBill({...newBill, paidBy: e.target.value})}
                                    >
                                        {friends.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Split With</p>
                                    <div className="flex flex-wrap gap-2">
                                        {friends.map(f => (
                                            <button
                                                key={f}
                                                onClick={() => toggleParticipant(f)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                                    newBill.participants.includes(f)
                                                        ? 'bg-emerald-600 text-white shadow-md'
                                                        : 'bg-white border border-gray-200 text-gray-400'
                                                }`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button 
                                    onClick={addNewBill}
                                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700"
                                >
                                    Confirm Log
                                </button>
                                <button 
                                    onClick={() => setShowAddBill(false)}
                                    className="px-6 py-3 text-gray-400 text-sm font-bold hover:text-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bills.map(bill => (
                            <div 
                                key={bill.id} 
                                onClick={() => setSelectedBillDetails(bill)}
                                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <EyeIcon className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-bold text-gray-800 line-clamp-1">{bill.name}</p>
                                        <p className="text-xs text-emerald-600 font-bold">Paid by {bill.paidBy}</p>
                                    </div>
                                    <p className="text-lg font-black text-gray-900">₱{bill.amount.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    <span>{bill.participants.length} Splitters</span>
                                    <span className="text-gray-800">₱{(bill.amount / bill.participants.length).toFixed(2)} each</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Owe Summary Breakdown */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-black text-gray-800 mb-6">Settlement Summary</h3>
                <div className="space-y-4">
                    {Object.entries(debtMatrix).map(([winner, debtors]) => (
                        <div key={winner} className="space-y-2">
                            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-full">{winner} is owed by:</p>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(debtors).map(([debtor, amount]) => (
                                    <div key={debtor} className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-xs font-black text-gray-600 uppercase">
                                                {debtor[0]}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{debtor}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-gray-900">₱{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {Object.keys(debtMatrix).length === 0 && (
                        <p className="text-center py-8 text-gray-400 italic text-sm">No debts recorded yet! 🕊️</p>
                    )}
                </div>
            </div>

            {/* Bill Details Modal */}
            {selectedBillDetails && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden p-8 relative animate-in zoom-in-95 duration-300">
                        <button 
                            onClick={() => setSelectedBillDetails(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:text-black transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <div className="text-center space-y-2 mb-8">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CalculatorIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800">{selectedBillDetails.name}</h3>
                            <p className="text-3xl font-black text-emerald-600">₱{selectedBillDetails.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Paid by {selectedBillDetails.paidBy}</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Breakdown per person</p>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {selectedBillDetails.participants.map(p => (
                                    <div key={p} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${p === selectedBillDetails.paidBy ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                {p[0]}
                                            </div>
                                            <span className={`text-sm font-bold ${p === selectedBillDetails.paidBy ? 'text-emerald-700' : 'text-gray-700'}`}>
                                                {p} {p === selectedBillDetails.paidBy && '(Payer)'}
                                            </span>
                                        </div>
                                        <span className="font-bold text-gray-900">₱{(selectedBillDetails.amount / selectedBillDetails.participants.length).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                deleteBill(selectedBillDetails.id);
                                setSelectedBillDetails(null);
                            }}
                            className="w-full mt-8 flex items-center justify-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-red-50 transition-all"
                        >
                            <TrashIcon className="w-4 h-4" /> Delete this record
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillSplitter;