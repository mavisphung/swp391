import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Checkbox } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import "./LoginLayout.scss";
import config from "~/config";
import AppIcons from "~/assets/icons";
import { useUserAuth } from "~/context/UserAuthContext";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);
  const [passwordShowed, setPasswordShowed] = useState(false);

  const navigate = useNavigate();

  const { loginWithEmail } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const user = await loginWithEmail(email, password);
      if (user) {
        navigate(config.routes.dashboard);
      }
    }
  };

  return (
    <div>
      <a href={config.routes.dashboard}>
        <img id="login-icon" src={AppIcons.logo} alt="ChyStore icon" />
      </a>
      <div className="login-center login-back-link">
        <Link to={config.routes.dashboard}>
          <ArrowLeftOutlined id="login-left-arrow" />
          <span>Trở về</span>
        </Link>
      </div>
      <div className="login-center login-form">
        <p id="xinchao">Xin chào quý khách !</p>
        <p id="dangnhap">Đăng nhập</p>
        <p id="vao">vào cửa hàng chim cảnh ChyStore</p>
        <form onSubmit={handleSubmit} className="form-input">
          <label htmlFor="femail">Email</label>
          <input
            id="femail"
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
              onChange={() => setChecked(!checked)}
              style={{ margin: 0, fontSize: "12px" }}
            >
              Lưu đăng nhập
            </Checkbox>
            <Link to={config.routes.dashboard}>Quên mật khẩu?</Link>
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
