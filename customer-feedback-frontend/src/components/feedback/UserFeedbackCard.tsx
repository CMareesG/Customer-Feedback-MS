import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { createResponse } from "../../services/adminService";

interface Props {
    feedback: {
        id: string;
        product: { id: string; name: string };
        rating: number;
        review: string;
        userId: string;
        createdAt: string;
        responses: { message: string }[];
    };
}

const FeedBackCard: React.FC<Props> = ({ feedback }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false);
    // const [response, setResponse] = useState<string>("");
    const [status, setStatus] = useState<string>(
        feedback.responses.length > 0 ? "resolved" : "pending",
    );

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setResponse(event.target.value);
    // };

    // const handleResponse = () => {
    //     createResponse({
    //         feedbackId: feedback.id,
    //         message: response,
    //         adminId: feedback.userId,
    //     });
    //     alert("Response submitted!");
    // };

    useEffect(() => {
        setStatus(feedback.responses.length > 0 ? "resolved" : "pending");
    }, [feedback.responses.length]);

    return (
        <>
            <div className="card">
                <div className="flex items-center gap-4 mb-4">
                    <div>
                        <p className="font-medium text-text-primary">
                            Product : {feedback.product.name}
                        </p>

                        <p className="text-sm text-text-muted">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={16}
                            className={
                                star <= feedback.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-text-muted"
                            }
                        />
                    ))}
                </div>

                <p className="text-text-primary mb-3">{feedback.review}</p>

                {feedback.responses.length > 0 && (
                    <div className="bg-green-100 p-3 rounded mb-3">
                        <p className="text-green-800 font-medium">
                            Admin Response:
                        </p>
                        <p className="text-green-700">
                            {feedback.responses[0].message}
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <span
                        className={`badge ${
                            status === "resolved"
                                ? "badge-resolved"
                                : "badge-pending"
                        }`}
                    >
                        {status}
                    </span>

                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm text-accent-1 hover:text-accent-2 transition"
                    >
                        View Details
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-neutral-100 p-10 w-[500px] items-center rounded-[30px] w-[600px] h-[400px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-black font-semibold mb-3">
                            Feedback Details
                        </h2>

                        <p className="text-black font-medium mb-1">
                            Product: {feedback.product.name}
                        </p>

                        <p className="text-sm text-black mb-3">
                            {new Date(feedback.createdAt).toLocaleString()}
                        </p>

                        <div className="flex mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={18}
                                    className={
                                        star <= feedback.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>

                        <p className="text-black mb-4">{feedback.review}</p>

                        {feedback.responses.length > 0 && (
                            <div className="bg-green-100 p-3 rounded mb-3">
                                <p className="text-green-800 font-medium">
                                    Admin Response:
                                </p>
                                <p className="text-green-700">
                                    {feedback.responses[0].message}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-around mt-6">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/product/feedback/${feedback.product.id}`,
                                    )
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Go To Product
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedBackCard;
