import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
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

        <h1 className="auth-title">Create Account</h1>
        <div className="auth-subtitle">Start collecting insights from your users</div>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input type="text" placeholder="Full Name" className="auth-input" />
          </div>

          <div className="input-group">
            <span className="input-icon">📧</span>
            <input type="email" placeholder="Email" className="auth-input" />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="Password" className="auth-input" />
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-switch">Already have an account? <span onClick={() => navigate("/")}>Login</span></p>
      </div>
    </div>
  );
};

export default Signup;