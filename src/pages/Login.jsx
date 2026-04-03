import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = { username, password };

    loginUser(user)
      .then(data => {
        console.log("Login response:", data);

        // 🔥 KEEP YOUR EXISTING STORAGE
        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role);

        alert("Login successful");
        navigate("/");
      })
      .catch(err => {
        console.error(err);
        alert("Invalid credentials");
      });
  };

  return (
    <div className="login-page">

      <div className="login-card">
        <h2>🔐 Login</h2>

        <input
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;