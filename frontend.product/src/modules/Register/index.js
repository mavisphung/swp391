import "./RegisterLayout.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "~/config";
import images from "~/assets/images";
import {
  EyeFilled,
  EyeInvisibleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function RegisterPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordShowed, setPasswordShowed] = useState(false);
  const [confirmShowed, setConfirmShowed] = useState(false);
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
      <img id="register-icon" src={images.logo} alt="ChyStore icon" />
      <div className="register-center register-back-link">
        <Link to={config.routes.home}>
          <ArrowLeftOutlined id="register-left-arrow" />
          <span>Trở về</span>
        </Link>
      </div>
      <div className="register-form register-center">
        <p className="register-p1">Đăng ký</p>
        <p className="register-p2">tài khoản để đăng nhập</p>
        <form onSubmit={handleSubmit} className="form-input">
          <label htmlFor="femail">Email</label>
          <input
            id="femail"
            type="email"
            placeholder="Vui lòng nhập email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="fname">Họ tên</label>
          <input
            id="fname"
            type="text"
            placeholder="Vui lòng nhập họ tên"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="fmobile">Số điện thoại</label>
          <input
            className="no-spinner"
            id="fmobile"
            type="number"
            placeholder="Vui lòng nhập số điện thoại"
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
          <label htmlFor="fconfirm">Xác nhận mật khẩu</label>
          <div className="password-group">
            <input
              id="fconfirm"
              type={confirmShowed ? "text" : "password"}
              placeholder="Vui lòng nhập lại mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon">
              {confirmShowed ? (
                <EyeFilled
                  onClick={() => setConfirmShowed(!confirmShowed)}
                  style={{ fontSize: "19px" }}
                />
              ) : (
                <EyeInvisibleFilled
                  onClick={() => setConfirmShowed(!confirmShowed)}
                  style={{ fontSize: "19px" }}
                />
              )}
            </span>
          </div>
          <input type="submit" value="Đăng Ký" />
        </form>
        <div className="text-center">
          <span>Bạn đã có tài khoản?</span>
          <Link id="login-link" to={config.routes.login}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
