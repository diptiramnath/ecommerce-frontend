import { useEffect, useState } from "react";

function Navbar() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    alert("Logged out");
    window.location.href = "/login";
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "linear-gradient(90deg, #0f172a, #1e293b)",
      color: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
    }}>
      
      {/* LOGO */}
      <h2
        style={{
          cursor: "pointer",
          margin: 0
        }}
        onClick={() => (window.location.href = "/")}
      >
        🛒 Arvind's kutti kadai
      </h2>

      {/* NAV LINKS */}
      <div style={{ display: "flex", gap: "15px" }}>
        
        <button style={btnStyle} onClick={() => window.location.href = "/"}>
          Home
        </button>

        <button style={btnStyle} onClick={() => window.location.href = "/cart"}>
          Cart
        </button>

        {/* 🔥 NEW ORDERS BUTTON */}
        {userId && (
          <button
            style={btnStyle}
            onClick={() => window.location.href = "/orders"}
          >
            📦 Orders
          </button>
        )}

        {!userId ? (
          <>
            <button style={btnStyle} onClick={() => window.location.href = "/login"}>
              Login
            </button>

            <button style={btnStyle} onClick={() => window.location.href = "/register"}>
              Register
            </button>
          </>
        ) : (
          <button style={logoutStyle} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

// 🎨 BUTTON STYLE
const btnStyle = {
  padding: "8px 14px",
  backgroundColor: "#334155",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s"
};

// 🔴 LOGOUT STYLE
const logoutStyle = {
  ...btnStyle,
  backgroundColor: "#ef4444"
};

export default Navbar;