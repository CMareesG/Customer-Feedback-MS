import React from "react";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

interface Props {
  reviews: Review[];
}

const FeedbackList: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="card">
      <h2 className="mb-4 text-text-primary">Recent Feedbacks</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-text-primary">{review.name}</p>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-text-muted"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-text-muted">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;