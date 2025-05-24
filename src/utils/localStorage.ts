import type { Movie, RecentlyViewed } from "../types";

const RECENTLY_VIEWED_KEY = "moviesdb_recently_viewed";
const MAX_RECENT_ITEMS = 10;

export const getRecentlyViewed = (): RecentlyViewed => {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return {
    movies: [],
    series: [],
  };
};

export const addToRecentlyViewed = (movie: Movie): void => {
  try {
    const current = getRecentlyViewed();
    const category = movie.Type === "movie" ? "movies" : "series";

    // Remove if already exists
    const filtered = current[category].filter(
      (item) => item.imdbID !== movie.imdbID
    );

    // Add to beginning
    current[category] = [movie, ...filtered].slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(current));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const clearRecentlyViewed = (): void => {
  try {
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
