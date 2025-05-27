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
    <div className="top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
    </div>
  );
};

export default Header;
