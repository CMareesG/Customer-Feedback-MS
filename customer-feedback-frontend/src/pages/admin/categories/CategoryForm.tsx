import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

interface CategoryFormProps {
  category?: Category;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    parentId?: string;
  }) => void;
  categories?: Category[];
  isSubcategory?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  categories = [],
  isSubcategory = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        parentId: isSubcategory ? category.parentId || "" : "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        parentId: "",
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-bg-2 rounded-lg max-w-md w-full p-6 text-text-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {category ? "Edit" : "Create"}{" "}
            {isSubcategory ? "Subcategory" : "Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSubcategory && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Parent Category
              </label>
              <select
                value={formData.parentId}
                onChange={(e) =>
                  setFormData({ ...formData, parentId: e.target.value })
                }
                required
                className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-1"
              >
                <option value="">Select Category</option>
                {categories
                  .filter((c) => !c.parentId)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-bg-1 border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-1 resize-none"
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-text-muted hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-accent-1 text-white hover:bg-accent-1/80 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
