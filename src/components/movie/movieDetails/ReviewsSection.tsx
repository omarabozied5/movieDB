import React from "react";
import { Loader2, Star, ExternalLink } from "lucide-react";
import { MovieReview } from "../../../types/index";

interface ReviewsSectionProps {
  reviews: MovieReview[] | null;
  loading: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  loading,
}) => (
  <div className="bg-gray-900/50 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-800">
        Reviews & Critics
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-gray-400 text-lg">Loading reviews...</span>
          </div>
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-black/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white pr-4">
                  {review.headline}
                </h3>
                {review.critics_pick === 1 && (
                  <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full flex-shrink-0">
                    Critics' Pick
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {review.summary_short}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <span className="font-medium">By {review.byline}</span>
                <span>
                  {new Date(review.publication_date).toLocaleDateString()}
                </span>
              </div>
              {review.link && (
                <a
                  href={review.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read full review
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg">
            No reviews available for this movie.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default ReviewsSection;
