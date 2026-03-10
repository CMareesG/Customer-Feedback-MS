import RatingSummary from "../../../components/feedback/RatingSummary";
import RatingBreakdown from "../../../components/feedback/RatingBreakdown";
import FeedbackList from "../../../components/feedback/FeedbackList";
import AddFeedbackForm from "../../../components/feedback/AddFeedbackForm";
import { useEffect, useState } from "react";
import type { Feedback } from "../../../types/feedback";
import { useParams, type Params } from "react-router-dom";
import { fetchProductById } from "../../../services/productService";
import { 
  addFeedbackForProduct, 
  getFeedbackByProduct,
  getUserFeedbackForProduct,
  updateFeedback 
} from "../../../services/feedbackService";

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
  
  const [userExistingFeedback, setUserExistingFeedback] = useState<Feedback | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFeedbacks(): Promise<void> {
      const feedbacks: Feedback[] = await getFeedbackByProduct(productId || "");
      setFeedbacks(feedbacks);
    }
    
    async function checkUserFeedback(): Promise<void> {
      if (!productId) return;
      try {
        const userFeedback = await getUserFeedbackForProduct(productId);
        setUserExistingFeedback(userFeedback);
      } catch (error) {
        console.log("No existing feedback found");
        setUserExistingFeedback(null);
      }
    }

    Promise.all([getFeedbacks(), checkUserFeedback()]).finally(() => {
      setLoading(false);
    });
  
    getFeedbacks();
    getProductName();
  }, [productId]);

  async function addFeedback(rating: number, review: string, productId: string) {
    const newFeedback: Feedback = await addFeedbackForProduct(rating, review, productId);
    console.log("newfeedback", newFeedback);
    setFeedbacks((prev: Feedback[]): Feedback[] => {
      console.log("set", [...prev, newFeedback]);
      return [...prev, newFeedback];
    });
    setUserExistingFeedback(newFeedback);
    setIsEditMode(false);
  }

  async function handleUpdateFeedback(rating: number, review: string) {
    if (!userExistingFeedback) return;
    
    const updatedFeedback: Feedback = await updateFeedback(
      userExistingFeedback.id,
      rating,
      review
    );
    
    setFeedbacks((prev: Feedback[]): Feedback[] => {
      return prev.map((fb) => (fb.id === updatedFeedback.id ? updatedFeedback : fb));
    });
    
    setUserExistingFeedback(updatedFeedback);
    setIsEditMode(false);
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-4 card">{productName}</h1>
      <RatingSummary feedbacks={feedbacks} />
      <RatingBreakdown feedbacks={feedbacks} />
      <FeedbackList feedbacks={feedbacks} />

      {userExistingFeedback && !isEditMode ? (
        <div className="card bg-blue-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                You have already added feedback
              </h2>
              <p className="text-blue-600 mb-4">
                Thank you for your feedback! You can click the button below to edit it.
              </p>
              <div className="bg-white p-3 rounded-lg mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= userExistingFeedback.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{userExistingFeedback.review}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditMode(true)}
            className="btn-primary w-full"
          >
            Edit Your Feedback
          </button>
        </div>
      ) : isEditMode ? (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setIsEditMode(false)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to view
            </button>
          </div>
          <AddFeedbackForm
            onAddFeedback={addFeedback}
            onUpdateFeedback={handleUpdateFeedback}
            productId={productId || ""}
            initialRating={userExistingFeedback?.rating}
            initialReview={userExistingFeedback?.review}
            isEditMode={true}
          />
        </div>
      ) : (
        <AddFeedbackForm
          onAddFeedback={addFeedback}
          productId={productId || ""}
        />
      )}
    </div>
  );
};

export default UserFeedbackPage;

