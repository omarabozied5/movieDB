import React, { useEffect, useRef } from "react";
import { Star, Film } from "lucide-react";
import type { MovieDialogProps } from "../../types";

const MovieDialog: React.FC<MovieDialogProps> = ({
  movie,
  isOpen,
  onClose,
  onMoreInfo,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

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
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const handleMoreInfo = () => {
    onMoreInfo(movie);
  };

  return (
    <div className="col-span-full">
      <div
        ref={dialogRef}
        className="relative mx-4 my-4 overflow-hidden shadow-2xl animate-slide-in-up bg-gray-900"
        style={{
          border: "3px solid #FFD700",
        }}
      >
        {/* Background poster image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/800/600"
            })`,
          }}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        {/* Content container */}
        <div className="relative z-10 p-8 min-h-[400px] flex flex-col">
          {/* Top section - Title and Bio */}
          <div className="mb-8">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
                {movie.Title}
              </h2>

              {/* Short Bio/Plot */}
              {movie.Plot && movie.Plot !== "N/A" && (
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {movie.Plot}
                </p>
              )}
            </div>
          </div>

          {/* Bottom section - Release date and details grid */}
          <div className="flex justify-between items-start">
            {/* Left side - Release date and Rating */}
            <div className="flex-1 max-w-xs">
              {/* Release Date
              <div className="mb-6">
                <span className="text-yellow-400 font-bold text-2xl block mb-2">
                  {movie.Released && movie.Released !== "N/A"
                    ? new Date(movie.Released)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        .toUpperCase()
                    : movie.Year}
                </span>
              </div> */}

              {/* Rating with stars */}
              <div className="mb-8">
                <span className="text-white font-bold text-xl block mb-2">
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
                        className={`w-8 h-8 ${
                          isFilled || isHalf ? "text-primary" : "text-primary"
                        }`}
                        style={{
                          fill: isFilled || isHalf ? "#FFD600" : "transparent",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* More Info Button */}
              <button
                onClick={handleMoreInfo}
                className="text-black px-4 py-3 font-bold text-sm hover:opacity-90 transition-all duration-200 flex items-center gap-4 rounded mt-4 hover:scale-110"
                style={{ background: "#FFD600" }}
              >
                <Film className="w-4 h-4" />
                More Info
              </button>
            </div>

            {/* Right side - Details grid */}
            <div className="flex-1 grid grid-cols-4 gap-x-12 gap-y-6 text-lg">
              {/* Genre */}
              {movie.Genre && movie.Genre !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Genre
                  </span>
                  <span className="bg-gray-600 text-white px-4 py-2 rounded text-sm font-semibold">
                    {movie.Genre.split(",")[0].trim()}
                  </span>
                </div>
              )}

              {/* Released */}
              {movie.Released && movie.Released !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Released
                  </span>
                  <span className="text-white text-base">{movie.Released}</span>
                </div>
              )}

              {/* Directors */}
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Directors
                  </span>
                  <span className="text-white text-base">{movie.Director}</span>
                </div>
              )}

              {/* Language */}
              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Language
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {movie.Language.split(",")
                      .slice(0, 2)
                      .map((lang, i) => (
                        <span
                          key={i}
                          className="bg-yellow-400 text-primary px-3 py-1 rounded text-sm font-bold"
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
