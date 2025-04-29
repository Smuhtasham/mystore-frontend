"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import ProductCard from "../UI/ProductCard";

const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export default function ProductsList() {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="px-20 py-10">Loading products...</p>;
  if (isError) return <p className="px-20 py-10">Failed to load products.</p>;

  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
