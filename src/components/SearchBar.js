import React from 'react';
import './SearchBar.css';

const SearchBar = ({ inputValue, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    return (
        <div className="search-bar">
            <input type="text" onChange={handleChange} value={inputValue} />
        </div>
    );
};

export default SearchBar;