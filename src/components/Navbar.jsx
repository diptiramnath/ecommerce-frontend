import { useEffect, useState } from "react";
import "../styles/navbar.css"; // 🔥 IMPORTANT

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
    <div className="navbar">

      {/* LOGO */}
      <h2
        className="logo2"
        onClick={() => (window.location.href = "/")}
      >
        🛒 Arvind's kutty kadai
      </h2>

      {/* NAV LINKS */}
      <div className="nav-links">

        <button onClick={() => window.location.href = "/"} className="nav-btn">
          Home
        </button>

        <button onClick={() => window.location.href = "/cart"} className="nav-btn">
          Cart
        </button>

        {userId && (
          <button onClick={() => window.location.href = "/orders"} className="nav-btn">
            Orders
          </button>
        )}

        {!userId ? (
          <>
            <button onClick={() => window.location.href = "/login"} className="nav-btn">
              Login
            </button>

            <button onClick={() => window.location.href = "/register"} className="nav-btn outline">
              Register
            </button>
          </>
        ) : (
          <button onClick={logout} className="nav-btn logout">
            Logout
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;