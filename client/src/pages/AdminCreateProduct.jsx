import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminCreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) =>
        data.append(key, form[key])
      );

      images.forEach((img) => data.append("images", img));

      await api.post("/products", data);

      navigate("/admin");
    } catch (err) {
      alert("Product creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Product
        </h1>

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              className="border p-2 w-full rounded"
              placeholder="Product title"
              required
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Product description"
              required
              rows={4}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Price ($)</label>
              <input
                className="border p-2 w-full rounded"
                placeholder="Price"
                type="number"
                required
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Stock</label>
              <input
                className="border p-2 w-full rounded"
                placeholder="Stock"
                type="number"
                required
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed p-4 rounded text-center">
            <label className="cursor-pointer text-blue-600 font-semibold">
              Click to select multiple images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Preview Grid */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {previews.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt="preview"
                    className="h-28 w-full object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            disabled={loading}
            className="bg-orange-500 text-white p-3 w-full rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
