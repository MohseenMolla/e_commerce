import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Mesho<span className="text-orange-500">mart</span>
          </h2>
          <p className="text-gray-400">
            Meshomart is your trusted online marketplace delivering quality
            products at the best prices with fast and secure delivery.
          </p>

          <div className="flex gap-4 mt-6">
            <Facebook className="hover:text-orange-500 cursor-pointer" />
            <Instagram className="hover:text-orange-500 cursor-pointer" />
            <Twitter className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-orange-500">Products</Link></li>
            <li><Link to="/login" className="hover:text-orange-500">Login</Link></li>
            <li><Link to="/register" className="hover:text-orange-500">Register</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-orange-500">Help Center</Link></li>
            <li><Link to="#" className="hover:text-orange-500">Returns</Link></li>
            <li><Link to="#" className="hover:text-orange-500">Shipping Info</Link></li>
            <li><Link to="#" className="hover:text-orange-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@meshomart.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Meshomart. All rights reserved.
      </div>
    </footer>
  );
}
