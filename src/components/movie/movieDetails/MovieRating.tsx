import React from "react";
import { MovieRating } from "../../../types/index";

interface MovieRatingsProps {
  ratings: MovieRating[];
}

export const MovieRatings: React.FC<MovieRatingsProps> = ({ ratings }) => {
  if (!ratings?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Ratings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className="bg-gray-900/80 rounded-xl p-4 border border-gray-700 hover:border-primary/30 transition-colors duration-200"
          >
            <div className="text-sm text-gray-400 mb-2">{rating.Source}</div>
            <div className="text-2xl font-bold text-primary">
              {rating.Value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRatings;
