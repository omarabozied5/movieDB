import React from "react";

interface ContentTabSwitcherProps {
  activeTab: "movie" | "series";
  onTabChange: (tab: "movie" | "series") => void;
  isShowingPopular: boolean;
  query: string;
}

const TabSwitcher: React.FC<ContentTabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-800/30">
      <div className="flex gap-8">
        <button
          onClick={() => onTabChange("movie")}
          className={`text-lg font-medium transition-colors relative pb-1 ${
            activeTab === "movie"
              ? "text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Movies
          {activeTab === "movie" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>

        <button
          onClick={() => onTabChange("series")}
          className={`text-lg font-medium transition-colors relative pb-1 ${
            activeTab === "series"
              ? "text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Series
          {activeTab === "series" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabSwitcher;
