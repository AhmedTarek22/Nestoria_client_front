


import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center mb-6">
      <FaSearch className="text-[#929292] mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-3 px-6 rounded-full bg-transparent text-[#929292] border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
      />
    </div>
  );
};

export default SearchBar;
