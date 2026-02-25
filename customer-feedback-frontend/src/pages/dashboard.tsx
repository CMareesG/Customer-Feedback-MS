import UserFeedbackStats from "../components/users/dashboard/user_feedback_stats";
import RecentFeedback from "../components/users/dashboard/recent_feedback";

export const Dashboard = () => {

  const dummyFeedbacks: Array<{ id: number; title: string; status: "pending" | "resolved"; date: string }> = [
    { id: 1, title: "App crashes on login", status: "pending", date: "21 Feb 2026" },
    { id: 2, title: "UI bug in settings page", status: "resolved", date: "20 Feb 2026" },
    { id: 3, title: "Slow dashboard loading", status: "pending", date: "19 Feb 2026" },
  ];

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <UserFeedbackStats
        total={120}
        pending={35}
        resolved={85}
      />

      <RecentFeedback feedbacks={dummyFeedbacks} />

    </div>
  );
};

export default Dashboard;