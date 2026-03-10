import RatingSummary from "../../../components/feedback/RatingSummary";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";
import { useEffect, useState } from "react";
import type { Feedback } from "../../../types/feedback";
import { useParams, type Params } from "react-router-dom";
import { addFeedbackForProduct, getFeedbackByProduct } from "../../../services/feedbackService";
import { fetchProductById } from "../../../services/productService";

const UserFeedbackPage = () => {
  const { productId }: Readonly<Params<string>> = useParams();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [productName, setProductName] = useState<string>("");
  async function getProductName(): Promise<void> {
      try{
        const response = await fetchProductById(productId || "");
        console.log(response);
        setProductName(response.name);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  
  useEffect(() => {
    async function getFeedbacks(): Promise<void> {
      const feedbacks: Feedback[] = await getFeedbackByProduct(productId || "");
      setFeedbacks(feedbacks);
    }
    
    getFeedbacks();
    getProductName();
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
      <h1 className="text-2xl font-bold mb-4 card">{productName}</h1>
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