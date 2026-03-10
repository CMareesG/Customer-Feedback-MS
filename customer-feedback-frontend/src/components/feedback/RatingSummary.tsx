import React from "react";
import { Star } from "lucide-react";

interface Props {
  feedbacks: { rating: number }[];
}

const RatingSummary: React.FC<Props> = ({ feedbacks }) => {
  // console.log("rate sum",feedbacks);
  const totalFeedbacks = feedbacks.length;

  const averageRating =
    totalFeedbacks === 0
      ? 0
      : feedbacks.reduce((acc, r) => acc + r.rating, 0) / totalFeedbacks;

  return (
    <div className="card flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-yellow-400">
        {averageRating.toFixed(1)}
      </h1>

      <div className="flex mt-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={
              star <= Math.round(averageRating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-text-muted"
            }
          />
        ))}
      </div>

      <p className="text-gray-500 text-sm">
        {totalFeedbacks} Ratings
      </p>
    </div>
  );
};

export default RatingSummary;