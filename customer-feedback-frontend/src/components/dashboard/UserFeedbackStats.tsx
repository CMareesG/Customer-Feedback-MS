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
          <p className="text-gray-500 text-sm">Total Reviews</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>
        <MessageSquare className="text-blue-600" size={32} />
      </div>

      {/* Pending Reviews */}
      <div className="stat-card">
        <div>
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-3xl font-bold">{pending}</h2>
        </div>
        <Clock className="text-yellow-500" size={32} />
      </div>

      {/* Resolved Reviews */}
      <div className="stat-card">
        <div>
          <p className="text-gray-500 text-sm">Average</p>
          <h2 className="text-3xl font-bold">{average}</h2>
        </div>
        <CheckCircle className="text-green-600" size={32} />
      </div>

    </div>
  );
};

export default UserFeedbackStats;