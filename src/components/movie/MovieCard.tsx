import React from "react";
import { Calendar, Star, Play } from "lucide-react";
import type { MovieCardProps } from "../../types";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick(movie);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/api/placeholder/280/420";
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-blue-500/30"
    >
      {/* Aspect ratio container for responsive poster */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-2xl">
        {/* Movie Poster */}
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/280/420"
          }
          alt={movie.Title}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />

        {/* Glassmorphism overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[1px]" />

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Rating badge - top right */}
        <div className="absolute top-3 right-3 z-10">
          {movie.imdbRating ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-semibold">
                {movie.imdbRating}
              </span>
            </div>
          ) : (
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border border-white/20 shadow-lg">
              <span className="text-white text-sm font-medium capitalize">
                {movie.Type}
              </span>
            </div>
          )}
        </div>

        {/* Content overlay - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="font-bold text-lg sm:text-xl text-white leading-tight group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
              {movie.Title}
            </h3>

            {/* Metadata */}
            <div className="flex items-center justify-between text-gray-300 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{movie.Year}</span>
              </div>

              {movie.imdbRating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{movie.imdbRating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
