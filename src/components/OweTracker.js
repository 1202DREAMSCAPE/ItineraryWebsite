import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { 
    CalculatorIcon, 
    UserIcon, 
    HandThumbUpIcon, 
    ClockIcon,
    TrashIcon,
    Bars3CenterLeftIcon
} from '@heroicons/react/24/outline';

export default function OweTracker({ small }) {
  const [bills, setBills] = useState([]);
  const [manualEntries, setManualEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('owe-tracker-entries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'manual'
  
  // Load bills and keep in sync
  const loadData = () => {
    const savedBills = localStorage.getItem('bt-bills');
    if (savedBills) setBills(JSON.parse(savedBills));
    
    const savedManual = localStorage.getItem('owe-tracker-entries');
    if (savedManual) setManualEntries(JSON.parse(savedManual));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Calculate settlement matrix for bills
  const getSettlements = () => {
    const matrix = {}; // { debtor: { creditor: amount } }
    
    bills.forEach(bill => {
      const creditor = bill.paidBy;
      const amountPerPerson = bill.amount / bill.participants.length;
      
      bill.participants.forEach(participant => {
        if (participant === creditor) return;
        
        if (!matrix[participant]) matrix[participant] = {};
        if (!matrix[participant][creditor]) matrix[participant][creditor] = 0;
        matrix[participant][creditor] += amountPerPerson;
      });
    });
    
    return matrix;
  };

  const settlements = getSettlements();

  return (
    <div className={`max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500`}>
      <Toaster position="top-right" />

      {/* Header Stat Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] p-8 text-white shadow-xl shadow-purple-200">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h2 className="text-3xl font-black mb-1">Owe Tracker</h2>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Settlement Summary</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <CalculatorIcon className="w-8 h-8" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-black text-white/60 uppercase mb-1">Active Debts</p>
                <p className="text-xl font-black">
                    {Object.values(settlements).reduce((acc, creditors) => acc + Object.keys(creditors).length, 0)}
                </p>
            </div>
            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-black text-white/60 uppercase mb-1">Last Updated</p>
                <p className="text-xl font-black text-white/90">{format(new Date(), 'p')}</p>
            </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-gray-100 p-1.5 rounded-2xl md:w-fit mx-auto">
        <button 
           onClick={() => setActiveTab('summary')}
           className={`flex-1 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
               activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'
           }`}
        >
            Auto Summary
        </button>
        <button 
           onClick={() => setActiveTab('manual')}
           className={`flex-1 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
               activeTab === 'manual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'
           }`}
        >
            Manual Logs
        </button>
      </div>

      {activeTab === 'summary' ? (
          <div className="space-y-4">
              {Object.keys(settlements).length === 0 ? (
                  <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center space-y-4 shadow-sm">
                      <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                          <HandThumbUpIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800">Clear Skies!</h4>
                        <p className="text-sm text-gray-400">Add bills in the Split tab to see debts here.</p>
                      </div>
                  </div>
              ) : (
                  Object.entries(settlements).map(([debtor, creditors]) => (
                      <div key={debtor} className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6 hover:shadow-md transition-all">
                          <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">
                                  {debtor[0]}
                              </div>
                              <div>
                                  <h3 className="text-lg font-black text-gray-800">{debtor}</h3>
                                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Owes {Object.keys(creditors).length} person(s)</p>
                              </div>
                          </div>
                          
                          <div className="space-y-3">
                              {Object.entries(creditors).map(([creditor, amount]) => (
                                  <div key={creditor} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl group border border-transparent hover:border-indigo-100 transition-all">
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-xs font-black text-gray-400 border border-gray-100">
                                              {creditor[0]}
                                          </div>
                                          <p className="text-sm font-bold text-gray-600">
                                              owes <span className="text-indigo-600">{creditor}</span>
                                          </p>
                                      </div>
                                      <div className="text-right">
                                          <p className="text-lg font-black text-gray-900">₱{amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                          <p className="text-[10px] text-gray-400 font-bold italic tracking-tighter">from shared bills</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))
              )}
          </div>
      ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <Bars3CenterLeftIcon className="w-5 h-5 text-gray-400" />
                  <h3 className="font-black text-gray-700 tracking-wide uppercase text-sm">Manual Expense History</h3>
              </div>
              
              {manualEntries.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-sm italic">No manual entries recorded.</p>
              ) : (
                  <div className="space-y-4">
                    {manualEntries.map((entry, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div>
                                <p className="text-sm font-bold text-gray-800">{entry.myName} owes {entry.theirName}</p>
                                <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <ClockIcon className="w-3 h-3" /> {format(new Date(entry.date), 'PP p')}
                                </p>
                            </div>
                            <p className="text-lg font-black text-gray-900">₱{entry.amount.toLocaleString()}</p>
                        </div>
                    ))}
                  </div>
              )}

              <div className="pt-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-medium italic">
                      Auto Summary is calculated based on current records in the **Split Tab**.
                  </p>
              </div>
          </div>
      )}
    </div>
  );
}
