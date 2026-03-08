import { Routes, Route } from "react-router-dom";

import SidebarLayout from "../layouts/SideBarLayout";
import AdminSidebarLayout from "../layouts/AdminSidebarLayout";

/* AUTH */
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

/* USER */
import UserDashboard from "../pages/user/dashboard/UserDashboard";
import UserCategoryPage from "../pages/user/categories/UserCategoryPage";
// import UserProductPage from "../pages/user/products/UserProductPage";
import UserFeedbackPage from "../pages/user/feedback/UserFeedbackPage";
import UserProfile from "../pages/user/profile/UserProfile";
import UserSettings from "../pages/user/settings/UserSettings";
import UserContact from "../pages/user/contact/UserContact";

/* ADMIN */
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminCategoryPage from "../pages/admin/categories/AdminCategoryPage";
import AdminProductPage from "../pages/admin/products/AdminProductPage";
import AdminUserPage from "../pages/admin/users/AdminUserPage";
import AdminProfile from "../pages/admin/profile/AdminProfile";
import AdminSettings from "../pages/admin/settings/AdminSettings";

/* SHARED */
import AboutPage from "../pages/shared/AboutPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<ForgotPassword />} />

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>

                {/* USER ROUTES WITH USER SIDEBAR */}
                <Route element={<SidebarLayout />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/categories/:categoryName" element={<UserCategoryPage />} />
                    <Route path="/feedback/:productId" element={<UserFeedbackPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/contact" element={<UserContact />} />
                </Route>

                {/* ADMIN ROUTES WITH ADMIN SIDEBAR */}
                <Route element={<AdminSidebarLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/categories" element={<AdminCategoryPage />} />
                    <Route path="/admin/products" element={<AdminProductPage />} />
                    <Route path="/admin/users" element={<AdminUserPage />} />
                    <Route path="/admin/about" element={<AboutPage />} />
                    <Route path="/admin/profile" element={<AdminProfile />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>

            </Route>

        </Routes>
    );
};

export default AppRoutes;