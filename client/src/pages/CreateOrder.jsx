import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function CreateOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product)
    return <p className="p-6 text-center">No product selected</p>;

  const total = product.price * qty;

  const submitOrder = async () => {
  try {
    setLoading(true);

    await api.post("/orders", {
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: [
        {
          product: product._id,
          quantity: qty,
          price: product.price
        }
      ],
      totalAmount: total
    });

    // ✅ After order → go back to Product Details
    navigate(`/product/${product._id}`, {
      state: { product }
    });

  } catch {
    setError("Order failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-6">
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">

        {/* LEFT: Customer Details */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

          <label className="block font-semibold mb-1">Full Name</label>
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Enter your name"
            value={form.name}
            onChange={e =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={e =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <label className="block font-semibold mb-1">
            Delivery Address
          </label>
          <textarea
            className="border p-2 w-full mb-3 rounded"
            placeholder="Enter delivery address"
            rows={4}
            value={form.address}
            onChange={e =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <p className="font-semibold mb-1">{product.title}</p>
          <p className="text-gray-600 mb-3">
            Price: ${product.price}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              −
            </button>

            <span className="font-bold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total:</span>
            <span className="text-orange-500">${total}</span>
          </div>

          {error && (
            <p className="text-red-500 mb-3">{error}</p>
          )}

          {/* Back to Product Details */}
          <button
            onClick={() =>
              navigate("/product/" + product._id, {
                state: { product }
              })
            }
            className="bg-gray-800 text-white w-full p-2 rounded mb-3"
          >
            Back to Product Details
          </button>

          {/* Place Order */}
          <button
            onClick={submitOrder}
            disabled={loading}
            className="bg-orange-500 text-white w-full p-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
