"use client";
import { useAuth } from "@/Context/AuthContext";
import removeSession from "@/utils/removeSession";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    removeSession();
    router.replace("/login");
  };

  return (
    <nav className="flex items-center justify-between px-20 py-4 shadow bg-white">
      <Link href="/" className="font-bold text-xl">
        MyStore
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 cursor-pointer py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="px-4 cursor-pointer py-1 bg-blue-500 text-white rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
