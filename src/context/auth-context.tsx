import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AuthUser } from "@/types/auth-0-types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      if (storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: any) => {
    setIsLoading(true);
    setUser(userData);
    setIsAuthenticated(true);

    Cookies.set("user", JSON.stringify(userData), { expires: 1 });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("user");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
