import React from "react";

interface Props {
  reviews: { rating: number }[];
}

const RatingBreakdown: React.FC<Props> = ({ reviews }) => {
  const totalReviews = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="card lg:col-span-2">
      <h2 className="mb-4">Rating Breakdown</h2>

      {ratingCounts.map(({ star, count }) => {
        const percentage =
          totalReviews === 0 ? 0 : (count / totalReviews) * 100;

        return (
          <div key={star} className="flex items-center gap-4 mb-3">
            <span className="w-12 text-sm">{star} Star</span>

            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-400 h-3 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className="text-sm w-10 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;