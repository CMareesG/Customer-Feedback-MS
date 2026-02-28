import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">CF</div>
          <div className="brand-name">Customer Feedback</div>
        </div>

        <h1 className="auth-title">Reset Password</h1>
        <div className="auth-subtitle">We’ll send a reset link to your email</div>

        <form className="auth-form" onSubmit={handleReset}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>

        <p className="auth-switch">Remember your password? <span onClick={() => navigate("/")}>Login</span></p>
      </div>
    </div>
  );
};

export default ForgotPassword;