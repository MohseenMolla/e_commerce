import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders");
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Customer Orders
          </h1>

          <Link
            to="/admin"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{o.customer?.name}</td>
                    <td className="p-3">{o.customer?.phone}</td>
                    <td className="p-3">{o.customer?.address}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ${o.totalAmount}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          o.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : o.orderStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
