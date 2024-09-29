import React, { useState } from 'react';

const RegionDropdown = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Sample options
    const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Kiwi', 'Mango', 'Orange'];

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                Select a fruit
            </button>
            {isOpen && (
                <div className="dropdown-menu show">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="dropdown-divider"></div>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <a key={index} className="dropdown-item" href="#">
                                {option}
                            </a>
                        ))
                    ) : (
                        <div className="dropdown-item disabled">No options found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RegionDropdown;
