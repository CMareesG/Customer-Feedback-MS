import RatingSummary from "../../../components/feedback/RatingSummary";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";

const UserFeedbackPage = () => {

  const reviews = [
    { id: 1, name: "John", rating: 5, comment: "Excellent product" },
    { id: 2, name: "Sam", rating: 4, comment: "Good product" },
  ];

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <RatingSummary reviews={reviews} />

      <RatingBreakdown reviews={reviews} />

      <FeedbackList reviews={reviews} />

      <AddFeedbackForm
        onAddReview={(rating, comment) =>
          console.log(rating, comment)
        }
      />

    </div>

  );

};

export default UserFeedbackPage;