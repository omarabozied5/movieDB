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

  const {
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

  useEffect(() => {
    if (results.length === 0 && !loading && !error) {
      loadPopular();
    }
  }, [results.length, loading, error, loadPopular]);

  const handleMovieClick = (movie: any) => {
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
    closeDialog();
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleRecentlyViewedToggle = () => {
    toggleRecentlyViewed("combined");
  };

  const handleTabChange = (newType: "movie" | "series") => {
    if (setType) {
      closeDialog();
      setType(newType);

      if (query) {
        search(true);
      } else {
        loadPopular();
      }
    }
  };

  const handleRetry = () => {
    closeDialog();
    if (isShowingPopular) {
      loadPopular();
    } else {
      search(true);
    }
  };

  const handleLoadPopular = () => {
    closeDialog();
    loadPopular();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#000000" }}>
      <Header />

      <main className="max-w-7xl mx-auto pt-24">
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

        <div style={{ borderColor: "rgba(255, 214, 0, 0.2)" }}>
          <TabSwitcher
            activeTab={type}
            onTabChange={handleTabChange}
            isShowingPopular={isShowingPopular}
            query={query}
          />
        </div>

        <section className="px-6">
          {error && <ErrorState error={error} onRetry={handleRetry} />}

          <LoadingState
            loading={loading}
            resultsLength={results.length}
            isShowingPopular={isShowingPopular}
            type={type}
          />

          <ContentHeader
            resultsLength={results.length}
            loading={loading}
            isShowingPopular={isShowingPopular}
            type={type}
            query={query}
          />

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
