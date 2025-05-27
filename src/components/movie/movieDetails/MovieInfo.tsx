import React from "react";
import { Calendar, Globe, Award, ExternalLink } from "lucide-react";
import { MovieDetails } from "../../../types/index";

interface MovieInfoProps {
  movie: MovieDetails;
}

const movieInfoItems = (movie: MovieDetails) => [
  { label: "Release Date", value: movie.Released, icon: Calendar },
  { label: "Language", value: movie.Language, icon: Globe },
  { label: "Country", value: movie.Country, icon: Globe },
  { label: "Awards", value: movie.Awards, icon: Award },
  { label: "Box Office", value: movie.BoxOffice },
  { label: "Production", value: movie.Production },
  {
    label: "Metascore",
    value: movie.Metascore ? `${movie.Metascore}/100` : null,
  },
  { label: "IMDb Votes", value: movie.imdbVotes },
  { label: "DVD Release", value: movie.DVD },
];

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-800">
      Movie Details
    </h2>
    <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800 space-y-4">
      {movieInfoItems(movie).map((item, index) => {
        if (!item.value || item.value === "N/A") return null;
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b border-gray-800 last:border-b-0"
          >
            <span className="text-gray-400 flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {item.label}:
            </span>
            <span className="text-white font-medium text-right max-w-xs">
              {item.value}
            </span>
          </div>
        );
      })}
      {movie.Website && (
        <div className="flex justify-between items-center py-3">
          <span className="text-gray-400">Website:</span>
          <a
            href={movie.Website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-medium"
          >
            Visit Site
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  </div>
);
export default MovieInfo;
