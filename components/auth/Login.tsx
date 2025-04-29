"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      login(); // Update the authentication state in context
      router.replace("/products");
    } catch (err: any) {
      console.error("Login failed", err);
      alert(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 h-[90vh] flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          suppressHydrationWarning
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          suppressHydrationWarning
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          suppressHydrationWarning
          type="submit"
          className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
