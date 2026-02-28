import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">CF</div>
          <div className="brand-name">Customer Feedback</div>
        </div>

        <h1 className="auth-title">Welcome Back</h1>
        <div className="auth-subtitle">Sign in to continue to your feedback dashboard</div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input type="email" placeholder="Email" className="auth-input" />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="Password" className="auth-input" />
          </div>

          <p className="auth-forgot" onClick={() => navigate("/forgot")}>Forgot Password?</p>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-switch">Don’t have an account? <span onClick={() => navigate("/signup")}>Sign Up</span></p>
      </div>
    </div>
  );
};

export default Login;