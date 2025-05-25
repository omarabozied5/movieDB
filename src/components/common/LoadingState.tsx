import React from "react";

interface LoadingStateProps {
  loading: boolean;
  resultsLength: number;
  isShowingPopular: boolean;
  type: "movie" | "series";
}

const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  resultsLength,
  isShowingPopular,
  type,
}) => {
  if (!loading || resultsLength > 0) return null;

  return (
    <div className="text-center py-12">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-gray-400 ml-3">
          {isShowingPopular
            ? `Loading popular ${type === "movie" ? "movies" : "series"}...`
            : "Searching..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
