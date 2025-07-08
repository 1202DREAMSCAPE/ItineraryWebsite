import React, { useState } from 'react';

const SectionToggle = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card mb-4">
            <button
                className="w-full text-left font-semibold text-lg flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default SectionToggle;
