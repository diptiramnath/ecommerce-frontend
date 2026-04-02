import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 NEW ERROR STATE
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 EMAIL VALIDATION FUNCTION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    // 🔥 VALIDATION CHECK
    if (!isValidEmail(username)) {
      setError("❌ Please enter a valid email (e.g., abc@gmail.com)");
      return;
    }

    setError(""); // clear previous error

    const user = { username, password };

    loginUser(user)
      .then(data => {
        console.log("🔥 Login response:", data);

        // 🔥 STORE USER DATA
        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role);

        alert("✅ Login successful");

        navigate("/");
      })
      .catch(err => {
        console.error(err);
        setError("❌ Invalid credentials");
      });
  };

  return (
    <div style={{
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#0f172a",
      height: "100vh",
      color: "white"
    }}>
      <h2>🔐 Login</h2>

      <input
        placeholder="Username (Email)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "8px" }}
      /><br />

      {/* 🔥 ERROR MESSAGE */}
      {error && (
        <p style={{ color: "red", marginTop: "5px" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#22c55e",
          border: "none",
          color: "white",
          borderRadius: "5px"
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;