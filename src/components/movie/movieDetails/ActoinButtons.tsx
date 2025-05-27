import React from "react";
import { Play, Heart, Share2 } from "lucide-react";

interface ActionButtonsProps {
  onWatchTrailer?: () => void;
  onAddToFavorites?: () => void;
  onShare?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onWatchTrailer,
  onAddToFavorites,
  onShare,
}) => (
  <div className="flex flex-wrap gap-4">
    <button
      onClick={onWatchTrailer}
      className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg"
    >
      <Play className="w-5 h-5" />
      Watch Trailer
    </button>
    <button
      onClick={onAddToFavorites}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/80 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 border border-gray-700"
    >
      <Heart className="w-5 h-5" />
      Add to Favorites
    </button>
    <button
      onClick={onShare}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/80 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 border border-gray-700"
    >
      <Share2 className="w-5 h-5" />
      Share
    </button>
  </div>
);

export default ActionButtons;
