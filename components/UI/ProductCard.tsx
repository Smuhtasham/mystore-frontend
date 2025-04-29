import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border p-4 rounded shadow hover:shadow-md transition">
        <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-700 font-bold">${product.price}</p>
      </div>
    </Link>
  );
}
