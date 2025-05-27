import React from "react";

interface MoviePosterProps {
  poster: string;
  title: string;
  className?: string;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({
  poster,
  title,
  className = "",
}) => (
  <div className={`flex-shrink-0 mx-auto lg:mx-0 ${className}`}>
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
      <img
        src={poster !== "N/A" ? poster : "/api/placeholder/400/600"}
        alt={title}
        className="relative w-80 h-[480px] object-cover rounded-xl shadow-2xl border border-gray-800"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </div>
);

export default MoviePoster;
