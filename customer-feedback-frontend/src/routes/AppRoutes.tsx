import { Routes, Route } from "react-router-dom";

import SidebarLayout from "../layouts/SideBarLayout";

/* AUTH */
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

/* USER */
import UserDashboard from "../pages/user/dashboard/UserDashboard";
import UserCategoryPage from "../pages/user/categories/UserCategoryPage";
// import UserProductPage from "../pages/user/products/UserProductPage";
import UserFeedbackPage from "../pages/user/feedback/UserFeedbackPage";

/* ADMIN */
// import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

/* SHARED */
import AboutPage from "../pages/shared/AboutPage";

/**
 * Role should come from JWT/AuthContext later
 */
const role = "user"; // change to "admin" to test admin

const AppRoutes = () => {
    return (
        <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<ForgotPassword />} />

            {/* PROTECTED ROUTES */}
            <Route element={<SidebarLayout />}>

                {/* USER ROUTES */}
                {role === "user" && (
                    <>
                        <Route path="/dashboard" element={<UserDashboard />} />

                        <Route path="/categories/:categoryName" element={<UserCategoryPage />} />

                        <Route
                            path="/feedback/:productId"
                            element={<UserFeedbackPage />}
                        />

                        {/* <Route
              path="/products/:productId/feedback"
              element={<UserFeedbackPage />}
            /> */}

                        <Route path="/about" element={<AboutPage />} />
                    </>
                )}

                {/* ADMIN ROUTES */}
                {/* {role === "admin" && (
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />

            <Route path="/about" element={<AboutPage />} />
          </>
        )} */}

            </Route>

        </Routes>
    );
};

export default AppRoutes;