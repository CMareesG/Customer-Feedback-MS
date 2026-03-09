import { useState } from "react";
import { X, Star, Send } from "lucide-react";

interface Feedback {
  id: string;
  rating: number;
  review: string;
  user?: {
    name: string;
    email: string;
  };
  responses?: Response[];
  createdAt?: string;
}

interface Response {
  id: string;
  response: string;
  user?: {
    name: string;
  };
  createdAt?: string;
}

interface FeedbackSectionProps {
  feedbacks: Feedback[];
  isOpen: boolean;
  onClose: () => void;
  onSendResponse: (feedbackId: string, response: string) => void;
  isLoading?: boolean;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedbacks,
  isOpen,
  onClose,
  onSendResponse,
  isLoading,
}) => {
  const [responseText, setResponseText] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-bg-2 rounded-lg max-w-2xl w-full p-6 text-text-primary max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Product Feedback</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        {feedbacks.length === 0 ? (
          <p className="text-text-muted text-center py-8">
            No feedback yet for this product
          </p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-bg-1 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {feedback.user?.name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {feedback.user?.email}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < feedback.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-text-muted"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-text-primary mb-4">{feedback.review}</p>

                {feedback.responses && feedback.responses.length > 0 && (
                  <div className="bg-bg-2 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-semibold text-text-muted mb-2">
                      Responses:
                    </h4>
                    <div className="space-y-2">
                      {feedback.responses.map((resp) => (
                        <div key={resp.id} className="text-sm">
                          <p className="font-medium text-accent-1">
                            {resp.user?.name || "Admin"}
                          </p>
                          <p className="text-text-primary">{resp.response}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (responseText[feedback.id]?.trim()) {
                      onSendResponse(
                        feedback.id,
                        responseText[feedback.id]
                      );
                      setResponseText({ ...responseText, [feedback.id]: "" });
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={responseText[feedback.id] || ""}
                    onChange={(e) =>
                      setResponseText({
                        ...responseText,
                        [feedback.id]: e.target.value,
                      })
                    }
                    placeholder="Write a response..."
                    className="flex-1 bg-bg-3 border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !responseText[feedback.id]?.trim()}
                    className="px-3 py-2 bg-accent-1 text-white rounded-lg hover:bg-accent-1/80 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
