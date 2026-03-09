import React, { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedBackCard: React.FC<Props> = ({ feedback }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const status = feedback.responses.length > 0 ? "resolved" : "pending";

  return (
    <>
      <div className="card">

        <div className="flex items-center gap-4 mb-4">

          <div>
            <p className="font-medium text-text-primary">
              {feedback.product.name}
            </p>

            <p className="text-sm text-text-muted">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= feedback.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-text-muted"
              }
            />
          ))}
        </div>

        <p className="text-text-primary mb-3">{feedback.review}</p>

        <div className="flex items-center gap-4">

          <span
            className={`badge ${
              status === "resolved" ? "badge-resolved" : "badge-pending"
            }`}
          >
            {status}
          </span>

          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-accent-1 hover:text-accent-2 transition"
          >
            View Details
          </button>

        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >

          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[420px]"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-lg font-semibold mb-3">
              Feedback Details
            </h2>

            <p className="font-medium mb-1">
              Product: {feedback.product.name}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              {new Date(feedback.createdAt).toLocaleString()}
            </p>

            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= feedback.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="text-gray-700 mb-4">
              {feedback.review}
            </p>

            <div className="flex justify-between">

              <button
                onClick={() =>
                  navigate(`/products/${feedback.product.id}`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Go To Product
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default FeedBackCard;