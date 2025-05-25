/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useMovieStore } from "../../store/movieStore";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const { setQuery, query, search } = useMovieStore();

  const handleSearch = () => {
    if (query.trim()) {
      search(true);
    }
  };

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top section with logo and search */}
        <div className="flex items-center justify-between gap-4 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center flex-shrink-0">
            Movies
            <span className="text-[#FFD600]">DB</span>
          </h1>

          <div className="flex-1 max-w-md">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="border-b border-gray-800"></div>
    </div>
  );
};

export default Header;
