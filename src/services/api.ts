
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const updateOrderDecision = async (orderId: string, decision: string) => {
  const response = await api.patch(`/orders/${orderId}`, { decision });
  return response.data;
};

export const toggleOrderStatus = async (orderId: string, isActive: boolean) => {
  const response = await api.patch(`/orders/${orderId}`, { active: isActive });
  return response.data;
};

export default api;
