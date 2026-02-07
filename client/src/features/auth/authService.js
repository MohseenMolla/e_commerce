import api from "../../services/api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};
