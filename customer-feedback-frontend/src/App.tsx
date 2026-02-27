import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import SidebarLayout from "./components/sidebar";

import { Dashboard } from "./pages/dashboard";
import CategoryPage from "./pages/category_page";
import ProductFeedbackPage from "./pages/product_feedback_page";
import AboutPage from "./pages/about_page";

function App() {
  const Page = ({ title }: { title: string }) => (
    <div className="p-10 text-3xl font-semibold">{title}</div>
  );

  return (
    <Routes>
      {/* Auth Pages (NO Sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* Layout Wrapper (WITH Sidebar) */}
      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Page title="Contact Page" />} />
        <Route path="/profile" element={<Page title="User Profile" />} />
        <Route path="/settings" element={<Page title="Settings Page" />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/feedback/:productId" element={<ProductFeedbackPage />} />
      </Route>
    </Routes>
  );
}

export default App;