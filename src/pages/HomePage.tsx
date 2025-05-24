/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import TabSwitcher from "../components/TabSwitcher";
import MovieGrid from "../components/MovieGrid";
import MovieDialog from "../components/MovieDialoge";
import RecentlyViewed from "../components/RecentlyViewed";
import { useMovieStore } from "../store/movieStore";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Zustand store
  const {
    // State
    query,
    type,
    results,
    loading,
    hasMore,
    error,
    recentlyViewed,
    recentlyViewedCollapsed,
    selectedMovie,
    isDialogOpen,
    isShowingPopular,

    // Actions
    setQuery,
    setType,
    search,
    loadMore,
    loadPopular,
    selectMovie,
    closeDialog,
    toggleRecentlyViewed,
  } = useMovieStore();

  // Load popular content on component mount
  useEffect(() => {
    if (results.length === 0 && !loading && !error) {
      loadPopular();
    }
  }, []);

  // Handle search with debouncing
  const handleSearch = () => {
    search(true);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleTabChange = (newType: "movie" | "series") => {
    setType(newType);
  };

  const handleMovieClick = (movie: any) => {
    selectMovie(movie);
  };

  const handleDialogClose = () => {
    closeDialog();
  };

  const handleMoreInfo = (movie: any) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleRecentlyViewedToggle = (toggleType: "movies" | "series") => {
    toggleRecentlyViewed(toggleType);
  };

  const handleRetry = () => {
    if (isShowingPopular) {
      loadPopular();
    } else {
      search(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-primary shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            MoviesDB
          </h1>
          <SearchBar
            query={query}
            onQueryChange={handleQueryChange}
            onSearch={handleSearch}
          />
          <TabSwitcher activeTab={type} onTabChange={handleTabChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Recently Viewed */}
        <RecentlyViewed
          movies={recentlyViewed.movies}
          series={recentlyViewed.series}
          title="Recently Viewed"
          isCollapsed={recentlyViewedCollapsed.combined}
          onToggle={() => handleRecentlyViewedToggle("combined")}
          onMovieClick={handleMovieClick}
        />

        {/* Content Header */}
        {results.length > 0 && !loading && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">
              {isShowingPopular
                ? `Popular ${type === "movie" ? "Movies" : "Series"}`
                : `Search Results for "${query}"`}
            </h2>
            {!isShowingPopular && (
              <p className="text-gray-400 mt-1">
                Found {results.length} results
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State for Initial Load */}
        {loading && results.length === 0 && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-400 ml-3">
                {isShowingPopular
                  ? `Loading popular ${
                      type === "movie" ? "movies" : "series"
                    }...`
                  : "Searching..."}
              </p>
            </div>
          </div>
        )}

        {/* Movie Grid */}
        {!error && (
          <MovieGrid
            movies={results}
            loading={loading}
            hasMore={hasMore && !isShowingPopular}
            onLoadMore={loadMore}
            onMovieClick={handleMovieClick}
          />
        )}

        {/* Welcome Message */}
        {results.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome to MoviesDB
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Discover your favorite movies and series. Search above or browse
                our popular content.
              </p>
              <button
                onClick={loadPopular}
                className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Load Popular Content
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Movie Dialog */}
      <MovieDialog
        movie={selectedMovie}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onMoreInfo={handleMoreInfo}
      />
    </div>
  );
};

export default HomePage;
