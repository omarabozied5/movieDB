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
          block: "center",
          inline: "nearest",
        });
      }, 100);
    }
  }, [isDialogOpen, selectedMovie]);

  if (movies.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
        <span className="ml-2 text-gray-400">Loading...</span>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No results found. Try a different search term.
        </p>
      </div>
    );
  }

  const selectedMovieIndex = selectedMovie
    ? movies.findIndex((movie) => movie.imdbID === selectedMovie.imdbID)
    : -1;

  const columnsPerRow = 5;
  const selectedRowEnd =
    selectedMovieIndex >= 0
      ? Math.floor(selectedMovieIndex / columnsPerRow) * columnsPerRow +
        columnsPerRow -
        1
      : -1;

  return (
    <div className="px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <React.Fragment key={movie.imdbID}>
            <MovieCard
              movie={movie}
              onClick={onMovieClick}
              isSelected={selectedMovie?.imdbID === movie.imdbID}
            />

            {isDialogOpen && selectedMovie && index === selectedRowEnd && (
              <div ref={dialogRef} className="col-span-full scroll-mt-4 mb-12">
                <MovieDialog
                  movie={selectedMovie}
                  isOpen={isDialogOpen}
                  onClose={onDialogClose}
                  onMoreInfo={onMoreInfo}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
              <span className="ml-2 text-gray-400">Loading more...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No more results to load</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
