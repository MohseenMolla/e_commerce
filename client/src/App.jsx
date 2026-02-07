import { Routes, Route } from "react-router-dom";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import CreateOrder from "./pages/CreateOrder";
import AdminOrders from "./pages/AdminOrders";
import Footer from "./pages/Footer";



/* Components */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create"
          element={
            <ProtectedRoute adminOnly>
              <AdminCreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <AdminEditProduct />
            </ProtectedRoute>
          }
        />
        <Route
  path="/order"
  element={
    
      <CreateOrder />
    
  }
/>
<Route
  path="/admin/orders"
  element={
    <ProtectedRoute adminOnly>
      <AdminOrders />
    </ProtectedRoute>
  }
/>


      </Routes>
      <Footer />

    </>
  );
}

export default App;
