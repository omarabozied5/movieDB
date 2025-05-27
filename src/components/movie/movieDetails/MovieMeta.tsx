import React from "react";
import { Calendar, Clock, Star } from "lucide-react";

interface MovieMetaProps {
  year: string;
  runtime?: string;
  imdbRating?: string;
  type: string;
}

export const MovieMeta: React.FC<MovieMetaProps> = ({
  year,
  runtime,
  imdbRating,
  type,
}) => (
  <div className="flex flex-wrap gap-4">
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 rounded-full border border-gray-700">
      <Calendar className="w-4 h-4 text-primary" />
      <span className="text-white font-medium">{year}</span>
    </div>
    {runtime && (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 rounded-full border border-gray-700">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-white font-medium">{runtime}</span>
      </div>
    )}
    {imdbRating && (
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/30">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span className="text-white font-bold">{imdbRating}/10</span>
      </div>
    )}
    <div className="px-4 py-2 bg-primary text-black rounded-full font-bold text-sm uppercase tracking-wide">
      {type}
    </div>
  </div>
);

export default MovieMeta;
