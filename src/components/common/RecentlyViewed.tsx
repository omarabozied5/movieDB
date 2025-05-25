import React, { useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MovieCard from "../movie/MovieCard";
import type { Movie, RecentlyViewedItem } from "../../types";

interface RecentlyViewedProps {
  movies: Movie[];
  series: Movie[];
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onMovieClick: (movie: Movie) => void;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  movies,
  series,
  title,
  isCollapsed,
  onToggle,
  onMovieClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  // Combine movies and series with type indicators
  const combinedItems: RecentlyViewedItem[] = [
    ...(movies || []).map(
      (item): RecentlyViewedItem => ({
        ...item,
        type: "movie" as const,
        viewedAt: new Date().toISOString(),
      })
    ),
    ...(series || []).map(
      (item): RecentlyViewedItem => ({
        ...item,
        type: "series" as const,
        viewedAt: new Date().toISOString(),
      })
    ),
  ];

  if (combinedItems.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Section Header - Consistent with TabSwitcher styling */}
      <div className="mb-6">
        <div
          onClick={onToggle}
          className="flex items-center justify-between cursor-pointer group"
        >
          <h2 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
            {title}
          </h2>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            {isCollapsed ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Underline similar to TabSwitcher */}
        {!isCollapsed && (
          <div className="mt-3 border-b border-gray-700">
            <div className="h-0.5 bg-[#FFD600] w-24"></div>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div
          className="relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-opacity duration-300 ${
              showArrows ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-opacity duration-300 ${
              showArrows ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {combinedItems.map((item) => (
              <div
                key={`${item.type}-${item.imdbID}`}
                className="flex-shrink-0 w-48 relative"
              >
                {/* Type indicator badge */}
                <div className="absolute top-2 right-2 z-10 bg-[#FFD600] text-black text-xs font-semibold px-2 py-1 rounded-full">
                  {item.type === "movie" ? "Movie" : "Series"}
                </div>
                <MovieCard movie={item} onClick={onMovieClick} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
