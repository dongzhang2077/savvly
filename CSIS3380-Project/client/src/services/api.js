import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const TOKEN_STORAGE_KEY = "savvly_token";
const USER_STORAGE_KEY = "savvly_user";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = read(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.statusText ||
      error.message ||
      "Request failed";
    throw new Error(message);
  }
);

const getStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

const persist = (key, value) => {
  const storage = getStorage();
  if (!storage) return;

  if (value === undefined || value === null) {
    storage.removeItem(key);
  } else {
    storage.setItem(key, value);
  }
};

const read = (key) => {
  const storage = getStorage();
  if (!storage) return null;

  return storage.getItem(key);
};

// API Methods using axios
export const getBudgets = (params = {}) =>
  apiClient.get("/budgets", { params });

export const getBudgetById = (id) => apiClient.get(`/budgets/${id}`);

export const createBudget = (payload) => apiClient.post("/budgets", payload);

export const updateBudget = (id, payload) =>
  apiClient.put(`/budgets/${id}`, payload);

export const deleteBudget = (id) => apiClient.delete(`/budgets/${id}`);

export const getTransactions = (params = {}) =>
  apiClient.get("/transactions", { params });

export const createTransaction = (payload) =>
  apiClient.post("/transactions", payload);

export const deleteTransaction = (id) =>
  apiClient.delete(`/transactions/${id}`);

export const registerUser = (payload) =>
  apiClient.post("/auth/register", payload);

export const loginUser = (payload) => apiClient.post("/auth/login", payload);

// External API for exchange rates
export const getExchangeRates = async (base = "USD") => {
  try {
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${base}`
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Failed to load exchange rates";
    throw new Error(message);
  }
};

export const saveSession = ({ user, token }) => {
  if (!token || !user) return;
  persist(TOKEN_STORAGE_KEY, token);
  persist(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  persist(TOKEN_STORAGE_KEY, null);
  persist(USER_STORAGE_KEY, null);
};

export const getSession = () => {
  const rawUser = read(USER_STORAGE_KEY);
  const token = read(TOKEN_STORAGE_KEY);

  if (!rawUser || !token) return null;

  try {
    return { user: JSON.parse(rawUser), token };
  } catch {
    return null;
  }
};
