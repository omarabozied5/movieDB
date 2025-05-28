import React, { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { MovieDialogProps } from "../../types";

interface ExtendedMovieDialogProps extends MovieDialogProps {
  selectedMovieIndex?: number;
  columnsPerRow?: number;
}

const MovieDialog: React.FC<ExtendedMovieDialogProps> = ({
  movie,
  isOpen,
  onClose,
  onMoreInfo,
  selectedMovieIndex = 0,
  columnsPerRow = 5,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      setIsAnimating(true);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const handleMoreInfo = () => {
    onMoreInfo(movie);
  };

  // Responsive column calculation
  const getColumnsPerRow = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 2; // mobile
      if (width < 768) return 3; // sm
      if (width < 1024) return 4; // md
      return 5; // lg and above
    }
    return columnsPerRow;
  };

  const responsiveColumnsPerRow = getColumnsPerRow();
  const columnInRow = selectedMovieIndex % responsiveColumnsPerRow;
  const pointerLeftPosition = `${
    (columnInRow / responsiveColumnsPerRow) * 100 +
    100 / responsiveColumnsPerRow / 2
  }%`;

  return (
    <div className="col-span-full">
      {/* Pointer triangle - hide on mobile */}
      <div
        className="hidden sm:flex justify-start relative"
        style={{ paddingLeft: "1.5rem" }}
      >
        <div
          className="transition-all duration-300 ease-out relative"
          style={{
            left: pointerLeftPosition,
            transform: `translateX(-50%) ${
              isAnimating
                ? "translateY(0) scale(1)"
                : "translateY(-10px) scale(0.8)"
            }`,
            opacity: isAnimating ? 1 : 0,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "20px solid #FFD700",
            }}
          />
        </div>
      </div>

      <div
        ref={dialogRef}
        className="relative mx-2 sm:mx-4 overflow-hidden shadow-2xl bg-gray-900 transition-all duration-500 ease-out transform rounded-lg"
        style={{
          border: "2px sm:border-4 solid #FFD700",
          minHeight: "300px",
          transform: isAnimating
            ? "translateY(0) scale(1)"
            : "translateY(-20px) scale(0.95)",
          opacity: isAnimating ? 1 : 0,
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/800/600"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-8 min-h-[300px] sm:min-h-[400px] flex flex-col">
          {/* Title and Plot Section */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div>
              <h1
                className="font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {movie.Title}
              </h1>

              {movie.Plot && movie.Plot !== "N/A" && (
                <div className="mb-4 sm:mb-6">
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg block mb-2 sm:mb-3">
                    Short Bio:
                  </span>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {movie.Plot}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Responsive Layout */}
          <div className="flex flex-col sm:flex-row justify-between items-start mt-auto gap-4 sm:gap-6">
            {/* Rating and Button Section */}
            <div className="w-full sm:flex-1 sm:max-w-xs flex flex-col sm:h-full">
              <div className="mb-4 sm:mb-8">
                <span className="text-white font-bold text-lg sm:text-xl block mb-2 sm:mb-3">
                  Rating
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const rating = parseFloat(movie.imdbRating || "0") / 2;
                    const isFilled = i < Math.floor(rating);
                    const isHalf =
                      i === Math.floor(rating) && rating % 1 >= 0.5;

                    return (
                      <Star
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary"
                        style={{
                          fill: isFilled || isHalf ? "#FFD700" : "transparent",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleMoreInfo}
                  className="w-full sm:w-auto text-black px-6 sm:px-8 lg:px-12 py-2 sm:py-3 font-bold text-sm sm:text-base hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 rounded hover:scale-105 touch-manipulation"
                  style={{ background: "#FFD700" }}
                >
                  More Info
                </button>
              </div>
            </div>

            {/* Movie Details Grid - Responsive */}
            <div className="w-full sm:flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-x-8 sm:gap-y-6 text-sm sm:text-base">
              {movie.Genre && movie.Genre !== "N/A" && (
                <div className="col-span-1">
                  <span className="text-white font-bold text-base sm:text-lg lg:text-xl block mb-2 sm:mb-3">
                    Genre
                  </span>
                  <span className="bg-gray-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-semibold inline-block">
                    {movie.Genre.split(",")[0].trim()}
                  </span>
                </div>
              )}

              {movie.Released && movie.Released !== "N/A" && (
                <div className="col-span-1">
                  <span className="text-white font-bold text-base sm:text-lg lg:text-xl block mb-2 sm:mb-3">
                    Released
                  </span>
                  <span className="text-white text-sm sm:text-base">
                    {movie.Released}
                  </span>
                </div>
              )}

              {movie.Director && movie.Director !== "N/A" && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                  <span className="text-white font-bold text-base sm:text-lg lg:text-xl block mb-2 sm:mb-3">
                    Directors
                  </span>
                  <span className="text-white text-sm sm:text-base line-clamp-2">
                    {movie.Director}
                  </span>
                </div>
              )}

              {movie.Language && movie.Language !== "N/A" && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                  <span className="text-white font-bold text-base sm:text-lg lg:text-xl block mb-2 sm:mb-3">
                    Language
                  </span>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    {movie.Language.split(",")
                      .slice(0, 2)
                      .map((lang, i) => (
                        <span
                          key={i}
                          className="bg-yellow-400 text-primary px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold"
                        >
                          {lang.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
