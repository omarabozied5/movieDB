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
}) => {
  if (resultsLength === 0 || loading) return null;

  return (
    <div className="mb-6">
      {!isShowingPopular && (
        <p className="text-gray-400 mt-1">Found {resultsLength} results</p>
      )}
    </div>
  );
};

export default ContentHeader;
