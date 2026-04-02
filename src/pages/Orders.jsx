import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(userId).then((data) => {
      console.log("📦 Orders:", data);
      setOrders(data);
    });
  };

  const handleDelete = (orderId) => {
    deleteOrder(orderId).then(() => {
      alert("✅ Order deleted");

      setOrders(prev =>
        prev.filter(o => (o.id || o._id) !== orderId)
      );
    });
  };

  const calculateTotal = (products) => {
    return products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
  };

  // 🔥 IMAGE FALLBACK BASED ON NAME
  const getImage = (p) => {
    if (p.imageUrl && p.imageUrl !== "") return p.imageUrl;

    const name = p.name.toLowerCase();

    if (name.includes("hp")) return "/images/hp.jpg";
    if (name.includes("dell")) return "/images/dell.jpg";
    if (name.includes("mac")) return "/images/macbook.jpg";
    if (name.includes("vivo")) return "/images/vivobook.jpg";

    if (name.includes("iphone")) return "/images/iphone.jpg";
    if (name.includes("samsung")) return "/images/samsung.jpg";
    if (name.includes("redmi")) return "/images/redmi.jpg";

    if (name.includes("ipad")) return "/images/ipad.jpg";
    if (name.includes("tab")) return "/images/samsungtab.jpg";

    if (name.includes("airpods")) return "/images/airpods.jpg";
    if (name.includes("sony")) return "/images/sony.jpg";

    return "/images/dell.jpg";
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: "center" }}>📦 Your Orders</h1>

      {orders.length === 0 && (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      )}

      {orders.map((order, index) => {
        const orderId = order.id || order._id;

        return (
          <div key={orderId} style={orderCard}>

            {/* HEADER */}
            <div style={orderHeader}>
              <h3>Order #{index + 1}</h3>

              <button
                onClick={() => handleDelete(orderId)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>

            {/* PRODUCTS */}
            <div style={productGrid}>
              {order.products.map((p, i) => (
                <div key={i} style={productCard}>
                  
                  {/* 🔥 IMAGE */}
                  <img
                    src={getImage(p)}
                    alt={p.name}
                    style={imageStyle}
                    onError={(e) => {
                      e.target.src = "/images/dell.jpg";
                    }}
                  />

                  <h4>{p.name}</h4>
                  <p>₹ {p.price}</p>
                  <p>Qty: {p.quantity}</p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <h3 style={{ marginTop: "15px" }}>
              Total: ₹ {calculateTotal(order.products)}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

// 🎨 STYLES

const pageStyle = {
  padding: "20px",
  background: "#0f172a",
  minHeight: "100vh",
  color: "white"
};

const orderCard = {
  background: "#1e293b",
  padding: "20px",
  marginBottom: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const productGrid = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginTop: "15px"
};

const productCard = {
  background: "#334155",
  padding: "10px",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center"
};

const imageStyle = {
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "10px"
};

export default Orders;