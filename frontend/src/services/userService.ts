import API from "api/axios";
// ========================================
// TYPES
// ========================================

export interface LoginPayload {
  username: string;

  password: string;
}

export interface CreateUserPayload {
  username: string;

  email: string;

  password: string;

  role: string;
}

export interface LoginResponse {
  token: string;

  user: {
    id: number;

    name: string;

    email: string;

    role: string;
  };
}

// ========================================
// LOGIN USER
// ========================================

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  try {
    const response = await API.post("/login/", payload);
    // SAVE AUTH DATA
    localStorage.setItem("token", response.data.token);

    localStorage.setItem("role", response.data.role);

    localStorage.setItem("username", response.data.username);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ========================================
// CREATE USER
// ========================================

export const createUser = async (payload: CreateUserPayload) => {
  try {
    const token = localStorage.getItem("token");
    console.log(payload);
    const response = await API.post("/create-user/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "User creation failed");
  }
};

// ========================================
// LOGOUT USER
// ========================================

export const logoutUser = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("role");

  localStorage.removeItem("username");
};

// ========================================
// GET AUTH USER
// ========================================

export const getAuthUser = () => {
  return {
    token: localStorage.getItem("token"),

    role: localStorage.getItem("role"),

    username: localStorage.getItem("username"),
  };
};

// ========================================
// CHECK AUTH
// ========================================

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

// ========================================
// CHECK ROLE
// ========================================

export const hasRole = (allowedRoles: string[]): boolean => {
  const role = localStorage.getItem("role");

  if (!role) return false;

  return allowedRoles.includes(role);
};

export default API;
