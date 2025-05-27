import React from "react";
import { ArrowLeft } from "lucide-react";

interface MovieHeaderProps {
  onGoBack: () => void;
}

export const MovieHeader: React.FC<MovieHeaderProps> = ({ onGoBack }) => (
  <div className="relative bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
    <div className="absolute inset-0 bg-primary/5"></div>
    <div className="relative max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={onGoBack}
        className="inline-flex items-center gap-3 text-gray-300 hover:text-primary transition-all duration-200 group"
      >
        <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-primary/10 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Search</span>
      </button>
    </div>
  </div>
);

export default MovieHeader;
