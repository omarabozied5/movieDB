import React from "react";
import { Search } from "lucide-react";
import type { SearchBarProps } from "../../types";

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search"
            className="w-full px-4 py-3 pl-12 bg-transparent border-none border-b-2 border-b-gray-700 text-white text-base placeholder-gray-400 focus:outline-none focus:border-b-gray-500 transition-colors min-w-0"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
