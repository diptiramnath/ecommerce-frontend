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
      <h1 style={{ textAlign: "center" }}>📦 Your Orders</h1>

      {orders.map((order, i) => (
        <div key={i} style={orderCard}>
          <h3>Order #{i + 1}</h3>

          <button onClick={() => handleDelete(order.id || order._id)} style={dangerBtn}>
            Delete
          </button>

          {order.products.map((p, j) => (
            <div key={j} style={productRow}>
              <img src={p.imageUrl} style={imgSmall} />
              <div>
                <h4>{p.name}</h4>
                <p>₹ {p.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;

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