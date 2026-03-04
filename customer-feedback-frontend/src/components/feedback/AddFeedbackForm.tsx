import React, { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  onAddFeedback: (rating: number, review: string, productId:string) => void;
  productId:string;
}

const AddFeedbackForm: React.FC<Props> = ({ onAddFeedback,productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!rating || !review) return;
    // console.log({rating,review,productId,userId:localStorage.getItem("userId")});
    onAddFeedback(rating, review, productId);
    setRating(0);
    setReview("");
  };

  return (
    <div className="card">
      <h2 className="mb-4">Add a Feedback</h2>

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={22}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default AddFeedbackForm;