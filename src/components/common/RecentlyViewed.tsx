import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
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
    <div className="px-6 py-4">
      {/* Section Header */}
      <div className="mb-4">
        <div
          onClick={onToggle}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <h2 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
            {title}
          </h2>
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <ChevronUp
              className={`w-8 h-8 transition-transform ${
                isCollapsed ? "" : "rotate-180"
              }`}
            />
          </div>
        </div>
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
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-opacity duration-300 ${
              showArrows ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container - Matching the design's horizontal layout */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {combinedItems.map((item) => (
              <div
                key={`${item.type}-${item.imdbID}`}
                className="flex-shrink-0 w-36"
              >
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
