import { useEffect, useState } from "react";
import { getFeedbackByUser } from "../../../services/feedbackService"; 
import UserFeedbackCard from "../../../components/feedback/UserFeedbackCard";

const ShowUserFeedbacks: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const getFeedbacks = async () => {
        try {
            const res = await getFeedbackByUser();
            // console.log(res);
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
                {feedbacks.map((feedback,index:number) => {
                    return <UserFeedbackCard key={index} feedback={feedback} />;
                })}
            </div>
        </>
    );
};

export default ShowUserFeedbacks;