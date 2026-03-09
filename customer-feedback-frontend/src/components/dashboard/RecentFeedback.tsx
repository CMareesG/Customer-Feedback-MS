import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Feedback {
  id: string;
  title: string;
  status: "pending" | "resolved";
  date: string;
}

interface Props {
  feedbacks: Feedback[];
  feedbackURL?: string;
}

const RecentFeedback: React.FC<Props> = ({ feedbacks , feedbackURL }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-text-primary">Recent Reviews</h2>
        <button
          onClick={() => navigate(feedbackURL || "/feedback")}
          className="flex items-center gap-2 text-accent-1 hover:text-accent-2 text-sm transition"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/feedback/${item.id}`)}
            className="feedback-row"
          >
            <div>
              <p className="font-medium text-text-primary">{item.title}</p>
              <p className="text-sm text-text-muted">{item.date}</p>
            </div>

            <span
              className={`badge ${
                item.status === "pending"
                  ? "badge-pending"
                  : "badge-resolved"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentFeedback;