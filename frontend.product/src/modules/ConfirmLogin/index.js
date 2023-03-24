import { useEffect, useState } from "react";
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
import { useUserCart } from "~/context/UserCartContext";
import { PROVINCEVN } from "~/system/Constants/provinceVN";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  checkFieldIsEmpty,
  checkPassword,
  checkPhoneNumber,
} from "~/common/Validation";
import {
  emailCommonPattern,
  fullNamePattern,
  phonePattern,
} from "~/system/Constants/constants";
import CustomControlFeedback from "./CustomControlFeedback";

function ConfirmLogin() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email1, setEmail1] = useState("");
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
  const [checked, setChecked] = useState(false);
  const [validated1, setValidated1] = useState(false);
  const [validated2, setValidated2] = useState(false);

  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const { cart } = useUserCart();

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

  const handleSubmit1 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated1(true);
    } else if (!checked) {
      alert(
        "Bạn cần đồng ý với điều khoản sử dụng và chính sách của cửa hàng để đặt hàng."
      );
    } else if (
      name &&
      tel &&
      email1 &&
      communeObj &&
      districtObj &&
      provinceObj &&
      address &&
      checked
    ) {
      navigate(config.routes.paymentMethods, {
        state: {
          name: name,
          tel: tel,
          email: email1,
          address: address,
          commune: communeObj.name,
          communeId: wardId,
          district: districtObj.name,
          districtId: districtId,
          province: provinceObj.name,
          provinceId: provinceId,
          cart,
        },
      });
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated2(true);
    }
  };

  const requiredMark = <span style={{ color: "white" }}>(*)</span>;

  const toggleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="ly-cl-0">
      <div className="hoac-cl-0">
        <div className="hoac-cl-1">
          <span style={{ color: "white" }}>Ho</span>
          <span>ặc</span>
        </div>
      </div>
      <Row>
        <Col md={6} className="ly-cl-1">
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
          <Form noValidate onSubmit={handleSubmit1} validated={validated1}>
            <Form.Group className="mb-3" controlId="validationFullName">
              <Form.Label>Họ tên {requiredMark}</Form.Label>
              <Form.Control
                type="text"
                value={name}
                maxLength={50}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vui lòng nhập đầy đủ họ tên"
                isInvalid={name && !fullNamePattern.test(name)}
                required
              />
              <CustomControlFeedback>
                {checkFieldIsEmpty(name, "Họ tên không được để trống")}
              </CustomControlFeedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationPhone">
              <Form.Label>Số điện thoại {requiredMark}</Form.Label>
              <Form.Control
                type="text"
                value={tel}
                maxLength={10}
                onChange={(e) => setTel(e.target.value)}
                placeholder="Vui lòng nhập số điện thoại"
                isInvalid={tel && !phonePattern.test(tel)}
                required
              />
              <CustomControlFeedback>
                {checkPhoneNumber(tel)}
              </CustomControlFeedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationEmail1">
              <Form.Label>Email {requiredMark}</Form.Label>
              <Form.Control
                type="email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                placeholder="Vui lòng nhập email"
                isInvalid={email1 && !emailCommonPattern.test(email1)}
                required
              />
              <CustomControlFeedback>
                {checkFieldIsEmpty(email1, "Email không được để trống")}
              </CustomControlFeedback>
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
              <CustomControlFeedback>
                Tỉnh, thành chưa được chọn
              </CustomControlFeedback>
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
              <CustomControlFeedback>
                Quận, huyện chưa được chọn
              </CustomControlFeedback>
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
              <CustomControlFeedback>
                Phường, xã chưa được chọn
              </CustomControlFeedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="validationAddress">
              <Form.Label>Số nhà, tên đường {requiredMark}</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Vui lòng nhập số nhà và tên đường"
                required
              />
              <CustomControlFeedback>
                {checkFieldIsEmpty(
                  address,
                  "Số nhà và tên đường không được để trống"
                )}
              </CustomControlFeedback>
            </Form.Group>

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
          </Form>
        </Col>

        <div className="col-6 ly-cl-2">
          <h4>Quý khách đã có tài khoản?</h4>
          <Form
            noValidate
            validated={validated2}
            onSubmit={handleSubmit2}
            className="form-cl-2"
          >
            <Form.Group className="mb-3" controlId="validationEmail2">
              <Form.Label>Email {requiredMark}</Form.Label>
              <Form.Control
                type="email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="Vui lòng nhập email"
                isInvalid={email2 && !emailCommonPattern.test(email2)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {checkFieldIsEmpty(email1, "Email không được để trống")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="validationPassword">
              <Form.Label>Mật khẩu {requiredMark}</Form.Label>
              <InputGroup>
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
                <div className="c-input-group-append">
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
              </InputGroup>
            </Form.Group>

            <button className="btn-cl-2" type="submit">
              Đăng nhập
            </button>
          </Form>
          <div style={{ textAlign: "center" }}>
            <span className="hoac-cl">Hoặc</span>
            <button className="btn-cl-3">
              <FcGoogle style={{ marginRight: "9px", fontSize: "24px" }} />
              Đăng nhập với Google
            </button>
            <div>
              <span style={{ color: "#7D7D7D" }}>Bạn chưa có tài khoản ?</span>
              <Link to={config.routes.register}>
                <span className="register-cl">Đăng ký</span>
              </Link>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default ConfirmLogin;
