import React from "react";
import { MovieDetails } from "../../../types/index";
import { MoviePoster } from "./MoviePoster";
import { MovieMeta } from "./MovieMeta";
import { GenreTags } from "./GenreTags";
import { ActionButtons } from "./ActoinButtons";
import { MovieRatings } from "./MovieRating";

interface MovieHeroProps {
  movie: MovieDetails;
  onWatchTrailer?: () => void;
  onAddToFavorites?: () => void;
  onShare?: () => void;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  onWatchTrailer,
  onAddToFavorites,
  onShare,
}) => (
  <div className="relative">
    {/* Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20"></div>
      {movie.Poster !== "N/A" && (
        <img
          src={movie.Poster}
          alt=""
          className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
        />
      )}
    </div>

    <div className="relative z-30 max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <MoviePoster poster={movie.Poster} title={movie.Title} />

        <div className="flex-1 space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-3xl font-bold text-white leading-tight">
              {movie.Title}
            </h1>

            <MovieMeta
              year={movie.Year}
              runtime={movie.Runtime}
              imdbRating={movie.imdbRating}
              type={movie.Type}
            />

            {movie.Genre && <GenreTags genres={movie.Genre} />}
          </div>

          <ActionButtons
            onWatchTrailer={onWatchTrailer}
            onAddToFavorites={onAddToFavorites}
            onShare={onShare}
          />

          {movie.Plot && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Plot</h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                {movie.Plot}
              </p>
            </div>
          )}

          {movie.Ratings && <MovieRatings ratings={movie.Ratings} />}
        </div>
      </div>
    </div>
  </div>
);

export default MovieHero;
