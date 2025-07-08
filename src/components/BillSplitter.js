import React, { useState } from 'react';

const BillSplitter = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [friends, setFriends] = useState([]);
    const [payments, setPayments] = useState({});
    const [newFriend, setNewFriend] = useState('');

    const handleAddFriend = () => {
        if (newFriend && !friends.includes(newFriend)) {
            setFriends([...friends, newFriend]);
            setPayments({ ...payments, [newFriend]: 0 });
            setNewFriend('');
        }
    };

    const handlePaymentChange = (friend, amount) => {
        setPayments({ ...payments, [friend]: amount });
    };

    const totalPaid = Object.values(payments).reduce((acc, curr) => acc + Number(curr), 0);
    const remaining = totalAmount - totalPaid;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Bill Splitter</h2>
            <input
                type="number"
                placeholder="Total Amount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="border p-2 rounded mb-4"
            />
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Add Friend"
                    value={newFriend}
                    onChange={(e) => setNewFriend(e.target.value)}
                    className="border p-2 rounded"
                />
                <button onClick={handleAddFriend} className="ml-2 bg-blue-500 text-white p-2 rounded">
                    Add
                </button>
            </div>
            {friends.map((friend) => (
                <div key={friend} className="mb-2">
                    <span>{friend}: </span>
                    <input
                        type="number"
                        placeholder="Amount Paid"
                        value={payments[friend]}
                        onChange={(e) => handlePaymentChange(friend, e.target.value)}
                        className="border p-1 rounded"
                    />
                </div>
            ))}
            <div className="mt-4">
                <h3 className="font-semibold">Total Paid: {totalPaid}</h3>
                <h3 className="font-semibold">Remaining: {remaining}</h3>
            </div>
        </div>
    );
};

export default BillSplitter;