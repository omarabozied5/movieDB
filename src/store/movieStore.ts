import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  Movie,
  SearchState,
  RecentlyViewed,
  NYTimesReview,
  OMDbDetailResponse, // Add this import
} from "../types";
import {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getMovieReviews,
} from "../services/api";

interface MovieStore extends SearchState {
  // Recently viewed
  recentlyViewed: RecentlyViewed;
  recentlyViewedCollapsed: {
    movies: boolean;
    series: boolean;
  };

  // Selected movie for details
  selectedMovie: Movie | null;
  isDialogOpen: boolean;

  // Movie details state - Change this type
  movieDetails: OMDbDetailResponse | null;
  movieReviews: NYTimesReview[];
  detailsLoading: boolean;
  reviewsLoading: boolean;
  detailsError: string | null;

  // UI state
  isShowingPopular: boolean;

  // Actions
  setQuery: (query: string) => void;
  setType: (type: "movie" | "series") => void;
  search: (newSearch?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  loadPopular: () => Promise<void>;

  // Movie actions
  selectMovie: (movie: Movie) => void;
  closeDialog: () => void;
  addToRecentlyViewed: (movie: Movie) => void;
  toggleRecentlyViewed: (type: "movies" | "series") => void;

  // Movie details actions
  fetchMovieDetails: (imdbId: string) => Promise<void>;
  clearMovieDetails: () => void;

  // Reset actions
  reset: () => void;
}

const initialState = {
  query: "",
  type: "movie" as const,
  page: 1,
  results: [],
  totalResults: 0,
  loading: false,
  hasMore: false,
  error: null,
  recentlyViewed: {
    movies: [],
    series: [],
  },
  recentlyViewedCollapsed: {
    movies: false,
    series: false,
  },
  selectedMovie: null,
  isDialogOpen: false,
  movieDetails: null,
  movieReviews: [],
  detailsLoading: false,
  reviewsLoading: false,
  detailsError: null,
  isShowingPopular: true,
};

export const useMovieStore = create<MovieStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setQuery: (query: string) => {
          set({ query });

          // If query becomes empty, show popular content
          if (!query.trim()) {
            set({
              isShowingPopular: true,
              page: 1,
              results: [],
              totalResults: 0,
              hasMore: false,
              error: null,
            });
            get().loadPopular();
          }
        },

        setType: (type: "movie" | "series") => {
          set({
            type,
            page: 1,
            results: [],
            totalResults: 0,
            hasMore: false,
            error: null,
          });

          // If no search query, show popular content for new tab
          if (!get().query.trim()) {
            set({ isShowingPopular: true });
            get().loadPopular();
          }
        },

