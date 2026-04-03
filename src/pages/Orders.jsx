import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getOrders(userId).then(setOrders);
  }, []);

  const handleDelete = (id) => {
    deleteOrder(id).then(() => {
      setOrders(prev => prev.filter(o => (o.id || o._id) !== id));
    });
  };

  return (
  <div style={page}>
    <h1 style={title}>📦 Your Orders</h1>

    <div style={ordersContainer}>
      {orders.map((order, i) => (
        <div key={i} style={orderCard}>
          
          <div style={orderHeader}>
            <h3 style={{ margin: 0 }}>Order #{i + 1}</h3>

            <button
              onClick={() => handleDelete(order.id || order._id)}
              style={dangerBtn}
            >
              Delete
            </button>
          </div>

          <div style={divider}></div>

          {order.products.map((p, j) => (
            <div key={j} style={productRow}>
              <div style={imgContainer}>
                <img src={p.imageUrl} style={imgSmall} />
              </div>

              <div style={productInfo}>
                <h4 style={productName}>{p.name}</h4>
                <p style={price}>₹ {p.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
}

export default Orders;

const page = {
  padding: "30px",
  background: "#f1f5f9",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#0f172a",
  fontSize: "30px",
  fontWeight: "bold"
};

const ordersContainer = {
  maxWidth: "900px",
  margin: "0 auto"
};

const orderCard = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "25px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const divider = {
  height: "1px",
  background: "#e5e7eb",
  margin: "15px 0"
};

const productRow = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "10px 0"
};

const imgContainer = {
  paddingRight: "10px",
  borderRight: "1px solid #e5e7eb"
};

const imgSmall = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  borderRadius: "8px"
};

const productInfo = {
  paddingLeft: "10px"
};

const productName = {
  margin: 0,
  fontSize: "16px",
  color: "#0f172a"
};

const price = {
  margin: "5px 0 0",
  color: "#374151",
  fontWeight: "500"
};

const dangerBtn = {
  padding: "8px 14px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
};