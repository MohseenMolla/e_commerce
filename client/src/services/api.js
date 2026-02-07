import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce2-ihrp.onrender.com/api",
});

// Routes that DO NOT need token
const PUBLIC_ROUTES = [
  { method: "post", url: "/orders" }, // guest checkout
  { method: "get", url: "/products" },
];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublic = PUBLIC_ROUTES.some(
      (route) =>
        route.method === config.method &&
        config.url?.startsWith(route.url)
    );

    // Attach token ONLY if route is not public
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
