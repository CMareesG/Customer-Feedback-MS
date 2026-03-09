import React from "react";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";

interface StatsProps {
  total: number;
  pending: number;
  average: number;
}

const UserFeedbackStats: React.FC<StatsProps> = ({
  total,
  pending,
  average,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* Total Reviews */}
      <div className="stat-card">
        <div>
          <p className="text-text-muted text-sm">Total Reviews</p>
          <h2 className="text-3xl font-bold text-text-primary">{total}</h2>
        </div>
        <MessageSquare className="text-accent-1" size={32} />
      </div>

      {/* Pending Reviews */}
      <div className="stat-card">
        <div>
          <p className="text-text-muted text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-text-primary">{pending}</h2>
        </div>
        <Clock className="text-yellow-400" size={32} />
      </div>

      {/* Resolved Reviews */}
      <div className="stat-card">
        <div>
          <p className="text-text-muted text-sm">Average</p>
          <h2 className="text-3xl font-bold text-text-primary">{average}</h2>
        </div>
        <CheckCircle className="text-green-400" size={32} />
      </div>

    </div>
  );
};

export default UserFeedbackStats;