import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) =>
      setForm(res.data.product)
    );
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/products/${id}`, form);
      navigate("/admin");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Product
        </h1>

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Product Title</label>
            <input
              className="border p-2 w-full rounded"
              value={form.title || ""}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price ($)</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.price || ""}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              placeholder="Enter price"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white p-3 w-full rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-800 text-white p-3 w-full rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
