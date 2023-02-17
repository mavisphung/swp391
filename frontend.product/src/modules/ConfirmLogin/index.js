import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { FcGoogle } from "react-icons/fc";
import {
  ArrowLeftOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";

import "./ComfirmLoginLayout.scss";
import config from "~/config";
import { getCart } from "~/common/LocalStorageUtil";

function ConfirmLogin() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email1, setEmail1] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);

  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShowed, setPasswordShowed] = useState(false);

  const navigate = useNavigate();

  const cartList = getCart();

  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (name && tel && email1 && address && checked) {
      navigate(config.routes.paymentMethods, {
        state: {
          name: name,
          tel: tel,
          email: email1,
          address: address,
          cart: cartList,
        },
      });
    }
  };

  const handleSubmit2 = () => {
    return 0;
  };

  return (
    <div className="ly-cl-0">
      <div className="hoac-cl-0">
        <div className="hoac-cl-1">
          <span style={{ color: "white" }}>Ho</span>
          <span>ặc</span>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 ly-cl-1">
            <div id="confirm-login-back">
              <Link to={config.routes.dashboard}>
                <ArrowLeftOutlined id="login-left-arrow" />
                <span>Trở về</span>
              </Link>
            </div>
            <h4>
              Vui lòng nhập họ tên, email, số điện thoại và địa chỉ để tiếp tục
              thanh toán
            </h4>
            <form onSubmit={handleSubmit1} className="form-cl-1 form-input">
              <label htmlFor="fname">Họ tên (*)</label>
              <input
                id="fname"
                type="text"
                placeholder="Vui lòng nhập đầy đủ họ tên"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="ftel">Số điện thoại (*)</label>
              <input
                id="ftel"
                type="tel"
                placeholder="Vui lòng nhập số điện thoại"
                onChange={(e) => setTel(e.target.value)}
              />
              <label htmlFor="femail1">Email (*)</label>
              <input
                id="femail1"
                type="email"
                placeholder="Vui lòng nhập email"
                onChange={(e) => setEmail1(e.target.value)}
              />
              <label htmlFor="faddress">Địa chỉ giao hàng (*)</label>
              <input
                id="faddress"
                type="text"
                placeholder="Vui lòng nhập địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                style={{ margin: 0, fontSize: "12px" }}
              >
                <span>
                  Tôi hoàn toàn đồng ý với
                  <span className="dk-cs">điều khoản sử dụng</span> và
                  <span className="dk-cs">chính sách</span> của cửa hàng
                </span>
              </Checkbox>
              <button className="btn-cl-1" type="submit">
                Tiến hành thanh toán
              </button>
            </form>
          </div>

          <div className="col-6 ly-cl-2">
            <h4>Quý khách đã có tài khoản?</h4>
            <form onSubmit={handleSubmit2} className="form-cl-2 form-input">
              <label htmlFor="femail2">Email</label>
              <input
                id="femail2"
                type="email"
                placeholder="Vui lòng nhập email"
                onChange={(e) => setEmail2(e.target.value)}
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
              <button className="btn-cl-2" type="submit">
                Đăng nhập
              </button>
            </form>
            <div style={{ textAlign: "center" }}>
              <span className="hoac-cl">Hoặc</span>
              <button className="btn-cl-3">
                <FcGoogle style={{ marginRight: "9px", fontSize: "24px" }} />
                Đăng nhập với Google
              </button>
              <div>
                <span style={{ color: "#7D7D7D" }}>
                  Bạn chưa có tài khoản ?
                </span>
                <Link to={config.routes.register}>
                  <span className="register-cl">Đăng ký</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cl"></div>
    </div>
  );
}

export default ConfirmLogin;
