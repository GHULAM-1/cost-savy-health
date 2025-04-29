// api/authApi.ts

// Types
interface UserData {
  name: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

interface UserResponse {
  success: boolean;
  data: User;
}

interface UsersResponse {
  success: boolean;
  count: number;
  data: User[];
}

interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Array<{
    msg: string;
    param: string;
  }>;
}

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Global fetch options for authentication requests
const authFetchOptions = {
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
};

// Helper function to handle API requests
const apiRequest = async <T>(
  url: string,
  options: RequestInit,
  errorMessage: string
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as ErrorResponse).message || errorMessage);
    }

    return data as T;
  } catch (error) {
    console.error(`API error (${url}):`, error);
    throw error;
  }
};

// Add authorization header + always include credentials
const withAuth = (token: string, options: RequestInit = {}): RequestInit => {
  return {
    ...options,
    credentials: "include" as RequestCredentials, // important
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // ensure set
    },
  };
};

// Register a new user
export const register = async (userData: UserData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>(
    `${API_URL}/auth/register`,
    {
      ...authFetchOptions,
      method: "POST",
      body: JSON.stringify(userData),
    },
    "Registration failed"
  );
};

// Login a user
export const login = async (
  credentials: Credentials
): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>(
    `${API_URL}/auth/login`,
    {
      ...authFetchOptions,
      method: "POST",
      body: JSON.stringify(credentials),
    },
    "Login failed"
  );
};

// Get current user profile
export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  return apiRequest<UserResponse>(
    `${API_URL}/auth/me`,
    withAuth(token, {
      method: "GET",
    }),
    "Failed to get user data"
  );
};

// Logout user
export const logout = async (
  token: string
): Promise<{ success: boolean; data: {} }> => {
  return apiRequest<{ success: boolean; data: {} }>(
    `${API_URL}/auth/logout`,
    withAuth(token, {
      method: "POST", // safer to use POST for logout
    }),
    "Logout failed"
  );
};

// Google OAuth login URL
export const googleAuthUrl = `${API_URL}/auth/google`;

// Admin: Get all users (admin only)
export const getAllUsers = async (token: string): Promise<UsersResponse> => {
  return apiRequest<UsersResponse>(
    `${API_URL}/users`,
    withAuth(token, {
      method: "GET",
    }),
    "Failed to get users"
  );
};

// Admin: Get user by ID (admin only)
export const getUserById = async (
  token: string,
  userId: string
): Promise<UserResponse> => {
  return apiRequest<UserResponse>(
    `${API_URL}/users/${userId}`,
    withAuth(token, {
      method: "GET",
    }),
    "Failed to get user"
  );
};

// Admin: Update user (admin only)
export const updateUser = async (
  token: string,
  userId: string,
  userData: Partial<UserData>
): Promise<UserResponse> => {
  return apiRequest<UserResponse>(
    `${API_URL}/users/${userId}`,
    withAuth(token, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
    "Failed to update user"
  );
};

// Admin: Delete user (admin only)
export const deleteUser = async (
  token: string,
  userId: string
): Promise<{ success: boolean; data: {} }> => {
  return apiRequest<{ success: boolean; data: {} }>(
    `${API_URL}/users/${userId}`,
    withAuth(token, {
      method: "DELETE",
    }),
    "Failed to delete user"
  );
};
