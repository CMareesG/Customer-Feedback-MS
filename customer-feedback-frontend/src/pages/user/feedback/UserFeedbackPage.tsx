import RatingSummary from "../../../components/feedback/RatingSummary";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";
import { useEffect, useState } from "react";
import type { feedback } from "../../../types/feedback";
import { useParams, type Params } from "react-router-dom";
import { getFeedbackByProduct } from "../../../services/feedbackService";

const UserFeedbackPage = () => {
  const { productId }:Readonly<Params<string>> = useParams();
  const [feedbacks,setFeedbacks] = useState<feedback[]>([]);
  useEffect(()=>{
    async function getFeedback(productId:string):Promise<void>{
      const feedbacks:feedback[] = await getFeedbackByProduct(productId);
      setFeedbacks(feedbacks);
    }
  },[productId]);
  // const feedbacks = [
  //   { id: 1, name: "John", rating: 5, comment: "Excellent product" },
  //   { id: 2, name: "Sam", rating: 4, comment: "Good product" },
  // ];
  

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <RatingSummary feedbacks={feedbacks} />

      <RatingBreakdown feedbacks={feedbacks} />

      <FeedbackList feedbacks={feedbacks} />

      <AddFeedbackForm
        onAddFeedback={(rating, review) =>
          console.log(rating, review)
        }
      />

    </div>

  );

};

export default UserFeedbackPage;