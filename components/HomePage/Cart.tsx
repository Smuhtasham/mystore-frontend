"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

type CartItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  quantity: number;
};

type Cart = {
  items: CartItem[];
};

const fetchCart = async (): Promise<Cart> => {
  const res = await api.get("/cart", { withCredentials: true });
  return res.data;
};

export default function CartPage() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      await api.delete("/cart", {
        data: { productId },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleRemove = (productId: string) => {
    removeFromCartMutation.mutate(productId);
  };

  if (isLoading) return <p className="w-[90%] mx-auto py-6">Loading cart...</p>;

  return (
    <div className="w-[90%] mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="space-y-4">
          {cart.items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <p className="font-medium text-black">{item.product.name}</p>
                <p>${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-500 cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
