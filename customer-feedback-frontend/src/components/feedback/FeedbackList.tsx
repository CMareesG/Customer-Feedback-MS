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
      <h2 className="mb-4">Recent Feedbacks</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{review.name}</p>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;