import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/adminService";

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formModal, setFormModal] = useState({
    isOpen: false,
    isSubcategory: false,
    category: null as Category | null,
  });
  const [createCategoryAlert, setCreateCategoryAlert] = useState("");
  const [deleteCategoryAlert,setDeleteCategoryAlert] = useState("");
  const [updateCategoryAlert,setUpdateCategoryAlert] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setFormModal({
      isOpen: true,
      isSubcategory: false,
      category: null,
    });
  };

  const handleCreateSubcategory = () => {
    setFormModal({
      isOpen: true,
      isSubcategory: true,
      category: null,
    });
  };

  const handleEdit = (category: Category) => {
    setFormModal({
      isOpen: true,
      isSubcategory: !!category.parentId,
      category,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const categoryname=categories.find(c=>c.id===id)
      try {
        setIsLoading(true);
        await deleteCategory(id);
        await loadCategories();
        setDeleteCategoryAlert(`Category "${categoryname?.name}" has been deleted`);
        setTimeout(() => setDeleteCategoryAlert(""), 3000);
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (data: {
    name: string;
    description?: string;
    parentId?: string;
  }) => {
    try {
      setIsLoading(true);
      if (formModal.category) {
        await updateCategory(formModal.category.id, data);
        setUpdateCategoryAlert(`Category "${data.name}" has been updated`);
        setTimeout(() => setUpdateCategoryAlert(""), 3000);
      } else {
        await createCategory(data);
        setCreateCategoryAlert(`Category "${data.name}" has been created`);
        setTimeout(() => setCreateCategoryAlert(""), 3000);
      }
      await loadCategories();
      setFormModal({ isOpen: false, isSubcategory: false, category: null });
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setFormModal({ isOpen: false, isSubcategory: false, category: null });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Categories & Subcategories
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleCreateSubcategory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-2 text-white hover:bg-accent-2/80 transition"
          >
            <Plus size={20} />
            Add Subcategory
          </button>
          <button
            onClick={handleCreateCategory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-1 text-white hover:bg-accent-1/80 transition"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <CategoryForm
        category={formModal.category || undefined}
        isOpen={formModal.isOpen}
        isLoading={isLoading}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        categories={categories}
        isSubcategory={formModal.isSubcategory}
      />
      {createCategoryAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {createCategoryAlert}
          </div>
      )}
      {deleteCategoryAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {deleteCategoryAlert}
          </div>
      )}
      {updateCategoryAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {updateCategoryAlert}
          </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
