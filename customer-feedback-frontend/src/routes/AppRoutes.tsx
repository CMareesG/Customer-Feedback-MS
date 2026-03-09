import { Routes, Route } from "react-router-dom";

import SidebarLayout from "../layouts/SideBarLayout";
import AdminSidebarLayout from "../layouts/AdminSidebarLayout";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

import UserDashboard from "../pages/user/dashboard/UserDashboard";
import UserCategoryPage from "../pages/user/categories/UserCategoryPage";

import UserFeedbackPage from "../pages/user/feedback/UserFeedbackPage";
import UserProfile from "../pages/user/profile/UserProfile";
import UserContact from "../pages/user/contact/UserContact";

import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminCategoryPage from "../pages/admin/categories/AdminCategoryPage";
import AdminProductPage from "../pages/admin/products/AdminProductPage";
import AdminUserPage from "../pages/admin/users/AdminUserPage";
import AdminProfile from "../pages/admin/profile/AdminProfile";
import AdminFeedBack from "../pages/admin/feedbacks/AdminFeedBack";

import AboutPage from "../pages/shared/AboutPage";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {
    const role:string = localStorage.getItem("userRole")||"";
    console.log("role:",role);
    
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />

            <Route element={<ProtectedRoute />}>

                

                    {role === "CUSTOMER" && (
                        <>
                           
                            <Route element={<SidebarLayout />}>
                                <Route path="/dashboard" element={<UserDashboard />} />
                                <Route path="/categories/:categoryName/:categoryId" element={<UserCategoryPage />} />
                                <Route path="product/feedback/:productId" element={<UserFeedbackPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/profile" element={<UserProfile />} />
                                <Route path="/contact" element={<UserContact />} />
                            </Route>
                        </>
                    )}

                    {role === "ADMIN" && (
                        <>
                            <Route element={<AdminSidebarLayout />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/categories" element={<AdminCategoryPage />} />
                                <Route path="/admin/products" element={<AdminProductPage />} />
                                <Route path="/admin/users" element={<AdminUserPage />} />
                                <Route path="/admin/about" element={<AboutPage />} />
                                <Route path="/admin/profile" element={<AdminProfile />} />
                                <Route path="/admin/feedbacks" element={<AdminFeedBack />} />
                            </Route>
                        </>
                        )}
            </Route>

        </Routes>
    );
};

export default AppRoutes;