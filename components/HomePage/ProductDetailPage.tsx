"use client";

import { api } from "@/utils/api";
import getToken from "@/utils/getToken";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [cartStatus, setCartStatus] = useState("");

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const userId = getToken();
        console.log(userId);
      if (!userId) {
        throw new Error("User is not authenticated.");
      }

      return await api.post(
        "/cart/add",
        { userId, productId, quantity: 1 },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      setCartStatus("Product added to cart!");
    },
    onError: (error: any) => {
      setCartStatus(error.message || "Login first.");
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate(product._id);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">Loading...</div>
    );
  }

  if (isError || !product) {
    return (
      <div className="h-[90vh] flex justify-center items-center text-red-500">
        Failed to load product.
      </div>
    );
  }

  return (
    <section>
      <div className="w-[90%] mt-6 mx-auto">
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
        <p className="mb-2 text-gray-700">{product.description}</p>
        <p className="text-lg font-bold">{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 px-4 py-2 bg-blue-500 text-white cursor-pointer rounded"
        >
          {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
        </button>

        {cartStatus && (
          <p className="mt-2 text-green-500">{cartStatus}</p>
        )}
      </div>
    </section>
  );
}
