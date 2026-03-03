import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import type { product } from "../../../types/product";
import { fetchProductByCategoryId } from "../../../services/productService";

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
}

const categoryProducts: Record<string, Product[]> = {
  electronics: [
    {
      id: 1,
      name: "iPhone 15",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71",
      rating: 4.5,
      reviews: 24,
    },
    {
      id: 2,
      name: "Samsung Smart TV",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
      rating: 4.2,
      reviews: 18,
    },
    {
      id: 3,
      name: "Boat Headphones",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd",
      rating: 4.0,
      reviews: 12,
    },
    {
      id: 4,
      name: "Dell Laptop",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      rating: 4.7,
      reviews: 30,
    },
    {
      id: 5,
      name: "Canon Camera",
      image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c",
      rating: 4.3,
      reviews: 9,
    },
  ],
  clothing: [
    {
      id: 6,
      name: "Men's Jacket",
      image: "https://images.unsplash.com/photo-1520975928316-1b5f75cba41b",
      rating: 4.1,
      reviews: 15,
    },
    {
      id: 7,
      name: "Nike Sneakers",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      rating: 4.6,
      reviews: 20,
    },
  ],
  "home-decor": [
    {
      id: 8,
      name: "Wooden Sofa",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      rating: 4.4,
      reviews: 10,
    },
    {
      id: 9,
      name: "Wall Clock",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657",
      rating: 4.2,
      reviews: 7,
    },
  ],
};

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

  // const products = categoryProducts[categoryName || ""] || [];

  return (
    <div>
      {/* Title */}
      <h1 className="mb-6 capitalize text-blue-900 text-2xl font-bold">
        {categoryName?.replace("-", " ")} Products
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/feedback/${product.id}`)}
            className="card cursor-pointer hover:scale-[1.02] transition duration-200"
          >
            {/* Image */}
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="mb-2">{product.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {product.rating}
              </span>
            </div>

            {/* Reviews */}
            <p className="text-sm text-gray-500">
              {product.reviews} Reviews
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategoryPage;