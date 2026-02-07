import { useSelector } from "react-redux";
import api from "../services/api";

export default function Checkout() {
  const cart = useSelector(state => state.cart.items);

  const placeOrder = async () => {
    await api.post("/orders", {
     items: cart.map(i => ({
  product: i._id,
  quantity: i.qty,
  price: i.price
})),
totalAmount: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
name: "Guest",
phone: "N/A",
address: "N/A"

    });
    alert("Order placed!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Checkout</h1>
      <button onClick={placeOrder} className="bg-black text-white p-2 mt-4">
        Place Order
      </button>
    </div>
  );
}
