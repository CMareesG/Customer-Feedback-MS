import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { logout } from "../services/authService";

const AdminSidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if(refreshToken){
      await logout(refreshToken)
      navigate("/");
      console.log("Loged out successfully");
      localStorage.clear();
    }
    else{
      console.log("Refresh token not found");
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-1 text-text-primary">

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-2 text-text-primary flex flex-col justify-between transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-5">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1">
          <div className="p-5 text-2xl font-bold border-b border-white/10">
            <div className="ml-8 gap-3">
              FeedbackMS
            </div>
            <span className="text-xs text-accent-1 font-semibold ml-[52px]">
              ADMIN
            </span>
          </div>

          <nav className="mt-5 space-y-2">

            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "hover:bg-white/10 text-text-muted"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "hover:bg-white/10 text-text-muted"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <ShoppingBag size={20} />
              Categories
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "hover:bg-white/10 text-text-muted"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Package size={20} />
              Products
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "hover:bg-white/10 text-text-muted"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users size={20} />
              Users
            </NavLink>

            <NavLink
              to="/admin/about"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-accent-1 text-white"
                    : "hover:bg-white/10 text-text-muted"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <ShoppingBag size={20} />
              About
            </NavLink>

          </nav>
        </div>

        <div className="mb-5 space-y-2">

          <NavLink
            to="/admin/profile"
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg hover:bg-white/10 text-text-muted"
            onClick={() => setIsSidebarOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg hover:bg-red-500 text-text-muted w-[calc(100%-1.5rem)] transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-text-primary"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminSidebarLayout;

