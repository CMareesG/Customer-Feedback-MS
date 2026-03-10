import { useEffect, useState } from "react";
import { getUserFeedbacks } from "../../../services/adminService";
import FeedBackCard from "../../../components/feedback/FeedBackCard";
// import type { Feedback } from "../../../types/feedback";

interface Feedback {
        id: string;
        product: {
            id: string;
            name: string;
        };
        name: string;
        rating: number;
        review: string;
        createdAt: string;
        userId: string;
        responses: Array<any>;
    };

const AdminFeedBack: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const getFeedbacks = async () => {
        try {
            const res = await getUserFeedbacks();
            // // console.log(res);
            setFeedbacks(res);
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <>
            <div>
                {feedbacks.map((feedback) => {
                    return <FeedBackCard key={feedback.id} feedback={feedback} />;
                })}
            </div>
        </>
    );
};

export default AdminFeedBack;