import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
        setSelectedImage(res.data.product.images?.[0]);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-24 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* IMAGE GALLERY */}
      <div className="space-y-4">
        <div className="relative group border rounded overflow-hidden">
          <img
            src={selectedImage || "/placeholder.png"}
            alt={product.title}
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Optional Zoom Icon */}
          <div className="absolute top-3 right-3 bg-white/70 p-2 rounded-full shadow">
            🔍
          </div>
        </div>

        {/* Thumbnails */}
        {product.images?.length > 1 && (
          <div className="flex gap-3 mt-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-cover rounded cursor-pointer border-2
                  ${selectedImage === img ? "border-orange-600" : "border-gray-300"}
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{product.title}</h1>

        {/* Rating & Stock */}
        <div className="flex items-center gap-4">
          <div className="flex items-center text-orange-500 gap-1">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={18} />
            ))}
          </div>
          <span className="text-gray-600 text-sm">({product.reviews || 0} Reviews)</span>
          <span className={`ml-auto font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-xl md:text-2xl font-bold text-orange-600">${product.price}</p>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/order", { state: { product } })}
            className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            Buy Now
          </button>
        </div>

        {/* Optional extra info */}
        <div className="text-gray-500 text-sm mt-6 space-y-1">
          <p><span className="font-medium">Category:</span> {product.category}</p>
          
          <p><span className="font-medium">Brand:</span> {product.brand || "Meshomart"}</p>
        </div>
      </div>
    </div>
  );
}
