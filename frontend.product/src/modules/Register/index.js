import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  EyeFilled,
  EyeInvisibleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import "./RegisterLayout.scss";
import config from "~/config";
import AppIcons from "~/assets/icons";
import { PROVINCEVN } from "~/system/Constants/provinceVN";
import {
  checkFieldIsEmpty,
  checkPassword,
  checkPhoneNumber,
} from "~/common/Validation";
import { useUserAuth } from "~/context/UserAuthContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmType, setConfirmType] = useState("password");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [wardId, setWardId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [listCommune, setListCommune] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [communeObj, setCommuneObj] = useState({});
  const [districtObj, setDistrictObj] = useState({});
  const [provinceObj, setProvinceObj] = useState({});
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const { loginWithEmail } = useUserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (
      email &&
      name &&
      tel &&
      communeObj &&
      districtObj &&
      provinceObj &&
      address &&
      password &&
      confirm
    ) {
      // const user = await loginWithEmail(email, password, checked);
      // if (user) {
      //   navigate(config.routes.dashboard);
      // }
    }
  };

  useEffect(() => {
    setListProvince(PROVINCEVN.province.map((p) => p));
  }, []);

  useEffect(() => {
    setListDistrict(
      PROVINCEVN.district.filter((d) => d.idProvince === provinceId)
    );
  }, [provinceId]);

  useEffect(() => {
    setListCommune(
      PROVINCEVN.commune.filter((c) => c.idDistrict === districtId)
    );
  }, [districtId]);

  useEffect(() => {
    setCommuneObj(listCommune.find((c) => c.idCommune === wardId));
    setDistrictObj(listDistrict.find((d) => d.idDistrict === districtId));
    setProvinceObj(listProvince.find((p) => p.idProvince === provinceId));
  }, [wardId, districtId, provinceId]);

  const toggleShowPassword = (type, setType) => {
    if (type === "password") {
      setType("text");
      return;
    }
    setType("password");
  };

  const requiredMark = <span style={{ color: "red" }}>*</span>;

  return (
    <div>
      <Link to={config.routes.dashboard}>
        <img id="register-icon" src={AppIcons.logo} alt="ChyStore icon" />
      </Link>
      <div className="register-center register-back-link">
        <Link to={config.routes.dashboard}>
          <ArrowLeftOutlined id="register-left-arrow" />
          <span>Trở về</span>
        </Link>
      </div>
      <div className="register-form register-center">
        <p className="register-p1">Đăng ký</p>
        <p className="register-p2">tài khoản để đăng nhập</p>
        <Form noValidate onSubmit={handleSubmit} validated={validated}>
          <Form.Group className="mb-3" controlId="validationEmail">
            <Form.Label>Email {requiredMark}</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vui lòng nhập email"
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkFieldIsEmpty(name, "Họ tên không được để trống")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationFullName">
            <Form.Label>Họ tên {requiredMark}</Form.Label>
            <Form.Control
              type="text"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vui lòng nhập đầy đủ họ tên"
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkFieldIsEmpty(name, "Họ tên không được để trống")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationPhone">
            <Form.Label>Số điện thoại {requiredMark}</Form.Label>
            <Form.Control
              type="text"
              value={tel}
              maxLength={10}
              onChange={(e) => setTel(e.target.value)}
              placeholder="Vui lòng nhập số điện thoại"
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkPhoneNumber(tel)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationProvince">
            <Form.Label>Tỉnh/Thành phố {requiredMark}</Form.Label>
            <Form.Select
              aria-label="Chọn tỉnh, thành"
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
              required
            >
              <option value="">Chọn tỉnh, thành</option>
              {listProvince.map((p, index) => (
                <option key={index} value={p.idProvince}>
                  {p.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Tỉnh, thành chưa được chọn
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationDistrict">
            <Form.Label>Quận/Huyện {requiredMark}</Form.Label>
            <Form.Select
              aria-label="Chọn quận, huyện"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              required
            >
              <option value="">Chọn quận, huyện</option>
              {listDistrict.map((d, index) => (
                <option key={index} value={d.idDistrict}>
                  {d.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Quận, huyện chưa được chọn
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCommune">
            <Form.Label>Phường/Xã {requiredMark}</Form.Label>
            <Form.Select
              aria-label="Chọn phường, xã"
              value={wardId}
              onChange={(e) => setWardId(e.target.value)}
              required
            >
              <option value="">Chọn phường, xã</option>
              {listCommune.map((c, index) => (
                <option key={index} value={c.idCommune}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Phường, xã chưa được chọn
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationAddress">
            <Form.Label>Số nhà, tên đường {requiredMark}</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Vui lòng nhập số nhà và tên đường"
              required
            />
            <Form.Control.Feedback type="invalid">
              {checkFieldIsEmpty(
                address,
                "Số nhà và tên đường không được để trống"
              )}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginValidationPassword">
            <Form.Label>Mật khẩu {requiredMark}</Form.Label>
            <div className="login-input-group">
              <Form.Control
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                maxLength={20}
                autoComplete="new-password"
                placeholder="Vui lòng nhập mật khẩu"
                required
              />
              <div className="login-input-group-append">
                <InputGroup.Text>
                  {passwordType === "text" ? (
                    <EyeFilled
                      onClick={(e) => {
                        e.preventDefault();
                        toggleShowPassword(passwordType, setPasswordType);
                      }}
                    />
                  ) : (
                    <EyeInvisibleFilled
                      onClick={(e) => {
                        e.preventDefault();
                        toggleShowPassword(passwordType, setPasswordType);
                      }}
                    />
                  )}
                </InputGroup.Text>
              </div>
              <Form.Control.Feedback type="invalid">
                {checkPassword(password)}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-5" controlId="validationConfirm">
            <Form.Label>Xác nhận mật khẩu {requiredMark}</Form.Label>
            <div className="login-input-group">
              <Form.Control
                type={confirmType}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                minLength={6}
                maxLength={20}
                autoComplete="new-password"
                placeholder="Vui lòng nhập lại mật khẩu"
                required
              />
              <div className="login-input-group-append">
                <InputGroup.Text>
                  {confirmType === "text" ? (
                    <EyeFilled
                      onClick={(e) => {
                        e.preventDefault();
                        toggleShowPassword(confirmType, setConfirmType);
                      }}
                    />
                  ) : (
                    <EyeInvisibleFilled
                      onClick={(e) => {
                        e.preventDefault();
                        toggleShowPassword(confirmType, setConfirmType);
                      }}
                    />
                  )}
                </InputGroup.Text>
              </div>
              <Form.Control.Feedback type="invalid">
                {checkPassword(confirm, true)}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <button className="btn-cl-1" type="submit">
            Đăng ký
          </button>
        </Form>
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
