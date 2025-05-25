import React from "react";
import { X, Calendar, Star, Play } from "lucide-react";
import type { MovieDialogProps } from "../../types";

const MovieDialog: React.FC<MovieDialogProps> = ({
  movie,
  isOpen,
  onClose,
  onMoreInfo,
}) => {
  if (!isOpen || !movie) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMoreInfo = () => {
    onMoreInfo(movie);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero section with backdrop */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/api/placeholder/800/450"
              }
              alt={movie.Title}
              className="w-full h-full object-cover blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />

            {/* Movie poster and basic info overlay */}
            <div className="absolute bottom-6 left-6 flex items-end gap-6">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/api/placeholder/200/300"
                }
                alt={movie.Title}
                className="w-32 h-48 object-cover rounded-lg shadow-2xl border-2 border-white/20"
              />

              <div className="pb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {movie.Title}
                </h1>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.Year}</span>
                  </div>

                  {movie.imdbRating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{movie.imdbRating}</span>
                    </div>
                  )}

                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium uppercase tracking-wide">
                    {movie.Type}
                  </span>
                </div>

                {/* Action button */}
                <button
                  onClick={handleMoreInfo}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black rounded-lg hover:bg-[#FFD600]/90 transition-colors font-semibold"
                >
                  <Play className="w-4 h-4 fill-current" />
                  More Info
                </button>
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="p-6 space-y-6">
            {/* Genre and Runtime */}
            <div className="flex flex-wrap gap-4 text-sm">
              {movie.Genre && (
                <div>
                  <span className="text-gray-400">Genre: </span>
                  <span className="text-white">{movie.Genre}</span>
                </div>
              )}
              {movie.Runtime && (
                <div>
                  <span className="text-gray-400">Runtime: </span>
                  <span className="text-white">{movie.Runtime}</span>
                </div>
              )}
              {movie.Released && (
                <div>
                  <span className="text-gray-400">Released: </span>
                  <span className="text-white">{movie.Released}</span>
                </div>
              )}
            </div>

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div>
                <h3 className="text-white font-semibold mb-2 text-lg">
                  Synopsis
                </h3>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Cast and Crew */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Directors</h4>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
              )}

              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Language</h4>
                  <p className="text-gray-300">{movie.Language}</p>
                </div>
              )}
            </div>

            {movie.Actors && movie.Actors !== "N/A" && (
              <div>
                <h4 className="text-white font-semibold mb-2">Cast</h4>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
            )}

            {/* Additional details */}
            {(movie.Country || movie.Awards) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-gray-700 pt-6">
                {movie.Country && movie.Country !== "N/A" && (
                  <div>
                    <span className="text-gray-400">Country: </span>
                    <span className="text-white">{movie.Country}</span>
                  </div>
                )}
                {movie.Awards && movie.Awards !== "N/A" && (
                  <div>
                    <span className="text-gray-400">Awards: </span>
                    <span className="text-white">{movie.Awards}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
