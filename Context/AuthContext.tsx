// context/AuthContext.tsx
"use client";
import getToken from "@/utils/getToken";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      if(token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false);
      }
     
    };
    getData();
  }, []);

  const logout = () => {
    document.cookie = "token; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  const login = () => {
    setIsAuthenticated(true);
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
