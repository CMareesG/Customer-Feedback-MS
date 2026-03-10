import { useEffect, useState } from "react";
import { getFeedbackByUser } from "../../../services/feedbackService"; 
import UserFeedBackCard from "../../../components/feedback/UserFeedBackCard";

const ShowUserFeedbacks: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const getFeedbacks = async () => {
        try {
            const res = await getFeedbackByUser();
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
                    return <UserFeedBackCard key={feedback.id} feedback={feedback} />;
                })}
            </div>
        </>
    );
};

export default ShowUserFeedbacks;