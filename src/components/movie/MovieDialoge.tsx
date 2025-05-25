import React from "react";
import { X, Calendar, Clock, Star, Users, Info } from "lucide-react";
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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{movie.Title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/api/placeholder/400/600"
                }
                alt={movie.Title}
                className="w-64 h-96 object-cover rounded-lg mx-auto lg:mx-0"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              {/* Basic Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>
                {movie.Runtime && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
                {movie.imdbRating && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.imdbRating}</span>
                  </div>
                )}
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium capitalize">
                  {movie.Type}
                </span>
              </div>

              {/* Genre */}
              {movie.Genre && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Genre</h3>
                  <p className="text-gray-300">{movie.Genre}</p>
                </div>
              )}

              {/* Plot */}
              {movie.Plot && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              {/* Director */}
              {movie.Director && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Director</h3>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
              )}

              {/* Actors */}
              {movie.Actors && (
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Cast
                  </h3>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movie.Released && (
                  <div>
                    <span className="text-gray-400">Released:</span>
                    <span className="text-white ml-2">{movie.Released}</span>
                  </div>
                )}
                {movie.Language && (
                  <div>
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white ml-2">{movie.Language}</span>
                  </div>
                )}
                {movie.Country && (
                  <div>
                    <span className="text-gray-400">Country:</span>
                    <span className="text-white ml-2">{movie.Country}</span>
                  </div>
                )}
                {movie.Awards && (
                  <div>
                    <span className="text-gray-400">Awards:</span>
                    <span className="text-white ml-2">{movie.Awards}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleMoreInfo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
