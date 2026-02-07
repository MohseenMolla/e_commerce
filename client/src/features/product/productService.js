import api from "../../services/api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.products;
};

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.product;
};
