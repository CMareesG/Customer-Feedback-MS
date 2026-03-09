import { Edit2, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  img?: string;
  categoryId: string;
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  isLoading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  onSelectProduct,
  isLoading = false,
}) => {
  if (products.length === 0) {
    return (
      <p className="text-text-muted text-center py-8">No products found</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-bg-2 border border-white/10 rounded-lg overflow-hidden hover:border-accent-1/50 transition"
        >
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition"
              onClick={() => onSelectProduct(product)}
            />
          )}
          <div className="p-4">
            <h3
              className="font-semibold text-text-primary mb-1 cursor-pointer hover:text-accent-1 transition"
              onClick={() => onSelectProduct(product)}
            >
              {product.name}
            </h3>
            <p className="text-sm text-text-muted mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-accent-1/20 rounded-lg text-accent-1 transition disabled:opacity-50"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 hover:bg-red-500/20 rounded-lg text-red-500 transition disabled:opacity-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
