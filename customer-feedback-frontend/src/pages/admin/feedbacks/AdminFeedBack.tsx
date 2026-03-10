import { useEffect, useState } from "react";
import { getUserFeedbacks } from "../../../services/adminService";
import FeedBackCard from "../../../components/feedback/FeedBackCard";
const AdminFeedBack: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const getFeedbacks = async () => {
        try {
            const res = await getUserFeedbacks();
            console.log(res);
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