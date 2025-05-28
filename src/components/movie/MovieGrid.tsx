import React from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import MovieCard from "./MovieCard";
import MovieDialog from "./MovieDialoge";
import { Movie } from "../../types";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onMovieClick: (movie: Movie) => void;
  selectedMovie?: Movie | null;
  isDialogOpen: boolean;
  onDialogClose: () => void;
  onMoreInfo: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  hasMore,
  onLoadMore,
  onMovieClick,
  selectedMovie,
  isDialogOpen,
  onDialogClose,
  onMoreInfo,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Responsive column calculation
  const getColumnsPerRow = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 2; // mobile
      if (width < 768) return 3; // sm
      if (width < 1024) return 4; // md
      return 5; // lg and above
    }
    return 5;
  }, []);

  const [columnsPerRow, setColumnsPerRow] = React.useState(getColumnsPerRow());

  React.useEffect(() => {
    const handleResize = () => {
      const newColumnsPerRow = getColumnsPerRow();
      setColumnsPerRow(newColumnsPerRow);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getColumnsPerRow]);

  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  React.useEffect(() => {
    if (isDialogOpen && selectedMovie && dialogRef.current) {
      setTimeout(() => {
        dialogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: isMobile ? "start" : "center",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isDialogOpen, selectedMovie, isMobile]);

  if (movies.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-yellow-400" />
        <span className="ml-2 text-gray-400 text-sm sm:text-base">
          Loading...
        </span>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-400 text-base sm:text-lg">
          No results found. Try a different search term.
        </p>
      </div>
    );
  }

  const selectedMovieIndex = selectedMovie
    ? movies.findIndex((movie) => movie.imdbID === selectedMovie.imdbID)
    : -1;

  const selectedMovieRow =
    selectedMovieIndex >= 0
      ? Math.floor(selectedMovieIndex / columnsPerRow)
      : -1;

  const rowEndIndex =
    selectedMovieRow >= 0
      ? Math.min((selectedMovieRow + 1) * columnsPerRow - 1, movies.length - 1)
      : -1;

  return (
    <div className="px-3 sm:px-4 lg:px-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
        {movies.map((movie, index) => (
          <React.Fragment key={movie.imdbID}>
            <MovieCard
              movie={movie}
              onClick={onMovieClick}
              isSelected={selectedMovie?.imdbID === movie.imdbID}
            />

            {/* Dialog positioned at end of row */}
            {isDialogOpen && selectedMovie && index === rowEndIndex && (
              <div
                ref={dialogRef}
                className="col-span-full mt-2 sm:mt-4 scroll-mt-4 mb-8 sm:mb-12 lg:mb-16"
              >
                <MovieDialog
                  movie={selectedMovie}
                  isOpen={isDialogOpen}
                  onClose={onDialogClose}
                  onMoreInfo={onMoreInfo}
                  selectedMovieIndex={selectedMovieIndex}
                  columnsPerRow={columnsPerRow}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Load More Section */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-6 sm:py-8">
          {loading && (
            <div className="flex items-center">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-yellow-400" />
              <span className="ml-2 text-gray-400 text-sm sm:text-base">
                Loading more...
              </span>
            </div>
          )}
        </div>
      )}

      {/* End of Results */}
      {!hasMore && movies.length > 0 && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-gray-400 text-sm sm:text-base">
            No more results to load
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
