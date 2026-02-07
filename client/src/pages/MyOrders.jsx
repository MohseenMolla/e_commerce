import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data.orders));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {orders.map(o => (
        <div key={o._id} className="border p-3 mb-2">
          Order #{o._id} — {o.status}
        </div>
      ))}
    </div>
  );
}
