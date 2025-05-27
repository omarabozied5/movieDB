// Movie and Series Types
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: "movie" | "series";
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  Genre?: string;
  imdbRating?: string;
  Released?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Writer?: string;
  Production?: string;
  Website?: string;
  BoxOffice?: string;
  Metascore?: string;
  imdbVotes?: string;
  DVD?: string;
  Ratings?: Rating[];
  lastViewed?: string; // Add this for recently viewed timestamp
}
export interface MovieRating {
  Source: string;
  Value: string;
}

export interface MovieReview {
  headline: string;
  summary_short: string;
  byline: string;
  publication_date: string;
  critics_pick: number;
  link?: {
    url: string;
  };
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  Ratings?: MovieRating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
  Released?: string;
}
export interface Rating {
  Source: string;
  Value: string;
}

export interface OMDbSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface OMDbDetailResponse extends Movie {
  Response: string;
  Error?: string;
}

// NY Times Types
export interface NYTimesReview {
  display_title: string;
  mpaa_rating: string;
  critics_pick: number;
  byline: string;
  headline: string;
  summary_short: string;
  publication_date: string;
  opening_date: string;
  date_updated: string;
  link: {
    type: string;
    url: string;
    suggested_link_text: string;
  };
  multimedia?: {
    type: string;
    src: string;
    height: number;
    width: number;
    credit?: string;
  };
}

export interface NYTimesResponse {
  status: string;
  copyright: string;
  has_more: boolean;
  num_results: number;
  results: NYTimesReview[];
}

// App State Types
export interface SearchState {
  query: string;
  type: "movie" | "series";
  page: number;
  results: Movie[];
  totalResults: number;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
}

export interface RecentlyViewed {
  movies: Movie[];
  series: Movie[];
  combined?: boolean; // For collapsed state
}

// Component Props Types with Size Support
export interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isSelected?: boolean;
  size?: "small" | "medium" | "large";
  showTitle?: boolean;
}

export interface MovieDialogProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onMoreInfo: (movie: Movie) => void;
}

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
}

export interface TabSwitcherProps {
  activeTab: "movie" | "series";
  onTabChange: (tab: "movie" | "series") => void;
  isShowingPopular: boolean;
  query: string;
}

// Recently Viewed types
export interface RecentlyViewedItem extends Movie {
  type: "movie" | "series";
  viewedAt?: string;
}

export interface RecentlyViewedProps {
  movies: Movie[];
  series: Movie[];
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onMovieClick: (movie: Movie) => void;
}

export interface RecentlyViewedState {
  movies: Movie[];
  series: Movie[];
  combined: boolean; // For collapsed state
}

// Enhanced Movie Grid Props
export interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onMovieClick: (movie: Movie) => void;
  selectedMovie?: Movie | null;
  isDialogOpen: boolean;
  onDialogClose: () => void;
  onMoreInfo: (movie: Movie) => void;
  isShowingPopular?: boolean;
  cardSize?: "small" | "medium" | "large";
}

// Store types
export interface MovieStore {
  // State
  query: string;
  type: "movie" | "series";
  results: Movie[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  recentlyViewed: RecentlyViewed;
  recentlyViewedCollapsed: {
    movies?: boolean;
    series?: boolean;
    combined?: boolean;
  };
  selectedMovie: Movie | null;
  isDialogOpen: boolean;
  isShowingPopular: boolean;

  // Actions
  search: (reset?: boolean) => void;
  loadMore: () => void;
  loadPopular: () => void;
  selectMovie: (movie: Movie) => void;
  closeDialog: () => void;
  toggleRecentlyViewed: (type: "movies" | "series" | "combined") => void;
  setType?: (type: "movie" | "series") => void;
}
