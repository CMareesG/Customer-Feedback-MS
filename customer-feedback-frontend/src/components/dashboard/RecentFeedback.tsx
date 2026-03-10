import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Star } from "lucide-react";

import { getProductById } from "../../services/dashboardService";

interface Feedback {
	id: string;
	title: string;
	status: "pending" | "resolved";
	date: string;
}

interface FeedbackDetails {
	id: string;
	productId: string;
	rating: number;
	review: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
}

interface Props {
	feedbacks: Feedback[];
	feedbackURL?: string;
}

const RecentFeedback: React.FC<Props> = ({ feedbacks, feedbackURL }) => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [feedbackId, setFeedbackId] = useState<string>('');
	const [feedbackData, setFeedbackData] = useState<FeedbackDetails | null>(null);

	const getProduct = async () => {
		try {
			const fetchData = await getProductById(feedbackId);
			console.log(fetchData)
			setFeedbackData(fetchData);
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		if (feedbackId && showModal) {
			getProduct();
		}
	}, [feedbackId, showModal])
	return (
		<div className="card">

			<div className="flex justify-between items-center mb-5">
				<h2 className="text-text-primary">Recent Reviews</h2>
				<button
					onClick={() => navigate(feedbackURL || "/user/feedbacks")}
					className="flex items-center gap-2 text-accent-1 hover:text-accent-2 text-sm transition"
				>
					View All <ArrowRight size={16} />
				</button>
			</div>

			<div className="space-y-4">
				{feedbacks.map((item) => (
					<div
						key={item.id}
						onClick={() => {
							setShowModal(true)
							setFeedbackId(item.id)
							console.log(item)
						}}
						className="feedback-row"
					>
						<div>
							<p className="font-medium text-text-primary">{item.title}</p>
							<p className="text-sm text-text-muted">{item.date}</p>
						</div>

						<span
							className={`badge ${item.status === "pending"
								? "badge-pending"
								: "badge-resolved"
								}`}
						>
							{item.status}
						</span>
					</div>
				))}
			</div>

			{showModal && feedbackData && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

					<div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-6 rounded-lg shadow-lg w-[400px]">

						<h2 className="text-xl font-semibold mb-3">Feedback Details</h2>

						{/* Rating */}
						<div className="flex mb-3">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									size={18}
									className={
										star <= feedbackData.rating
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300"
									}
								/>
							))}
						</div>

						{/* Review */}
						<p className="text-gray-700 mb-4">
							{feedbackData.review}
						</p>

						{/* Metadata */}
						<div className="text-sm text-gray-500 space-y-1 mb-4">
							<p><strong>User ID:</strong> {feedbackData.userId}</p>
							<p><strong>Product ID:</strong> {feedbackData.productId}</p>
							<p>
								<strong>Created:</strong>{" "}
								{new Date(feedbackData.createdAt).toLocaleString()}
							</p>
						</div>

						<button
							onClick={() => setShowModal(false)}
							className="bg-red-500 text-white px-4 py-2 rounded"
						>
							Close
						</button>

					</div>

				</div>
			)}

		</div>
	);
};

export default RecentFeedback;