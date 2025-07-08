import React, { useState } from 'react';

const MoneyTracker = () => {
    const [totalMoney, setTotalMoney] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expenseAmount, setExpenseAmount] = useState('');

    const addExpense = () => {
        if (expenseAmount) {
            setExpenses([...expenses, parseFloat(expenseAmount)]);
            setTotalMoney(totalMoney - parseFloat(expenseAmount));
            setExpenseAmount('');
        }
    };

    const calculateTotalExpenses = () => {
        return expenses.reduce((acc, curr) => acc + curr, 0);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Money Tracker</h2>
            <div className="mt-4">
                <h3 className="text-lg">Total Money on Hand: ${totalMoney.toFixed(2)}</h3>
                <h3 className="text-lg">Total Expenses: ${calculateTotalExpenses().toFixed(2)}</h3>
            </div>
            <div className="mt-4">
                <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="Enter expense amount"
                    className="border p-2"
                />
                <button onClick={addExpense} className="ml-2 bg-blue-500 text-white p-2">
                    Add Expense
                </button>
            </div>
            <div className="mt-4">
                <h4 className="text-lg">Expenses List:</h4>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>${expense.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MoneyTracker;