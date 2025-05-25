import React from "react";

interface WelcomeMessageProps {
  resultsLength: number;
  loading: boolean;
  error: string | null;
  onLoadPopular: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  resultsLength,
  loading,
  error,
  onLoadPopular,
}) => {
  if (resultsLength > 0 || loading || error) return null;

  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">
          Welcome to MoviesDB
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Discover your favorite movies and series. Search above or browse our
          popular content.
        </p>
        <button
          onClick={onLoadPopular}
          className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Load Popular Content
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
