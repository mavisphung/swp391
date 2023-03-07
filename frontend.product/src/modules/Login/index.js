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
import { Form, InputGroup } from "react-bootstrap";
import { checkEmail, checkPassword } from "~/common/Validation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [validated, setValidated] = useState(true);

  const navigate = useNavigate();
  const requiredMark = <span style={{ color: "white" }}>*</span>;

  const { loginWithEmail } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (email && password) {
      const user = await loginWithEmail(email, password, checked);
      if (user) {
        navigate(config.routes.dashboard);
      }
    }
  };

  const toggleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div>
      <Link to={config.routes.dashboard}>
        <img id="login-icon" src={AppIcons.logo} alt="ChyStore icon" />
      </Link>
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

        <Form
          noValidate
          onSubmit={handleSubmit}
          className="form-input"
          validated={validated}
        >
          <Form.Group controlId="LoginValidationEmail">
            <Form.Label>Email {requiredMark}</Form.Label>
            <Form.Control
              type="email"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vui lòng nhập email"
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkEmail(email)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="" controlId="loginValidationPassword">
            <Form.Label>Mật khẩu {requiredMark}</Form.Label>
            <div className="login-input-group">
              <Form.Control
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                maxLength={20}
                isInvalid={password && password.length < 6}
                autoComplete="new-password"
                placeholder="Vui lòng nhập mật khẩu"
                required
              />
              <div className="login-input-group-append">
                <InputGroup.Text>
                  {passwordType === "text" ? (
                    <EyeFilled onClick={toggleShowPassword} />
                  ) : (
                    <EyeInvisibleFilled onClick={toggleShowPassword} />
                  )}
                </InputGroup.Text>
              </div>
              <Form.Control.Feedback type="invalid">
                {checkPassword(password)}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          <div className="login-flex-container">
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              style={{ margin: 0 }}
            >
              Lưu đăng nhập
            </Checkbox>
            <Link to={config.routes.dashboard} style={{ fontSize: "16px" }}>
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit">Đăng nhập</button>
        </Form>

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
