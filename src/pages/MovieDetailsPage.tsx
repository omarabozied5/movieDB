import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  Users,
  Globe,
  Award,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useMovieStore } from "../store/movieStore";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    movieDetails,
    movieReviews,
    detailsLoading,
    reviewsLoading,
    detailsError,
    fetchMovieDetails,
    clearMovieDetails,
    addToRecentlyViewed,
  } = useMovieStore();

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }

    // Cleanup on unmount
    return () => {
      clearMovieDetails();
    };
  }, [id, fetchMovieDetails, clearMovieDetails]);

  // Add to recently viewed when movie details are loaded
  useEffect(() => {
    if (movieDetails && movieDetails.Response === "True") {
      addToRecentlyViewed(movieDetails);
    }
  }, [movieDetails, addToRecentlyViewed]);

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-white">Loading movie details...</span>
        </div>
      </div>
    );
  }

  if (detailsError || !movieDetails || movieDetails.Response === "False") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">
            {detailsError || movieDetails?.Error || "Movie not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const movie = movieDetails;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </button>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
            <div className="flex flex-col lg:flex-row">
              <div className="relative z-20 p-8 lg:w-2/3">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {movie.Title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
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
                      <span>{movie.imdbRating}/10</span>
                    </div>
                  )}
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium capitalize">
                    {movie.Type}
                  </span>
                </div>

                {/* Genre */}
                {movie.Genre && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(", ").map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Plot
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                {/* Ratings */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Ratings
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {movie.Ratings.map((rating, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-3">
                          <div className="text-sm text-gray-400 mb-1">
                            {rating.Source}
                          </div>
                          <div className="text-lg font-semibold text-white">
                            {rating.Value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Poster */}
              <div className="lg:w-1/3 p-8 flex justify-center lg:justify-end">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/api/placeholder/400/600"
                  }
                  alt={movie.Title}
                  className="w-64 h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-8 border-t border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cast and Crew */}
              <div className="space-y-6">
                {movie.Director && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Director
                    </h3>
                    <p className="text-gray-300">{movie.Director}</p>
                  </div>
                )}

                {movie.Writer && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Writer
                    </h3>
                    <p className="text-gray-300">{movie.Writer}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Cast
                    </h3>
                    <p className="text-gray-300">{movie.Actors}</p>
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Additional Information
                </h3>

                {movie.Released && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Release Date:</span>
                    <span className="text-white">{movie.Released}</span>
                  </div>
                )}

                {movie.Language && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Language:
                    </span>
                    <span className="text-white">{movie.Language}</span>
                  </div>
                )}

                {movie.Country && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Country:</span>
                    <span className="text-white">{movie.Country}</span>
                  </div>
                )}

                {movie.Awards && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Awards:
                    </span>
                    <span className="text-white">{movie.Awards}</span>
                  </div>
                )}

                {movie.BoxOffice && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Box Office:</span>
                    <span className="text-white">{movie.BoxOffice}</span>
                  </div>
                )}

                {movie.Production && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Production:</span>
                    <span className="text-white">{movie.Production}</span>
                  </div>
                )}

                {movie.Website && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Website:</span>
                    <a
                      href={movie.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      Visit Site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {movie.Metascore && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Metascore:</span>
                    <span className="text-white">{movie.Metascore}/100</span>
                  </div>
                )}

                {movie.imdbVotes && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">IMDb Votes:</span>
                    <span className="text-white">{movie.imdbVotes}</span>
                  </div>
                )}

                {movie.DVD && (
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">DVD Release:</span>
                    <span className="text-white">{movie.DVD}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-8 border-t border-gray-700 bg-gray-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>

            {reviewsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-400">Loading reviews...</span>
              </div>
            ) : movieReviews && movieReviews.length > 0 ? (
              <div className="space-y-6">
                {movieReviews.map((review, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {review.headline}
                      </h3>
                      {review.critics_pick === 1 && (
                        <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">
                          Critics' Pick
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 mb-4">{review.summary_short}</p>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>By {review.byline}</span>
                      <span>
                        {new Date(review.publication_date).toLocaleDateString()}
                      </span>
                    </div>

                    {review.link && (
                      <a
                        href={review.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Read full review
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No reviews available for this movie.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
