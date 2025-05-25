import React, { useEffect, useRef } from "react";
import { Star, Calendar, Globe, Clock, Award, Users, Film } from "lucide-react";
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
        className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-yellow-400/30 shadow-2xl mx-4 my-4 overflow-hidden animate-slide-in-up"
      >
        {/* Main content container */}
        <div className="flex flex-col lg:flex-row">
          {/* Movie poster section */}
          <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/api/placeholder/300/450"
                }
                alt={movie.Title}
                className="w-48 h-72 object-cover rounded-lg shadow-xl"
              />
              {movie.imdbRating && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {movie.imdbRating}
                </div>
              )}
            </div>
          </div>

          {/* Movie details section */}
          <div className="lg:w-2/3 p-6 space-y-4">
            {/* Title and basic info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {movie.Title}
              </h2>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>

                {movie.Runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}

                <div className="px-2 py-1 bg-yellow-400 text-black text-xs rounded-full font-semibold uppercase tracking-wide">
                  {movie.Type}
                </div>
              </div>
            </div>

            {/* Plot/Synopsis */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">
                  Short Bio:
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {movie.Plot}
                </p>
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Genre */}
              {movie.Genre && movie.Genre !== "N/A" && (
                <div>
                  <span className="text-yellow-400 font-semibold">Genre</span>
                  <p className="text-gray-300">{movie.Genre}</p>
                </div>
              )}

              {/* Released */}
              {movie.Released && movie.Released !== "N/A" && (
                <div>
                  <span className="text-yellow-400 font-semibold">
                    Released
                  </span>
                  <p className="text-gray-300">{movie.Released}</p>
                </div>
              )}

              {/* Directors */}
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <span className="text-yellow-400 font-semibold">
                    Directors
                  </span>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
              )}

              {/* Language */}
              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <span className="text-yellow-400 font-semibold">
                    Language
                  </span>
                  <p className="text-gray-300">{movie.Language}</p>
                </div>
              )}
            </div>

            {/* Cast */}
            {movie.Actors && movie.Actors !== "N/A" && (
              <div>
                <h3 className="text-yellow-400 font-semibold mb-1">Cast</h3>
                <p className="text-gray-300 text-sm">{movie.Actors}</p>
              </div>
            )}

            {/* Awards */}
            {movie.Awards && movie.Awards !== "N/A" && (
              <div>
                <h3 className="text-yellow-400 font-semibold mb-1">Awards</h3>
                <p className="text-gray-300 text-sm">{movie.Awards}</p>
              </div>
            )}

            {/* Action button */}
            <div className="pt-4">
              <button
                onClick={handleMoreInfo}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <Film className="w-4 h-4" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
