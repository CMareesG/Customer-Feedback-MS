import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import FeedbackSection from "./FeedbackSection";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeedbackByProduct,
  createResponse,
} from "../../../services/adminService";

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  img?: string;
  categoryId: string;
}

interface Feedback {
  id: string;
  rating: number;
  review: string;
  user?: {
    name: string;
    email: string;
  };
  responses?: Response[];
}

interface Response {
  id: string;
  response: string;
  user?: {
    name: string;
  };
}

const AdminProductPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const [createProductAlert,setCreateProductAlert] = useState("");
  const [deleteProductAlert,setDeleteProductAlert] = useState("");
  const [updateProductAlert,setUpdateProductAlert] = useState("");
  


  const [formModal, setFormModal] = useState({
    isOpen: false,
    product: null as Product | null,
  });

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    product: null as Product | null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedSubcategory) {
      loadProductsByCategory(selectedSubcategory);
    } else {
      setProducts([]);
    }
  }, [selectedSubcategory]);

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

  const loadProductsByCategory = async (categoryId: string) => {
    try {
      setIsLoading(true);
      const data = await getProductsByCategory(categoryId);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFeedback = async (productId: string) => {
    try {
      setIsLoading(true);
      const data = await getFeedbackByProduct(productId);
      setFeedbacks(data);
    } catch (error) {
      console.error("Error loading feedback:", error);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = () => {
    if (!selectedSubcategory) {
      alert("Please select a subcategory first");
      return;
    }
    setFormModal({
      isOpen: true,
      product: null,
      
    });
    
  };

  const handleEdit = (product: Product) => {
    setFormModal({
      isOpen: true,
      product,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const productname=products.find(p=>p.id===id)
      try {
        setIsLoading(true);
        await deleteProduct(id);
        await loadProductsByCategory(selectedSubcategory);
        setDeleteProductAlert(`Product "${productname?.name}" has been deleted`);
        setTimeout(() => setDeleteProductAlert(""), 3000);
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSelectProduct = async (product: Product) => {
    await loadFeedback(product.id);
    setFeedbackModal({
      isOpen: true,
      product,
    });
  };

  const handleSubmit = async (fd: FormData) => {
  try {
    setIsLoading(true);

    if (!fd.has("categoryId")) {
      fd.append("categoryId", selectedSubcategory);
    }

    if (formModal.product) {
      await updateProduct(formModal.product.id, fd);
      setUpdateProductAlert(`Product "${formModal.product.name}" has been updated`);
      setTimeout(() => setUpdateProductAlert(""), 3000);
    } else {
      const newProduct = await createProduct(fd);
      if(newProduct)
      setCreateProductAlert(`Product "${newProduct.name}" has been created`);
      setTimeout(() => setCreateProductAlert(""), 3000);
    }

    await loadProductsByCategory(selectedSubcategory);

    setFormModal({ isOpen: false, product: null });
  } catch (error) {
    console.error("Error saving product:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleSendResponse = async (feedbackId: string, response: string) => {
    try {
      setIsLoading(true);
      await createResponse({
        feedbackId,
        response,
        userId: "current-user-id", // Replace with actual user ID from auth
      });
      // Reload feedback
      if (feedbackModal.product) {
        await loadFeedback(feedbackModal.product.id);
      }
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parentCategories = categories.filter((c) => !c.parentId);
  const subcategories = selectedCategory
    ? categories.filter((c) => c.parentId === selectedCategory)
    : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Products Management
        </h1>
        {selectedSubcategory && (
          <button
            onClick={handleCreateProduct}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-1 text-white hover:bg-accent-1/80 transition"
          >
            <Plus size={20} />
            Add Product
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-text-primary mb-3">Categories</h2>
          <div className="space-y-2">
            {parentCategories.length === 0 ? (
              <p className="text-text-muted">No categories found</p>
            ) : (
              parentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory("");
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === category.id
                      ? "bg-accent-1 text-white"
                      : "bg-bg-2 text-text-primary hover:bg-white/10"
                  }`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-text-primary mb-3">
            Subcategories
          </h2>
          <div className="space-y-2">
            {subcategories.length === 0 ? (
              <p className="text-text-muted">
                {selectedCategory
                  ? "No subcategories found"
                  : "Select a category"}
              </p>
            ) : (
              subcategories.map((subcat) => (
                <button
                  key={subcat.id}
                  onClick={() => setSelectedSubcategory(subcat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedSubcategory === subcat.id
                      ? "bg-accent-2 text-white"
                      : "bg-bg-2 text-text-primary hover:bg-white/10"
                  }`}
                >
                  {subcat.name}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedSubcategory && (
        <div>
          <h2 className="font-semibold text-text-primary mb-4">Products</h2>
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelectProduct={handleSelectProduct}
            isLoading={isLoading}
          />
        </div>
      )}

      <ProductForm
        product={formModal.product || undefined}
        categoryId={selectedSubcategory}
        isOpen={formModal.isOpen}
        isLoading={isLoading}
        onClose={() => setFormModal({ isOpen: false, product: null })}
        onSubmit={handleSubmit}
      />

      <FeedbackSection
        feedbacks={feedbacks}
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, product: null })}
        onSendResponse={handleSendResponse}
        isLoading={isLoading}
      />
      {deleteProductAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {deleteProductAlert}
          </div>
      )}
      {createProductAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {createProductAlert}
          </div>
      )}
      {updateProductAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-white text-black px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">
      {updateProductAlert}
          </div>
      )}
    </div>
  );
};

export default AdminProductPage;
