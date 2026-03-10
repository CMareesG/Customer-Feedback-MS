import { useEffect, useState } from "react";
import { Users, Package, ShoppingBag, MessageSquare } from "lucide-react";
import {
    getAllUsers,
    getAllProducts,
    getAllCategories,
    getAllRecentFeedback,
} from "../../../services/adminService";
import RecentFeedback from "../../../components/dashboard/RecentFeedback";

interface StatCard {
    icon: React.ReactNode;
    label: string;
    value: number;
    color: string;
}

interface FeedbackItem {
    id: string;
    title: string;
    status: "resolved" | "pending";
    date: string;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        categories: 0,
        feedback: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [Feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

    // useRef(() => {
    //   loadStats();
    // });

    useEffect(() => {
        fetchRecentFeedback();
        loadStats();
    }, []);

    const fetchRecentFeedback = async () => {
        try {
            setIsLoading(true);
            const feedback = await getAllRecentFeedback();
            const formatted = feedback.map((f: any) => ({
                id: f.id,

                title: f.product.name,

                status: f.responses.length > 0 ? "resolved" : "pending",

                date: new Date(f.createdAt).toLocaleDateString(),
            }));

            setFeedbacks(formatted);
        } catch (error) {
            console.error("Error fetching recent feedback:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            setIsLoading(true);
            const [users, products, categories, feedback] = await Promise.all([
                getAllUsers(),
                getAllProducts(),
                getAllCategories(),
                getAllRecentFeedback(),
            ]);

            setStats({
                users: users.length,
                products: products.length,
                categories: categories.filter((c: any) => !c.parentId).length,
                feedback: feedback.length,
            });
        } catch (error) {
            console.error("Error loading stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards: StatCard[] = [
        {
            icon: <Users size={32} />,
            label: "Total Users",
            value: stats.users,
            color: "from-accent-1 to-accent-1/50",
        },
        {
            icon: <ShoppingBag size={32} />,
            label: "Categories",
            value: stats.categories,
            color: "from-accent-2 to-accent-2/50",
        },
        {
            icon: <Package size={32} />,
            label: "Products",
            value: stats.products,
            color: "from-purple-500 to-purple-500/50",
        },
        {
            icon: <MessageSquare size={32} />,
            label: "Feedback",
            value: stats.feedback,
            color: "from-cyan-500 to-cyan-500/50",
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">
                    Dashboard Overview
                </h1>
                <p className="text-text-muted mt-1">
                    Welcome to the admin panel. Manage your system here.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white border border-white/10`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="opacity-75">{stat.icon}</div>
                        </div>
                        <p className="text-sm opacity-80 mb-1">{stat.label}</p>
                        <p className="text-4xl font-bold">
                            {isLoading ? "..." : stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-bg-2 rounded-lg border border-white/10 p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <a
                        href="/admin/categories"
                        className="px-4 py-3 rounded-lg bg-accent-1/20 text-accent-1 hover:bg-accent-1/30 transition text-center font-medium"
                    >
                        Manage Categories
                    </a>
                    <a
                        href="/admin/products"
                        className="px-4 py-3 rounded-lg bg-accent-2/20 text-accent-2 hover:bg-accent-2/30 transition text-center font-medium"
                    >
                        Manage Products
                    </a>
                    <a
                        href="/admin/users"
                        className="px-4 py-3 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition text-center font-medium"
                    >
                        Manage Users
                    </a>
                    <a
                        href="/admin/about"
                        className="px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition text-center font-medium"
                    >
                        About
                    </a>
                </div>
            </div>

            <RecentFeedback
                feedbacks={Feedbacks}
                feedbackURL="/admin/feedbacks"
            ></RecentFeedback>
        </div>
    );
};

export default AdminDashboard;
