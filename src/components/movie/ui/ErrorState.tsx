import React from "react";
import { ArrowLeft, Film } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onGoBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Movie Not Found",
  message,
  onGoBack,
}) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="text-center max-w-md mx-auto">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center">
        <Film className="w-12 h-12 text-gray-600" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 text-lg mb-8">{message}</p>
      <button
        onClick={onGoBack}
        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back Home
      </button>
    </div>
  </div>
);

export default ErrorState;
