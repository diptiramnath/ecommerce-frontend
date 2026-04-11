import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId, amount } = location.state || {};

  const [method, setMethod] = useState("CARD");

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          amount,
          method
        })
      });

      const data = await response.text();

      alert(data);

      if (data.includes("Successful")) {
        navigate("/orders");
      }

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div style={page}>
  <div style={wrapper}>

    {/* LEFT SIDE */}
    <div style={section}>
      <h2 style={heading}>Payment Details</h2>

      <label style={label}>Payment Method</label>
      <select style={select} value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="CARD">Card</option>
        <option value="UPI">UPI</option>
        <option value="COD">Cash on Delivery</option>
      </select>

      {method === "CARD" && (
        <>
          <label style={label}>Card Number</label>
          <input style={input} placeholder="1234 5678 9012 3456" />

          <label style={label}>Expiry</label>
          <input style={input} placeholder="MM/YY" />

          <label style={label}>CVV</label>
          <input style={input} placeholder="123" />
        </>
      )}

      {method === "UPI" && (
        <>
          <label style={label}>UPI ID</label>
          <input style={input} placeholder="name@upi" />
        </>
      )}

      {method === "COD" && (
        <p style={{ color: "#6b7280" }}>
          Pay when the product is delivered.
        </p>
      )}
    </div>

    {/* RIGHT SIDE */}
    <div style={summaryBox}>
      <h2 style={heading}>Order Summary</h2>

      <p style={price}>₹ {amount}</p>

      <button style={payBtn} onClick={handlePayment}>
        Pay Now
      </button>
    </div>

  </div>
</div>
  );
};

export default Payment;


const page = {
  background: "#f1f5f9",
  minHeight: "100vh",
  padding: "40px 20px"
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "25px"
};

const section = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
};

const heading = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#111827"
};

const input = {
  width: "80%",           // 🔥 reduce width a bit
  margin: "0 auto",       // 🔥 THIS centers it
  display: "block",       // 🔥 required for margin auto
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const select = {
  width: "83%",
  margin: "0 auto",
  display: "block",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const payBtn = {
  width: "100%",
  padding: "14px",
  background: "#111827", // 🔥 black (premium look)
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};

const summaryBox = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  height: "fit-content"
};

const price = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "15px"
};

const label = {
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "6px",
  display: "block",
  color: "#374151"
};