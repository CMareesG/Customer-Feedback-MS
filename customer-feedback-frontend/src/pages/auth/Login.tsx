import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

import "../../styles/Auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const response = await loginUser(email, password);

      // store tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userRole", response.user);

      // redirect based on role
      if (response.user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err: unknown) {

      setError("Invalid email or password");
      console.log("Login error:", err);

      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 4000);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-brand">
          <div className="brand-mark">CF</div>
          <div className="brand-name">Customer Feedback</div>
        </div>

        <h1 className="auth-title">Welcome Back</h1>

        <div className="auth-subtitle">
          Sign in to continue to your feedback dashboard
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleLogin}>

          <div className="input-group">

            <span className="input-icon">📧</span>

            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <span className="input-icon">🔒</span>

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <p
            className="auth-forgot"
            onClick={() => navigate("/forgot")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don’t have an account?
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>

      </div>
      {showError && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg 
                  flex items-center gap-4 animate-slide-up z-50">

          <span>{error}</span>

          <button
            onClick={() => setShowError(false)}
            className="text-white font-bold text-lg leading-none"
          >
            ×
          </button>

        </div>
      )}
    </div>

  );

};

export default Login;