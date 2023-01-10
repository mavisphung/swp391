import "./LoginLayout.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const users = [
    { email: "admin@gmail.com", password: "admin" },
    { email: "user1@gmail.com", password: "user1" },
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const account = users.find((u) => u.email === email);
      if (account && account.password === password) {
        localStorage.setItem("authenticated", true);
        navigate("/");
      }
    }
  };

  return (
    <div className="login-page">
      <Link to={config.dashboardRoutes.home}>
        <i class="arrow left"></i> Quay lại trang chủ
      </Link>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Địa chỉ email</label>
          <input
            id="fname"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="login-flex-container">
            <label htmlFor="fpassword">Mật khẩu</label>
            <a href="#home">Quên mật khẩu?</a>
          </div>
          <input
            id="fpassword"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Sign in" />
        </form>
      </div>
      <div className="loginForm registerForm">
        <span>Bạn mới biết Birdo?</span>
        <a id="register-link" href="#home">
          Đăng ký tài khoản
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
