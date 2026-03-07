import React, { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  onAddReview: (rating: number, comment: string) => void;
}

const AddFeedbackForm: React.FC<Props> = ({ onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment) return;

    onAddReview(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="card">
      <h2 className="mb-4 text-text-primary">Add a Review</h2>

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={22}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-text-muted"
            }`}
          />
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="input-field mb-4 h-24 resize-none"
      />

      <button
        onClick={handleSubmit}
        className="btn-primary w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default AddFeedbackForm;