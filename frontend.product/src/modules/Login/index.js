import "./LoginLayout.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "~/config";
import { Checkbox } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);
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
        <ArrowLeftOutlined id="login-left-arrow" />
        Quay lại trang chủ
      </Link>
      <div className="loginForm">
        <p className="xinchao">Xin chào quý khách !</p>
        <p className="dangnhap">Đăng nhập</p>
        <p className="vao">vào cửa hàng chim cảnh ChyStore</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <input
            id="fname"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="fpassword">Mật khẩu</label>
          <input
            id="fpassword"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-flex-container">
            <Checkbox checked={checked} onChange={(e) => setChecked(!checked)}>
              Lưu đăng nhập
            </Checkbox>
            <Link to="/">Quên mật khẩu?</Link>
          </div>
          <input type="submit" value="Đăng nhập" />
        </form>
        <div className="login-center">
          <span>Bạn chưa có tài khoản?</span>
          <Link id="register-link" to="/">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
