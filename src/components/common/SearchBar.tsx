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
            className="w-full px-4 py-3 pr-12 text-white text-base placeholder-gray-400 focus:outline-none transition-colors duration-200 min-w-0"
            style={{
              background: "transparent",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "1px solid rgb(75, 85, 99)",
              borderRadius: "0",
              boxShadow: "none",
              outline: "none",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
