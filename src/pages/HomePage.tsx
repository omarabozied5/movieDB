/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import RecentlyViewed from "../components/common/RecentlyViewed";
import { useMovieStore } from "../store/movieStore";
import Header from "../components/common/Header";
import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";
import WelcomeMessage from "../components/common/WelcomeMessage";
import TabSwitcher from "../components/common/TabSwitcher";
import ContentHeader from "../components/common/ContentHeader";

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
    <div className="min-h-screen" style={{ backgroundColor: "#000000" }}>
      {/* Fixed Header */}
      <Header />

      {/* Main Content with top padding to account for fixed header */}
      <main className="max-w-7xl mx-auto pt-24">
        {/* Recently Viewed Section */}
        {(recentlyViewed.movies.length > 0 ||
          recentlyViewed.series.length > 0) && (
          <section>
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
        <div style={{ borderColor: "rgba(255, 214, 0, 0.2)" }}>
          <TabSwitcher
            activeTab={type}
            onTabChange={handleTabChange}
            isShowingPopular={isShowingPopular}
            query={query}
          />
        </div>

        {/* Content Section */}
        <section className="px-6">
          {/* Error State */}
          {error && <ErrorState error={error} onRetry={handleRetry} />}

          {/* Loading State */}
          <LoadingState
            loading={loading}
            resultsLength={results.length}
            isShowingPopular={isShowingPopular}
            type={type}
          />

          {/* Content Header - Shows title and results count */}
          <ContentHeader
            resultsLength={results.length}
            loading={loading}
            isShowingPopular={isShowingPopular}
            type={type}
            query={query}
          />

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
          <WelcomeMessage
            resultsLength={results.length}
            loading={loading}
            error={error}
            onLoadPopular={handleLoadPopular}
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
