import React, { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  onAddFeedback: (rating: number, review: string, productId: string) => void;
  onUpdateFeedback?: (rating: number, review: string) => void;
  productId: string;
  initialRating?: number;
  initialReview?: string;
  isEditMode?: boolean;
}

const AddFeedbackForm: React.FC<Props> = ({ 
  onAddFeedback, 
  onUpdateFeedback,
  productId,
  initialRating = 0,
  initialReview = "",
  isEditMode = false 
}) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);

  const handleSubmit = () => {
    if (!rating || !review) return;
    
    if (isEditMode && onUpdateFeedback) {
      onUpdateFeedback(rating, review);
    } else {
      onAddFeedback(rating, review, productId);
    }
    
    setRating(0);
    setReview("");
  };

  return (
    <div className="card">
      <h2 className="mb-4">{isEditMode ? "Edit Your Feedback" : "Add a Feedback"}</h2>

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
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
      />

      <button
        onClick={handleSubmit}
        className="btn-primary w-full"
        disabled={!rating || !review}
      >
        {isEditMode ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default AddFeedbackForm;

