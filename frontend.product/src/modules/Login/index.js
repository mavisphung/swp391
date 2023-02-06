import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import styles from "./LoginLayout.scss";
import config from "~/config";
import images from "~/assets/images";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);
  const [passwordShowed, setPasswordShowed] = useState(false);
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
    <div>
      <img id="login-icon" src={images.logo} alt="ChyStore icon" />
      <div className="login-center login-back-link">
        <Link to={config.dashboardRoutes.home}>
          <ArrowLeftOutlined id="login-left-arrow" />
          <span>Trở về</span>
        </Link>
      </div>
      <div className="login-center login-form">
        <p id="xinchao">Xin chào quý khách !</p>
        <p id="dangnhap">Đăng nhập</p>
        <p id="vao">vào cửa hàng chim cảnh ChyStore</p>
        <form onSubmit={handleSubmit} className="form-input">
          <label htmlFor="fname">Email</label>
          <input
            id="fname"
            type="email"
            placeholder="Vui lòng nhập email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="fpassword">Mật khẩu</label>
          <div className="password-group">
            <input
              id="fpassword"
              type={passwordShowed ? "text" : "password"}
              placeholder="Vui lòng nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon">
              {passwordShowed ? (
                <EyeFilled
                  onClick={() => setPasswordShowed(!passwordShowed)}
                  style={{ fontSize: "19px" }}
                />
              ) : (
                <EyeInvisibleFilled
                  onClick={() => setPasswordShowed(!passwordShowed)}
                  style={{ fontSize: "19px" }}
                />
              )}
            </span>
          </div>
          <div className="login-flex-container">
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(!checked)}
              style={{ margin: 0, fontSize: "12px" }}
            >
              Lưu đăng nhập
            </Checkbox>
            <Link to="/">Quên mật khẩu?</Link>
          </div>
          <input type="submit" value="Đăng nhập" />
        </form>
        <div className="text-center">
          <span>Bạn chưa có tài khoản?</span>
          <Link id="register-link" to={config.routes.register}>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
