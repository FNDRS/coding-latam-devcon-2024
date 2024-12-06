import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Endpoints } from "@/services/api/enum";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get(Endpoints.ValidateToken, {
          withCredentials: true,
        });
        setIsAuthenticated(res.data.valid);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
