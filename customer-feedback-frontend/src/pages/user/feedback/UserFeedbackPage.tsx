import RatingSummary from "../../../components/feedback/RatingSummary";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";
import { useEffect, useState } from "react";
import type { Feedback } from "../../../types/feedback";
import { useParams, type Params } from "react-router-dom";
import { addFeedbackForProduct, getFeedbackByProduct } from "../../../services/feedbackService";

const UserFeedbackPage = () => {
  const { productId }: Readonly<Params<string>> = useParams();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  useEffect(() => {
    async function getFeedbacks(): Promise<void> {
      const feedbacks: Feedback[] = await getFeedbackByProduct(productId || "");
      setFeedbacks(feedbacks);
    }
    getFeedbacks();
  }, [productId]);
  async function addFeedback(rating:number,review:string,productId:string){
    const newFeedback:Feedback = await addFeedbackForProduct(rating,review,productId);
    console.log("newfeedback",newFeedback);
    setFeedbacks((prev:Feedback[]):Feedback[]=>{
      console.log("set", [...prev, newFeedback]);
      return [
        ...prev,
        newFeedback
      ]
    })
  }


  return (

    <div className="page-container">

      <RatingSummary feedbacks={feedbacks} />

      <RatingBreakdown feedbacks={feedbacks} />

      <FeedbackList feedbacks={feedbacks} />

      <AddFeedbackForm
        onAddFeedback={addFeedback}
        productId={productId||""}
      />

    </div>

  );

};

export default UserFeedbackPage;