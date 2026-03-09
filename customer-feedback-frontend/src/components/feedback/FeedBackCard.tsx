const FeedBackCard: React.FC<Props> = ({feedback}) => {
    
  return (
    <div className="card">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div>
                <p className="font-medium text-text-primary">User Name</p>
                <p className="text-sm text-text-muted">2024-06-15</p>
            </div>
        </div>
        <p className="text-text-primary mb-3">This product is amazing! I really enjoyed using it and would recommend it to others.</p>
        <div className="flex items-center gap-4">
            <span className="badge badge-resolved">resolved</span>
            <button className="text-sm text-accent-1 hover:text-accent-2 transition">View Details</button>
        </div>
    </div>
  );
};

export default FeedBackCard;