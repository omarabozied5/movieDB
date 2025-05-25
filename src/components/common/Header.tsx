/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Search } from "lucide-react";
import { useMovieStore } from "../../store/movieStore";

const Header: React.FC = () => {
  const { setQuery, query, search } = useMovieStore();

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
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center">
            Movies
            <span className="text-[#FFD600]">DB</span>
          </h1>

          <div className="relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search"
                className="w-72 px-4 py-2.5 pl-12 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-colors"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
