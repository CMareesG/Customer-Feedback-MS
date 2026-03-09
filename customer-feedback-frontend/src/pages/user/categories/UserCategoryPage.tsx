import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import type { product } from "../../../types/product";
import { fetchProductByCategoryId } from "../../../services/productService";


const UserCategoryPage: React.FC = () => {
  console.log(useParams());
  const { categoryName,categoryId } = useParams();
  const [products,setProducts]=useState<product[]>([]);
  const navigate = useNavigate();
  useEffect(()=>{
    async function getProducts(){
      const data: product[] = await fetchProductByCategoryId(categoryId || "");
      setProducts(data);
    }
    getProducts();
  },[categoryId]);


  return (
    <div className="page-container">
      <h1 className="mb-6 capitalize text-text-primary text-2xl font-bold">
        {categoryName?.replace("-", " ")} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/feedback/${product.id}`)}
            className="card cursor-pointer hover:scale-[1.02] transition duration-200"
          >
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mb-2 text-text-primary">{product.name}</h2>

            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-text-muted"
                  }
                />
              ))}
              <span className="text-sm text-text-muted ml-2">
                {product.rating}
              </span>
            </div>

            <p className="text-sm text-text-muted">
              {product.reviews} Reviews
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategoryPage;