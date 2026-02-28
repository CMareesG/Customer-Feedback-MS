import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Shirt,
  Sofa,
  Info,
  Phone,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const SidebarLayout = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <div className="p-5 text-2xl font-bold border-b border-gray-700">
            Feedback360
          </div>

          <nav className="mt-5 space-y-2">

            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg mx-3 transition ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            {/* Categories */}
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full px-5 py-3 mx-3 rounded-lg hover:bg-gray-800 text-gray-300"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} />
                  Categories
                </div>
                {isCategoryOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {isCategoryOpen && (
                <div className="ml-10 mt-2 space-y-2 text-sm">

                  <NavLink
                    to="/categories/electronics"
                    className="flex items-center gap-2 hover:text-white text-gray-400"
                  >
                    <ShoppingBag size={16} />
                    Electronics
                  </NavLink>

                  <NavLink
                    to="/categories/clothing"
                    className="flex items-center gap-2 hover:text-white text-gray-400"
                  >
                    <Shirt size={16} />
                    Clothing
                  </NavLink>

                  <NavLink
                    to="/categories/home-decor"
                    className="flex items-center gap-2 hover:text-white text-gray-400"
                  >
                    <Sofa size={16} />
                    Home Decor
                  </NavLink>

                </div>
              )}
            </div>

            {/* About */}
            <NavLink
              to="/about"
              className="flex items-center gap-3 px-5 py-3 rounded-lg mx-3 hover:bg-gray-800 text-gray-300"
            >
              <Info size={20} />
              About
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              className="flex items-center gap-3 px-5 py-3 rounded-lg mx-3 hover:bg-gray-800 text-gray-300"
            >
              <Phone size={20} />
              Contact
            </NavLink>

          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mb-5 space-y-2">

          <NavLink
            to="/profile"
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg hover:bg-gray-800 text-gray-300"
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg hover:bg-gray-800 text-gray-300"
          >
            <Settings size={20} />
            Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-lg hover:bg-red-600 text-gray-300 w-[calc(100%-1.5rem)] transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default SidebarLayout;