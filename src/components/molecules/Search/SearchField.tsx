import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchFieldProps {
  query: string;
  onSearch: (searchQuery: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ query, onSearch }) => {
  const [inputValue, setInputValue] = useState(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for dishes..."
        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
      />
      <FaSearch className="absolute left-3 text-gray-500" />
    </div>
  );
};

export default SearchField;
