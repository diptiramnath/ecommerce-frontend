import { useEffect, useState } from "react";
import { getCart, removeFromCart, placeOrder, updateQuantity } from "../services/api";

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

  const handleIncrease = (productId, qty) => {
  updateQuantity(userId, productId, qty + 1).then(loadCart);
};

const handleDecrease = (productId, qty) => {
  if (qty === 1) return;
  updateQuantity(userId, productId, qty - 1).then(loadCart);
};

  const total = cart?.products?.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
  <div style={page}>
    <h1 style={title}>Your Cart</h1>

    <div style={container}>
      <div style={cartSection}>
        {cart?.products?.map(p => (
          <div key={p.productId} style={card}>
            <div style={imgContainer}>
              <img src={p.imageUrl} style={img} />
            </div>

            <div style={details}>
              <h3 style={productName}>{p.name}</h3>
              <p style={price}>₹ {p.price}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => handleDecrease(p.productId, p.quantity)} style={qtyBtn}>-</button>

                  <span>{p.quantity}</span>

                  <button onClick={() => handleIncrease(p.productId, p.quantity)} style={qtyBtn}>+</button>
              </div>

              <button onClick={() => handleRemove(p.productId)} style={dangerBtn}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={summary}>
        <h2 style={{ marginBottom: "20px", color: "black" }}>Order Summary</h2>
        <p style={totalText}>Total: ₹ {total}</p>

        <button onClick={handleOrder} style={primaryBtn}>
          Place Order
        </button>
      </div>
    </div>
  </div>
);
}

export default Cart;

const page = {
  padding: "30px",
  background: "#f1f5f9", // light grey background
  minHeight: "100vh",
  color: "#0f172a" // dark text
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "32px",
  fontWeight: "bold",
  color: "#0f172a"
};

const container = {
  display: "flex",
  gap: "30px",
  alignItems: "flex-start"
};

const cartSection = {
  flex: 2
};

const card = {
  display: "flex",
  gap: "20px",
  padding: "15px",
  background: "#ffffff", // white cards like screenshot
  borderRadius: "12px",
  marginBottom: "20px",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)" // soft shadow
};

const details = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const productName = {
  margin: 0,
  fontSize: "18px",
  color: "#0f172a"
};

const price = {
  color: "#111827", // dark grey/black like screenshot
  fontWeight: "600"
};

const img = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px"
};

const summary = {
  flex: 1,
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  position: "sticky",
  top: "20px"
};

const totalText = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#0f172a"
};

const primaryBtn = {
  padding: "12px",
  background: "#22c55e", // same green as your products page
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  width: "100%",
  fontSize: "15px",
  fontWeight: "600"
};

const dangerBtn = {
  padding: "8px 12px",
  background: "#ef4444", // same red as logout button vibe
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  width: "fit-content"
};

const imgContainer = {
  paddingRight: "15px",
  borderRight: "1px solid #e5e7eb" // subtle divider like your UI
};

const qtyBtn = {
  padding: "5px 10px",
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
  borderRadius: "4px"
};