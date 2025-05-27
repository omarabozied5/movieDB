import React from "react";

interface GenreTagsProps {
  genres: string;
}

export const GenreTags: React.FC<GenreTagsProps> = ({ genres }) => (
  <div className="flex flex-wrap gap-2">
    {genres.split(", ").map((genre, index) => (
      <span
        key={index}
        className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-md border border-gray-700 hover:border-primary/50 transition-colors duration-200"
      >
        {genre}
      </span>
    ))}
  </div>
);

export default GenreTags;
