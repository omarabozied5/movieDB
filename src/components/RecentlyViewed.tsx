import React, { useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MovieCard from "./MovieCard";
import type {
  RecentlyViewed,
  RecentlyViewedProps,
  RecentlyViewedItem,
} from "../types";

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  movies,
  series,
  title,
  isCollapsed,
  onToggle,
  onMovieClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Combine movies and series with type indicators
  const combinedItems: RecentlyViewedItem[] = [
    ...movies.map((item) => ({ ...item, type: "movie" as const })),
    ...series.map((item) => ({ ...item, type: "series" as const })),
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
      <div
        onClick={onToggle}
        className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="text-gray-400 hover:text-white transition-colors">
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="relative slider-container">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 slider-container:hover .slider-arrow transition-opacity duration-300"
            style={{ transform: "translateY(-50%)" }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 slider-arrow transition-opacity duration-300"
            style={{ transform: "translateY(-50%)" }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => {
              const arrows = document.querySelectorAll(".slider-arrow");
              arrows.forEach((arrow) => arrow.classList.add("opacity-100"));
              arrows.forEach((arrow) => arrow.classList.remove("opacity-0"));
            }}
            onMouseLeave={() => {
              const arrows = document.querySelectorAll(".slider-arrow");
              arrows.forEach((arrow) => arrow.classList.remove("opacity-100"));
              arrows.forEach((arrow) => arrow.classList.add("opacity-0"));
            }}
          >
            {combinedItems.map((item) => (
              <div
                key={`${item.type}-${item.imdbID}`}
                className="flex-shrink-0 w-48 relative"
              >
                {/* Type indicator badge */}
                <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
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
