/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Search } from "lucide-react";
import { useMovieStore } from "../../store/movieStore";

const Header: React.FC = () => {
  const { setQuery, setType, type, query, search } = useMovieStore();

  const handleTabChange = (newType: "movie" | "series") => {
    setType(newType);
    // If there's a query, search with the new type
    if (query.trim()) {
      search(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center">
          Movies
          <span className="text-[#FFD600]">DB</span>
        </h1>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Search ${type}s...`}
              className="w-80 px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-[#FFD600]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
