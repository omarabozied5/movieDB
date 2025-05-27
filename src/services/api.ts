/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type {
  OMDbSearchResponse,
  OMDbDetailResponse,
  NYTimesResponse,
} from "../types";

// API Configuration - Replace with your actual API keys
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "fd408829";
const NYTIMES_API_KEY =
  import.meta.env.VITE_NYTIMES_API_KEY || "QKvE9tLrwzGHxEyZYxzqHiN5uHsXvLzGY";

const OMDB_BASE_URL = "https://www.omdbapi.com/";
const NYTIMES_BASE_URL =
  "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

// Create axios instances with better error handling
const omdbApi = axios.create({
  baseURL: OMDB_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const nytimesApi = axios.create({
  baseURL: NYTIMES_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Popular content for initial load - using well-known titles
const POPULAR_CONTENT = {
  movie: [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Fight Club",
    "Forrest Gump",
    "Inception",
    "The Matrix",
    "Goodfellas",
    "The Lord of the Rings",
    "Star Wars",
    "Interstellar",
    "Parasite",
    "The Avengers",
    "Titanic",
  ],
  series: [
    "Breaking Bad",
    "Game of Thrones",
    "The Office",
    "Friends",
    "Stranger Things",
    "The Crown",
    "House of Cards",
    "Sherlock",
    "The Sopranos",
    "Lost",
    "The Wire",
    "Fargo",
    "True Detective",
    "Westworld",
    "Better Call Saul",
  ],
};

// Add request interceptors for better error handling
omdbApi.interceptors.request.use(
  (config) => {
    console.log(`Making OMDb API request: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("OMDb API request error:", error);
    return Promise.reject(error);
  }
);

omdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("OMDb API response error:", error);
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }
    throw error;
  }
);

nytimesApi.interceptors.request.use(
  (config) => {
    console.log(`Making NY Times API request: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("NY Times API request error:", error);
    return Promise.reject(error);
  }
);

nytimesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("NY Times API response error:", error);
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }
    throw error;
  }
);

/**
 * Search for movies or series using OMDb API
 */
export const searchMovies = async (
  query: string,
  type: "movie" | "series",
  page: number = 1
): Promise<OMDbSearchResponse> => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty");
  }

  try {
    const response = await omdbApi.get("", {
      params: {
        apikey: OMDB_API_KEY,
        s: query.trim(),
        type: type,
        page: page,
      },
    });

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OMDb API configuration."
        );
      }
      if (error.response?.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (error.response?.data?.Error) {
        throw new Error(error.response.data.Error);
      }
    }

    console.error("Error searching movies:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to search movies"
    );
  }
};

/**
 * Get detailed information about a movie/series by IMDb ID
 */
export const getMovieDetails = async (
  imdbId: string
): Promise<OMDbDetailResponse> => {
  if (!imdbId.trim()) {
    throw new Error("IMDb ID cannot be empty");
  }

  try {
    const response = await omdbApi.get("", {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbId.trim(),
        plot: "full",
      },
    });

    if (!response.data) {
      throw new Error("No data received from API");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OMDb API configuration."
        );
      }
      if (error.response?.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (error.response?.data?.Error) {
        throw new Error(error.response.data.Error);
      }
    }

    console.error("Error fetching movie details:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch movie details"
    );
  }
};

/**
 * Get popular movies/series for initial load
 */
export const getPopularMovies = async (
  type: "movie" | "series"
): Promise<OMDbSearchResponse> => {
  try {
    const titles = POPULAR_CONTENT[type];
    const randomTitles = [...titles]
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);

    // Fetch movies in parallel with error handling for individual requests
    const promises = randomTitles.map(async (title) => {
      try {
        const response = await omdbApi.get("", {
          params: {
            apikey: OMDB_API_KEY,
            t: title,
            type: type,
          },
        });

        return response.data?.Response === "True" ? response.data : null;
      } catch (error) {
        console.warn(`Failed to fetch ${title}:`, error);
        return null;
      }
    });

    const results = await Promise.allSettled(promises);
    const validResults = results
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled" && result.value !== null
      )
      .map((result) => result.value);

    if (validResults.length === 0) {
      return {
        Search: [],
        totalResults: "0",
        Response: "False",
        Error: "No popular content available",
      };
    }

    return {
      Search: validResults,
      totalResults: validResults.length.toString(),
      Response: "True",
    };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch popular movies"
    );
  }
};

/**
 * Get movie reviews from NY Times API
 */
export const getMovieReviews = async (
  movieTitle: string
): Promise<NYTimesResponse> => {
  if (!movieTitle.trim()) {
    throw new Error("Movie title cannot be empty");
  }

  try {
    const response = await nytimesApi.get("", {
      params: {
        "api-key": NYTIMES_API_KEY,
        query: movieTitle.trim(),
        order: "by-publication-date",
      },
    });

    if (!response.data) {
      throw new Error("No data received from NY Times API");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          "Invalid NY Times API key. Please check your configuration."
        );
      }
      if (error.response?.status === 429) {
        throw new Error(
          "NY Times API rate limit exceeded. Please try again later."
        );
      }
      if (error.response?.status === 404) {
        return {
          status: "OK",
          copyright: "",
          has_more: false,
          num_results: 0,
          results: [],
        };
      }
    }

    console.error("Error fetching movie reviews:", error);

    return {
      status: "OK",
      copyright: "",
      has_more: false,
      num_results: 0,
      results: [],
    };
  }
};

/**
 * Health check for API connectivity
 */
export const checkApiHealth = async (): Promise<{
  omdb: boolean;
  nytimes: boolean;
}> => {
  const results = {
    omdb: false,
    nytimes: false,
  };

  // Test OMDb API
  try {
    await omdbApi.get("", {
      params: {
        apikey: OMDB_API_KEY,
        t: "Inception",
      },
      timeout: 5000,
    });
    results.omdb = true;
  } catch (error) {
    console.warn("OMDb API health check failed:", error);
  }

  // Test NY Times API
  try {
    await nytimesApi.get("", {
      params: {
        "api-key": NYTIMES_API_KEY,
        query: "Inception",
      },
      timeout: 5000,
    });
    results.nytimes = true;
  } catch (error) {
    console.warn("NY Times API health check failed:", error);
  }

  return results;
};
