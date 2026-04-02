import { useEffect, useState } from "react";
import { getCart, removeFromCart, placeOrder } from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    getCart(userId).then((data) => {
      console.log("🛒 CART DATA:", data); // DEBUG
      setCart(data);
    });
  };

  const handleRemove = (productId) => {
    removeFromCart(userId, productId).then(loadCart);
  };

  const handleOrder = () => {
    placeOrder(userId).then(() => {
      alert("Order placed!");
      loadCart();
    });
  };

  // 🔥 FALLBACK IMAGE LOGIC
  const getFallbackImage = (name) => {
    const n = name?.toLowerCase() || "";

    if (n.includes("hp")) return "/images/hp.jpg";
    if (n.includes("dell")) return "/images/dell.jpg";
    if (n.includes("vivo")) return "/images/vivobook.jpg";
    if (n.includes("mac")) return "/images/macbook.jpg";

    if (n.includes("iphone")) return "/images/iphone.jpg";
    if (n.includes("samsung")) return "/images/samsung.jpg";
    if (n.includes("redmi")) return "/images/redmi.jpg";

    if (n.includes("ipad")) return "/images/ipad.jpg";

    if (n.includes("airpods")) return "/images/airpods.jpg";
    if (n.includes("sony")) return "/images/sony.jpg";

    return "/images/dell.jpg";
  };

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Cart is empty</h2>
      </div>
    );
  }

  const total = cart.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Your Cart</h1>

      {cart.products.map((p) => (
        <div
          key={p.productId}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            textAlign: "center"
          }}
        >
          {/* 🔥 FIXED IMAGE */}
          <img
            src={
              p.imageUrl && p.imageUrl !== ""
                ? p.imageUrl
                : getFallbackImage(p.name)
            }
            alt={p.name}
            style={{
              width: "120px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px"
            }}
            onError={(e) => {
              e.target.src = "/images/dell.jpg";
            }}
          />

          <h3>{p.name}</h3>
          <p>₹ {p.price}</p>

          <button
            onClick={() => handleRemove(p.productId)}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹ {total}</h2>

      <button
        onClick={handleOrder}
        style={{
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Cart;