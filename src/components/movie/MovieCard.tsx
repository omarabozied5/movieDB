import React from "react";
import { Star } from "lucide-react";
import type { MovieCardProps } from "../../types";

// Extend the props to include showTitle option
interface ExtendedMovieCardProps extends MovieCardProps {
  showTitle?: boolean;
}

const MovieCard: React.FC<ExtendedMovieCardProps> = ({
  movie,
  onClick,
  isSelected,
  showTitle = true, // Default to true to show title
}) => {
  const handleClick = () => {
    onClick(movie);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/api/placeholder/280/420";
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-105 ${
        isSelected ? "ring-2" : ""
      }`}
      style={{
        borderColor: isSelected ? "#FFD600" : "transparent",
      }}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-800">
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/280/420"
          }
          alt={movie.Title}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

        <div className="absolute top-2 left-2 z-10">
          {movie.imdbRating ? (
            <div
              className="flex items-center gap-1 px-2 py-1 backdrop-blur-sm rounded-md text-xs font-semibold"
              style={{ backgroundColor: "#FFD600", color: "#000000" }}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.imdbRating}</span>
            </div>
          ) : (
            <div
              className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs font-medium uppercase tracking-wider"
              style={{ color: "#FFD600" }}
            >
              <span>{movie.Type}</span>
            </div>
          )}
        </div>

        {/* Conditionally show title based on showTitle prop */}
        {showTitle && (
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h2
              className={`font-semibold text-white mb-12 text-sm leading-tight line-clamp-2 text-center transition-colors ${
                isSelected ? "" : "group-hover:text-yellow-300"
              }`}
              style={isSelected ? { color: "#FFD600" } : {}}
            >
              {movie.Title}
            </h2>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isSelected && (
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundColor: "rgba(255, 214, 0, 0.2)",
              border: "2px solid #FFD600",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
