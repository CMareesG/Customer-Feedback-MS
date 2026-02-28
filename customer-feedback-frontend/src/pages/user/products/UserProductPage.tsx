import React, { useState } from "react";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import RatingSummary from "../../../components/feedback/RatingSummary";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Robert Karamazov",
    rating: 5,
    comment: "Amazing product and performance.",
  },
  {
    id: 2,
    name: "Sophia Turner",
    rating: 4,
    comment: "Very good quality overall.",
  },
];

const ProductFeedbackPage: React.FC = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const handleAddReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: reviews.length + 1,
      name: "You",
      rating,
      comment,
    };

    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RatingBreakdown reviews={reviews} />
        <RatingSummary reviews={reviews} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackList reviews={reviews} />
        <AddFeedbackForm onAddReview={handleAddReview} />
      </div>

    </div>
  );
};

export default ProductFeedbackPage;