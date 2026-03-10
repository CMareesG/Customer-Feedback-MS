import { Fragment, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Info,
  Phone,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { getCategories } from "../services/categoryService";
import type { category, categoryStatus } from "../types/category";
import { logout } from "../services/authService";

const SidebarLayout = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<category[]>([]);
  const [subcategories, setSubcategories] = useState<category[]>([]);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState<categoryStatus[]>(
    [],
  );
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

  async function handleCategories(): Promise<void> {
    await setIsCategoryOpen(!isCategoryOpen);
    if (categories.length === 0) {
      const response = await getCategories();
      const parentCategories: category[] = response.filter(
        (category: category): boolean => {
          return category.parentId == null;
        },
      );
      const subcategories: category[] = response.filter(
        (category: category): boolean => {
          return category.parentId != null;
        },
      );
      const parentCategoryStatus: categoryStatus[] = parentCategories.map(
        (category: category): categoryStatus => {
          return {
            name: category.name,
            isOpen: false,
            slug: category.slug,
            id:category.id
          };
        },
      );

      setCategories(parentCategories);
      setSubcategories(subcategories);
      setIsSubcategoryOpen(parentCategoryStatus);
      console.log(subcategories);
      console.log(parentCategories);
    }
  }
  function handleSubcategories(slug: string) {
    setIsSubcategoryOpen((prev:categoryStatus[]):categoryStatus[] => {
      return prev.map((category:categoryStatus):categoryStatus => {
        if (category.slug === slug)
          return { ...category, isOpen: !category.isOpen };
        return category;
      });
    });
  }

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
          </div>

          <nav className="mt-5 space-y-2">
            <NavLink
              to="/dashboard"
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

            <div>
              <button
                onClick={handleCategories}
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
                  {isSubcategoryOpen.map(
                    (category: categoryStatus, index: number) => {
                      return (
                        <Fragment key={index}>
                          <button
                            key={index}
                            onClick={() => {
                              handleSubcategories(category.slug);
                            }}
                            className="flex items-center justify-between w-full px-5 py-3 mx-3 rounded-lg hover:bg-gray-800 text-gray-300"
                          >
                            <div className="flex items-center gap-3">
                              {category.name}
                            </div>
                            {category.isOpen ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                          {category.isOpen && (
                            <div className="ml-10 mt-2 space-y-2 text-sm">
                              {subcategories.filter((subcategory:category):boolean=>{
                                return subcategory.parentId===category.id;
                              }).map((subcategory:category,index:number)=>{
                                console.log(subcategory);
                                return <NavLink
                                  key={index}
                                  to={`categories/${subcategory.slug}/${subcategory.id}`}
                                  className="flex items-center gap-2 hover:text-white text-gray-400"
                                >
                                  {subcategory.name}
                                </NavLink>
                              })}
                    
                            </div>
                          )}
                        </Fragment>
                      );
                    },
                  )}
                  
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className="flex items-center gap-3 px-5 py-3 rounded-lg mx-3 hover:bg-white/10 text-text-muted"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Info size={20} />
              About
            </NavLink>

            {/* <NavLink
              to="/contact"
              className="flex items-center gap-3 px-5 py-3 rounded-lg mx-3 hover:bg-white/10 text-text-muted"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Phone size={20} />
              Contact
            </NavLink> */}
          </nav>
        </div>

        <div className="mb-5 space-y-2">
          <NavLink
            to="/profile"
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

export default SidebarLayout;
