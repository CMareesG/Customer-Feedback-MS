import { useEffect, useState } from "react";

import UserFeedbackStats
    from "../../../components/dashboard/UserFeedbackStats";

import RecentFeedback
    from "../../../components/dashboard/RecentFeedback";

import {
    getDashboardStats,
    getRecentFeedback,
} from "../../../services/dashboardService";


interface DashboardStats {
    totalFeedback: number;
    resolvedFeedback: number;
    pendingFeedback: number;
    averageRating: number;
}


interface FeedbackItem {
    id: number;
    title: string;
    status: "resolved" | "pending";
    date: string;
}


const UserDashboard = () => {

    const [stats, setStats] =
        useState<DashboardStats>({
            totalFeedback: 0,
            resolvedFeedback: 0,
            pendingFeedback: 0,
            averageRating: 0,
        });

    const [feedbacks, setFeedbacks] =
        useState<FeedbackItem[]>([]);


    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            const statsData =
                await getDashboardStats();

            const feedbackData =
                await getRecentFeedback();


            setStats(statsData);


            const formatted =
                feedbackData.map((f: any) => ({

                    id: Number(f.id),

                    title: f.product.name,

                    status:
                        f.responses.length > 0
                            ? "resolved"
                            : "pending",

                    date:
                        new Date(
                            f.createdAt
                        ).toLocaleDateString(),

                }));


            setFeedbacks(formatted);

        } catch (err) {

            console.error(
                "Dashboard load failed:",
                err
            );

        }

    };


    return (

        <div className="page-container">

            <h1 className="text-2xl font-bold text-text-primary mb-6">
                Dashboard
            </h1>


            <UserFeedbackStats
                total={stats.totalFeedback || 0}
                pending={stats.pendingFeedback || 0}
                average={stats.averageRating || 0}
            />

            <RecentFeedback
                feedbacks={feedbacks}
            />

        </div>

    );

};


export default UserDashboard;