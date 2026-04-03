import { useEffect, useState } from "react";
import { getCart, removeFromCart, placeOrder } from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    getCart(userId).then(setCart);
  };

  const handleRemove = (productId) => {
    removeFromCart(userId, productId).then(loadCart);
  };

  const handleOrder = async () => {
    await placeOrder(userId);
    alert("Order placed");
    loadCart();
  };

  const total = cart?.products?.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div style={page}>
      <h1 style={{ textAlign: "center" }}>🛒 Your Cart</h1>

      {cart?.products?.map(p => (
        <div key={p.productId} style={card}>
          <img src={p.imageUrl} style={img} />

          <div>
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>

            <button onClick={() => handleRemove(p.productId)} style={dangerBtn}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ₹ {total}</h2>

      <button onClick={handleOrder} style={primaryBtn}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
const page = {
  padding: "20px",
  background: "#f8fafc",
  minHeight: "100vh"
};

const card = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const orderCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const productRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const img = {
  width: "120px",
  borderRadius: "8px"
};

const imgSmall = {
  width: "60px",
  borderRadius: "6px"
};

const primaryBtn = {
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const authPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#0f172a"
};

const authCard = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};