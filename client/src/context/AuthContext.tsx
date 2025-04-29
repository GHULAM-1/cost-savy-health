//Cookie
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser, login, logout, register } from "@/api/auth/api";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/types/context/auth-user";

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        if (typeof window !== "undefined") {
          // Parse cookies
          const cookies = document.cookie.split(";");
          const authTokenCookie = cookies.find((cookie) =>
            cookie.trim().startsWith("auth_token=")
          );
          const authUserCookie = cookies.find((cookie) =>
            cookie.trim().startsWith("auth_user=")
          );

          let token = null;
          let userData = null;

          if (authTokenCookie) {
            console.log(authTokenCookie);
            // Extract token value
            token = authTokenCookie.split("=")[1].trim();
            console.log("Found auth_token cookie");

            localStorage.setItem("token", token);

            if (authUserCookie) {
              try {
                const userCookieValue = authUserCookie.split("=")[1].trim();
                userData = JSON.parse(decodeURIComponent(userCookieValue));
                console.log("Found user data in cookie");

                localStorage.setItem("user", JSON.stringify(userData));

                document.cookie =
                  "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie =
                  "auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                setUser(userData);
                setIsLoading(false);
                return;
              } catch (e) {
                console.error("Error parsing user data cookie:", e);
              }
            }
          }

          token = localStorage.getItem("token");
          const storedUser = localStorage.getItem("user");

          if (token) {
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              const userData = await getCurrentUser(token);
              setUser(userData.data);
              localStorage.setItem("user", JSON.stringify(userData.data));
            }
          } else {
            console.log("No token found, redirecting to auth");
            router.push("/auth");
          }
        }
      } catch (err) {
        console.error("Auth check error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/auth");
        setError("Session expired. Please login again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  // Login function
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await register({ name, email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await logout(token);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
