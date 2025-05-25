import React from "react";

interface ContentHeaderProps {
  resultsLength: number;
  loading: boolean;
  isShowingPopular: boolean;
  type: "movie" | "series";
  query: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  resultsLength,
  loading,
  isShowingPopular,
  type,
  query,
}) => {
  if (resultsLength === 0 || loading) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white">
        {isShowingPopular
          ? `Popular ${type === "movie" ? "Movies" : "Series"}`
          : `Search Results for "${query}"`}
      </h2>
      {!isShowingPopular && (
        <p className="text-gray-400 mt-1">Found {resultsLength} results</p>
      )}
    </div>
  );
};

export default ContentHeader;
