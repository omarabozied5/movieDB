/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import RecentlyViewed from "../components/common/RecentlyViewed";
import { useMovieStore } from "../store/movieStore";
import Header from "@/components/common/Header";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import WelcomeMessage from "@/components/common/WelcomeMessage";
import TabSwitcher from "@/components/common/TabSwitcher";

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
    search,
    loadMore,
    loadPopular,
    selectMovie,
    closeDialog,
    toggleRecentlyViewed,
    setType,
  } = useMovieStore();

  // Load popular content on component mount
  useEffect(() => {
    if (results.length === 0 && !loading && !error) {
      loadPopular();
    }
  }, [results.length, loading, error, loadPopular]);

  const handleMovieClick = (movie: any) => {
    // Toggle selection - if same movie is clicked, close dropdown
    if (selectedMovie?.imdbID === movie.imdbID && isDialogOpen) {
      closeDialog();
    } else {
      selectMovie(movie);
    }
  };

  const handleDialogClose = () => {
    closeDialog();
  };

  const handleMoreInfo = (movie: any) => {
    closeDialog(); // Close the dropdown first
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleRecentlyViewedToggle = () => {
    toggleRecentlyViewed("combined");
  };

  const handleTabChange = (newType: "movie" | "series") => {
    if (setType) {
      closeDialog(); // Close any open dropdown when switching tabs
      setType(newType);
      // Reload content when tab changes
      if (query) {
        search(true); // Reset search with new type
      } else {
        loadPopular(); // Load popular content for new type
      }
    }
  };

  const handleRetry = () => {
    closeDialog(); // Close dropdown on retry
    if (isShowingPopular) {
      loadPopular();
    } else {
      search(true);
    }
  };

  const handleLoadPopular = () => {
    closeDialog(); // Close dropdown when loading popular
    loadPopular();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header - Fixed positioning */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-800">
        <Header />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Recently Viewed Section */}
        {(recentlyViewed.movies.length > 0 ||
          recentlyViewed.series.length > 0) && (
          <section className="border-b border-gray-800/50">
            <RecentlyViewed
              movies={recentlyViewed.movies || []}
              series={recentlyViewed.series || []}
              title="Recently Viewed shows"
              isCollapsed={recentlyViewedCollapsed.combined || false}
              onToggle={handleRecentlyViewedToggle}
              onMovieClick={handleMovieClick}
            />
          </section>
        )}

        {/* Tab Navigation */}
        <TabSwitcher
          activeTab={type}
          onTabChange={handleTabChange}
          isShowingPopular={isShowingPopular}
          query={query}
        />

        {/* Content Section */}
        <section className="min-h-screen">
          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center min-h-[400px] py-12">
              <ErrorState error={error} onRetry={handleRetry} />
            </div>
          )}

          {/* Loading State */}
          {loading && results.length === 0 && (
            <div className="flex justify-center items-center min-h-[400px] py-12">
              <LoadingState
                loading={loading}
                resultsLength={results.length}
                isShowingPopular={isShowingPopular}
                type={type}
              />
            </div>
          )}

          {/* Movie Grid with Dropdown Dialog */}
          {!error && (
            <MovieGrid
              movies={results}
              loading={loading}
              hasMore={hasMore && !isShowingPopular}
              onLoadMore={loadMore}
              onMovieClick={handleMovieClick}
              selectedMovie={selectedMovie}
              isDialogOpen={isDialogOpen}
              onDialogClose={handleDialogClose}
              onMoreInfo={handleMoreInfo}
            />
          )}

          {/* Welcome Message */}
          {!loading && results.length === 0 && !error && (
            <div className="flex justify-center items-center min-h-[400px] py-12">
              <WelcomeMessage
                resultsLength={results.length}
                loading={loading}
                error={error}
                onLoadPopular={handleLoadPopular}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