        search: async (newSearch = false) => {
          const { query, type, page } = get();

          if (!query.trim()) {
            set({ isShowingPopular: true });
            return get().loadPopular();
          }

          // Switch to search mode
          set({ isShowingPopular: false });

          try {
            set({
              loading: true,
              error: null,
              ...(newSearch && { page: 1, results: [] }),
            });

            const searchPage = newSearch ? 1 : page;
            const response = await searchMovies(query, type, searchPage);

            if (response.Response === "True") {
              const currentResults = newSearch ? [] : get().results;
              set({
                results: [...currentResults, ...response.Search],
                totalResults: parseInt(response.totalResults),
                hasMore: searchPage * 10 < parseInt(response.totalResults),
                page: searchPage + 1,
                loading: false,
                error: null,
              });
            } else {
              set({
                error: response.Error || "No results found",
                loading: false,
                hasMore: false,
                results: newSearch ? [] : get().results,
              });
            }
          } catch (error) {
            console.error("Search error:", error);
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to search movies. Please check your connection and try again.",
              loading: false,
              hasMore: false,
            });
          }
        },

        loadMore: async () => {
          const { loading, hasMore, isShowingPopular } = get();
          if (!loading && hasMore && !isShowingPopular) {
            await get().search(false);
          }
        },

        loadPopular: async () => {
          const { type } = get();

          try {
            set({
              loading: true,
              error: null,
            });

            const response = await getPopularMovies(type);

            if (response.Response === "True") {
              set({
                results: response.Search,
                totalResults: parseInt(response.totalResults),
                loading: false,
                hasMore: false, // Popular content doesn't have "load more"
                error: null,
              });
            } else {
              set({
                error: response.Error || "Failed to load popular content",
                loading: false,
                hasMore: false,
              });
            }
          } catch (error) {
            console.error("Error loading popular content:", error);
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to load popular content. Please try again.",
              loading: false,
              hasMore: false,
            });
          }
        },

        selectMovie: (movie: Movie) => {
          set({
            selectedMovie: movie,
            isDialogOpen: true,
          });
          get().addToRecentlyViewed(movie);
        },

        closeDialog: () => {
          set({
            isDialogOpen: false,
            selectedMovie: null,
          });
        },

        // Then in your store implementation:
        addToRecentlyViewed: (movie: Movie) => {
          set((state) => {
            const list = movie.Type === "movie" ? "movies" : "series";
            const existingIndex = state.recentlyViewed[list].findIndex(
              (item) => item.imdbID === movie.imdbID
            );

            const newItems = [...state.recentlyViewed[list]];
            const movieWithTimestamp = {
              ...movie,
              lastViewed: new Date().toISOString(),
            };

            if (existingIndex >= 0) {
              newItems[existingIndex] = movieWithTimestamp;
            } else {
              newItems.unshift(movieWithTimestamp);
            }

            return {
              recentlyViewed: {
                ...state.recentlyViewed,
                [list]: newItems.slice(0, 10), // Keep only 10 per type
              },
            };
          });
        },

        toggleRecentlyViewed: (type: "movies" | "series") => {
          const { recentlyViewedCollapsed } = get();
          set({
            recentlyViewedCollapsed: {
              ...recentlyViewedCollapsed,
              [type]: !recentlyViewedCollapsed[type],
            },
          });
        },

        fetchMovieDetails: async (imdbId: string) => {
          try {
            set({
              detailsLoading: true,
              detailsError: null,
              movieDetails: null,
              movieReviews: [],
            });

            // Fetch movie details
            const movieData = await getMovieDetails(imdbId);

            if (movieData.Response === "True") {
              set({
                movieDetails: movieData, // This now correctly stores OMDbDetailResponse
                detailsLoading: false,
              });

              // Fetch reviews in parallel
              set({ reviewsLoading: true });
              try {
                const reviewsData = await getMovieReviews(movieData.Title);
                set({
                  movieReviews: reviewsData.results || [],
                  reviewsLoading: false,
                });
              } catch (reviewError) {
                console.error("Failed to fetch reviews:", reviewError);
                set({
                  movieReviews: [],
                  reviewsLoading: false,
                });
              }
            } else {
              set({
                detailsError: movieData.Error || "Movie not found",
                detailsLoading: false,
              });
            }
          } catch (error) {
            console.error("Error fetching movie details:", error);
            set({
              detailsError:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch movie details. Please check your connection and try again.",
              detailsLoading: false,
            });
          }
        },

        clearMovieDetails: () => {
          set({
            movieDetails: null,
            movieReviews: [],
            detailsLoading: false,
            reviewsLoading: false,
            detailsError: null,
          });
        },

        reset: () => {
          set({
            ...initialState,
            // Keep recently viewed data even on reset
            recentlyViewed: get().recentlyViewed,
            recentlyViewedCollapsed: get().recentlyViewedCollapsed,
          });
        },
      }),
      {
        name: "movie-store",
        partialize: (state) => ({
          recentlyViewed: state.recentlyViewed,
          recentlyViewedCollapsed: state.recentlyViewedCollapsed,
        }),
      }
    ),
    {
      name: "movie-store",
    }
  )
);
