import React from "react";
import { Star } from "lucide-react";

interface Feedback {
  id: number;
  name: string;
  rating: number;
  review: string;
}

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<Props> = ({ feedbacks }:Props) => {
  return (
    <div className="card">
      <h2 className="mb-4 text-text-primary">Recent Feedbacks</h2>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{feedback.name}</p>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= feedback.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-text-muted"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600">
              {feedback.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;