/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import MovieDialog from "../components/movie/MovieDialoge";
import RecentlyViewed from "../components/common/RecentlyViewed";
import { useMovieStore } from "../store/movieStore";
import Header from "@/components/common/Header";
import ContentHeader from "@/components/common/ContentHeader";
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
    setType, // Add this action for tab switching
  } = useMovieStore();

  // Load popular content on component mount
  useEffect(() => {
    if (results.length === 0 && !loading && !error) {
      loadPopular();
    }
  }, [results.length, loading, error, loadPopular]);

  const handleMovieClick = (movie: any) => {
    selectMovie(movie);
  };

  const handleDialogClose = () => {
    closeDialog();
  };

  const handleMoreInfo = (movie: any) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleRecentlyViewedToggle = () => {
    toggleRecentlyViewed("combined");
  };

  const handleTabChange = (newType: "movie" | "series") => {
    if (setType) {
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
    if (isShowingPopular) {
      loadPopular();
    } else {
      search(true);
    }
  };

  const handleLoadPopular = () => {
    loadPopular();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header - Fixed positioning with proper spacing */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <Header />
      </header>

      {/* Main Content - Consistent container alignment */}
      <main className="max-w-7xl mx-auto px-4">
        {/* Recently Viewed Section - Same alignment as other sections */}
        {(recentlyViewed.movies.length > 0 ||
          recentlyViewed.series.length > 0) && (
          <section className="py-8 border-b border-gray-800/50">
            <RecentlyViewed
              movies={recentlyViewed.movies || []}
              series={recentlyViewed.series || []}
              title="Recently Viewed"
              isCollapsed={recentlyViewedCollapsed.combined || false}
              onToggle={handleRecentlyViewedToggle}
              onMovieClick={handleMovieClick}
            />
          </section>
        )}

        {/* Content Navigation Section */}
        <section className="py-6">
          {/* Tab Switcher with better spacing */}
          <div className="mb-8">
            <TabSwitcher
              activeTab={type}
              onTabChange={handleTabChange}
              isShowingPopular={isShowingPopular}
              query={query}
            />
          </div>

          {/* Content Header with consistent spacing */}
          <div className="mb-6">
            <ContentHeader
              resultsLength={results.length}
              loading={loading}
              isShowingPopular={isShowingPopular}
              type={type}
              query={query}
            />
          </div>
        </section>

        {/* Main Content Area */}
        <section className="pb-12">
          {/* Error State - Centered with proper spacing */}
          {error && (
            <div className="flex justify-center items-center min-h-[400px] py-12">
              <ErrorState error={error} onRetry={handleRetry} />
            </div>
          )}

          {/* Loading State - Centered with proper spacing */}
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

          {/* Movie Grid - Proper spacing and alignment */}
          {!error && (
            <div className="space-y-8">
              <MovieGrid
                movies={results}
                loading={loading}
                hasMore={hasMore && !isShowingPopular}
                onLoadMore={loadMore}
                onMovieClick={handleMovieClick}
              />
            </div>
          )}

          {/* Welcome Message - Centered when no content */}
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

      {/* Movie Dialog - Portal overlay */}
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
