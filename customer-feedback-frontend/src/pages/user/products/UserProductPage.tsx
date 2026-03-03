import React, { useState } from "react";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import RatingSummary from "../../../components/feedback/RatingSummary";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";

interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const initialFeedbacks: Feedback[] = [
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
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  console.log("Userpage",feedbacks);
  const handleAddFeedback = (rating: number, comment: string) => {
    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      name: "You",
      rating,
      comment,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RatingBreakdown feedbacks={feedbacks} />
        <RatingSummary feedbacks={feedbacks} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackList feedbacks={feedbacks} />
        <AddFeedbackForm onAddFeedback={handleAddFeedback} />
      </div>

    </div>
  );
};

export default ProductFeedbackPage;