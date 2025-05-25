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
    <div className="mb-6">
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => onTabChange("movie")}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === "movie"
              ? "text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Movies
          {activeTab === "movie" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD600]"></div>
          )}
        </button>

        <button
          onClick={() => onTabChange("series")}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === "series"
              ? "text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Series
          {activeTab === "series" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD600]"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabSwitcher;
