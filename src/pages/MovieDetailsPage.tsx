import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieStore } from "../store/movieStore";
import { LoadingSpinner } from "../components/movie/ui/LoadingSpinner";
import { ErrorState } from "../components/movie/ui/ErrorState";
import { MovieHeader } from "../components/movie/movieDetails/MovieHeader";
import { MovieHero } from "../components/movie/movieDetails/MovieHero";
import { CastCrew } from "../components/movie/movieDetails/CastCrew";
import { MovieInfo } from "../components/movie/movieDetails/MovieInfo";
import { ReviewsSection } from "../components/movie/movieDetails/ReviewsSection";

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
    return () => {
      clearMovieDetails();
    };
  }, [id, fetchMovieDetails, clearMovieDetails]);

  useEffect(() => {
    if (movieDetails && movieDetails.Response === "True") {
      addToRecentlyViewed(movieDetails);
    }
  }, [movieDetails, addToRecentlyViewed]);

  const handleGoBack = () => navigate("/");

  const handleWatchTrailer = () => {
    console.log("Watch trailer for:", movieDetails?.Title);
  };

  const handleAddToFavorites = () => {
    console.log("Add to favorites:", movieDetails?.Title);
  };

  const handleShare = () => {
    if (navigator.share && movieDetails) {
      navigator.share({
        title: movieDetails.Title,
        text: `Check out ${movieDetails.Title} (${movieDetails.Year})`,
        url: window.location.href,
      });
    }
  };

  if (detailsLoading) {
    return <LoadingSpinner message="Loading movie details..." />;
  }

  if (detailsError || !movieDetails || movieDetails.Response === "False") {
    const errorMessage =
      detailsError ||
      movieDetails?.Error ||
      "The movie you're looking for doesn't exist or has been removed.";

    return <ErrorState message={errorMessage} onGoBack={handleGoBack} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <MovieHeader onGoBack={handleGoBack} />

      <MovieHero
        movie={movieDetails}
        onWatchTrailer={handleWatchTrailer}
        onAddToFavorites={handleAddToFavorites}
        onShare={handleShare}
      />

      <div className="bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CastCrew
              director={movieDetails.Director}
              writer={movieDetails.Writer}
              actors={movieDetails.Actors}
            />
            <MovieInfo movie={movieDetails} />
          </div>
        </div>
      </div>

      <ReviewsSection reviews={movieReviews} loading={reviewsLoading} />
    </div>
  );
};

export default MovieDetailsPage;
