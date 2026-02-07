import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  // top of file
const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1510557880182-3b8e8c7b0b0b" },
  { name: "Fashion", img: "https://images.unsplash.com/photo-1521334884684-d80222895322" },
  { name: "Home & Living", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b" },
];

  const slides = [
  {
    img: "https://media.assettype.com/analyticsinsight%2F2024-07%2F91ed60d3-08d0-492e-b403-202eb5e697b7%2FTop-Cool-Gadgets-for-Men---Supraja.jpg",
    title: "Upgrade Your Lifestyle",
    subtitle: "Premium products, best prices, fast delivery",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Latest Tech Collection",
    subtitle: "Discover gadgets that make life easier",
  },
  {
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    title: "Style Meets Comfort",
    subtitle: "Trendy fashion for every occasion",
  },
];

const [current, setCurrent] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, 4000);
  return () => clearInterval(interval);
}, []);


  return (
    <div className="bg-gray-50 pt-20">


      {/* Hero Section */}
      <section className="relative h-[87vh] w-full overflow-hidden">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <img
        src={slide.img}
        alt="hero"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {slide.subtitle}
        </p>
        <a
          href="#products"
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  ))}
</section>






      {/* Latest Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 border-l-4 border-orange-600 pl-4">
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                  {product.title}
                </h3>

                <p className="text-orange-600 font-bold text-xl mb-3">
                  ${product.price}
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 text-center border border-orange-600 text-orange-600 py-2 rounded hover:bg-orange-50 transition"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() =>
                      navigate("/order", { state: { product } })
                    }
                    className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* Our secrvices section */}
{/* Why Choose Us */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-14">
      Why Choose Us
    </h2>

    <div className="grid md:grid-cols-4 gap-10">
      {[
        { icon: "🚚", title: "Fast Delivery", desc: "Quick and safe delivery at your doorstep" },
        { icon: "🔒", title: "Secure Payment", desc: "100% secure and encrypted transactions" },
        { icon: "💬", title: "24/7 Support", desc: "Always here to help you anytime" },
        { icon: "✅", title: "Quality Products", desc: "Verified premium quality items" },
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-5xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Brands */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h3 className="text-2xl font-bold mb-10 text-gray-800">
      Trusted by Top Brands
    </h3>

    <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
      {[
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      ].map((logo, i) => (
        <img key={i} src={logo} className="h-10 object-contain" />
      ))}
    </div>
  </div>
</section>


{/* customer review section */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold text-gray-900">
        What Our Customers Say
      </h2>
      <p className="text-gray-600 mt-3">
        Trusted by thousands of happy shoppers across the country
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Review 1 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="customer"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-800">Sarah Khan</h4>
            <div className="text-orange-500">★★★★★</div>
          </div>
        </div>
        <p className="text-gray-600">
          Meshomart made my shopping experience incredibly smooth. Fast delivery
          and amazing product quality. Highly recommended!
        </p>
      </div>

      {/* Review 2 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="customer"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-800">Rahim Ahmed</h4>
            <div className="text-orange-500">★★★★★</div>
          </div>
        </div>
        <p className="text-gray-600">
          The customer support is top-notch. I received my order within 24 hours.
          Will definitely shop again!
        </p>
      </div>

      {/* Review 3 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="customer"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-800">Nusrat Jahan</h4>
            <div className="text-orange-500">★★★★★</div>
          </div>
        </div>
        <p className="text-gray-600">
          Best online marketplace I’ve used so far. Secure payment and premium
          packaging impressed me a lot.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Newsletter */}
<section className="bg-gray-900 text-white py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-4">
      Subscribe to our Newsletter
    </h2>
    <p className="text-gray-300 mb-8">
      Get updates about new products and special offers
    </p>

    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-6 py-3 rounded-lg w-full md:w-96 text-black"
      />
      <button className="bg-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
        Subscribe
      </button>
    </div>
  </div>
</section>



    </div>
  );
}
