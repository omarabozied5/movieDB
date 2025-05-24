import React from "react";
import type { TabSwitcherProps } from "../types";

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-600">
        <button
          onClick={() => onTabChange("movie")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === "movie"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => onTabChange("series")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === "series"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Series
        </button>
      </div>
    </div>
  );
};

export default TabSwitcher;
