import React from "react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
