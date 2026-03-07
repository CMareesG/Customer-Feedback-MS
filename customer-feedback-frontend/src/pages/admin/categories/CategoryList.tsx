import { Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  const parentCategories = categories.filter((c) => !c.parentId);

  return (
    <div className="space-y-2">
      {parentCategories.length === 0 ? (
        <p className="text-text-muted text-center py-8">No categories found</p>
      ) : (
        parentCategories.map((category) => {
          const children = categories.filter((c) => c.parentId === category.id);
          const isExpanded = expandedIds.has(category.id);

          return (
            <div key={category.id} className="border border-white/10 rounded-lg">
              {/* Category */}
              <div className="bg-bg-2 p-4 flex items-center justify-between hover:bg-white/5 transition">
                <div className="flex items-center gap-3 flex-1">
                  {children.length > 0 && (
                    <button
                      onClick={() => toggleExpand(category.id)}
                      className="text-text-muted hover:text-text-primary"
                    >
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  )}
                  {children.length === 0 && <div className="w-5" />}
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-text-muted">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    disabled={isLoading}
                    className="p-2 hover:bg-accent-1/20 rounded-lg text-accent-1 transition disabled:opacity-50"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    disabled={isLoading}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Subcategories */}
              {isExpanded && children.length > 0 && (
                <div className="bg-bg-1 border-t border-white/10 p-4 space-y-2">
                  {children.map((subcat) => (
                    <div
                      key={subcat.id}
                      className="bg-bg-2 p-3 rounded-lg flex items-center justify-between hover:bg-white/5 transition"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-1 h-1 bg-accent-1 rounded-full" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">
                            {subcat.name}
                          </h4>
                          {subcat.description && (
                            <p className="text-sm text-text-muted">
                              {subcat.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(subcat)}
                          disabled={isLoading}
                          className="p-2 hover:bg-accent-1/20 rounded-lg text-accent-1 transition disabled:opacity-50"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(subcat.id)}
                          disabled={isLoading}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoryList;
