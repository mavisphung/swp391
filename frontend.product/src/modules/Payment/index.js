import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";

import "./PaymentLayout.scss";
import CartItems from "./components/CartItems";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { vnpPayment } from "./PaymentFunctions";
import { paymentMethodType } from "~/models/CategoryType";
import { setLocalPaymentInfo } from "~/context/LocalPaymentInfo";
import { createOrder } from "~/data/OrderRepository";
import { useUserCart } from "~/context/UserCartContext";

function PaymentPage() {
  const { dispatch } = useUserCart();
  const location = useLocation();
  const {
    name,
    tel,
    email,
    address,
    commune,
    district,
    province,
    cart,
    communeId,
    districtId,
    provinceId,
  } = location.state;

  const [isPayAdvanced, setPayAdvanced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(2);
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  let sum = 0;

  cart.forEach((c) => {
    sum = sum + c.price * c.amount;
  });

  // const getIp = () => {
  //   // const res = await axios.get("https://geolocation-db.com/json/");
  //   // console.log(res.data);

  //   setIp("127.0.0.1");
  //   // return "127.0.0.1";
  // };

  const postOrder = async () => {
    let payInAdvance = 100;
    if (paymentMethod === paymentMethodType.payInAdvance50) {
      payInAdvance = 50;
    }
    const data = await createOrder({
      paymentMethod,
      note,
      customer: {
        email: email,
        fullname: name,
        phoneNumber: tel,
        address: address,
        ward: communeId,
        district: districtId,
        province: provinceId,
      },
      cart,
      dispatch,
      payInAdvance,
    });
    if (data) {
      console.log("ORDER SUCCESS INFORMATION", data);
      navigate(config.routes.orderNotification, { state: { order: data } });
    }
  };

  const setPaymentInfo = () => {
    const data = {
      paymentMethod,
      note,
      customer: {
        email: email,
        fullname: name,
        phoneNumber: tel,
        address: address,
        ward: communeId,
        district: districtId,
        province: provinceId,
      },
    };
    setLocalPaymentInfo(data);
  };

  function checkout() {
    setPaymentInfo();
    if (paymentMethod === paymentMethodType.vnpay) {
      vnpPayment(sum);
    } else if (paymentMethod === paymentMethodType.payInAdvance50) {
      vnpPayment(sum / 2);
    } else {
      postOrder();
    }
  }

  // useEffect(() => {
  //   getIp();
  // }, []);

  return (
    <Container>
      <h3 style={{ fontWeight: "bold" }}>Đơn hàng</h3>
      <Col className="pb-3">
        <Container>
          <Container className="d-flex py-2 mx-2 fs-5">
            <Col>
              <Row className="fw-bold">Thông tin tài khoản</Row>
              <Row>{`Tên khách hàng: ${name}`}</Row>
              <Row>{`Email: ${email}`}</Row>
              <Row>{`Số điện thoại: ${tel}`}</Row>
            </Col>
            <Col>
              <Row className="fw-bold">Địa chỉ giao hàng</Row>
              <Row>{`Tên khách hàng: ${name}`}</Row>
              <Row>{`Email: ${email}`}</Row>
              <Row>{`Số điện thoại: ${tel}`}</Row>
              <Row>{`Địa chỉ: ${address}, ${commune}, ${district}, ${province}`}</Row>
            </Col>
          </Container>
        </Container>
      </Col>
      <Container className="d-flex p-0 pb-2">
        <Col className="pe-5" md>
          {cart.map((c, index) => (
            <CartItems
              key={index}
              productName={c.name}
              productImage={c.medias[1].url}
              productType={c.categoryName}
              productPrice={c.price}
              productAmount={c.amount}
            />
          ))}

          <Row>
            <Col>
              <Link
                to={config.routes.cart}
                style={{ color: "#ee3e6a" }}
                className="h6"
              >
                Thay đổi giỏ hàng
              </Link>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              Tổng cộng:{" "}
              <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                {formatPrice(sum)}đ
              </span>
            </Col>
          </Row>
          {isPayAdvanced && (
            <>
              <Row className="d-flex justify-content-end align-items-center">
                <Col className="d-flex justify-content-end align-items-center">
                  Cọc trước:{" "}
                  <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                    {formatPrice(sum / 2)}đ
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-end align-items-center">
                <Col className="d-flex justify-content-end align-items-center">
                  Còn lại:{" "}
                  <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                    {formatPrice(sum / 2)}đ
                  </span>
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col lg="3" md>
          <Row className="h5">Ghi chú đơn hàng</Row>
          <Row>
            <textarea
              className="w-75 form-control form-rounded"
              rows="7"
              placeholder="Ghi chú nếu địa chỉ khó tìm"
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </Row>
        </Col>
        <Col xs lg="3" md>
          <Row className="h5">Phuơng thức thanh toán</Row>
          <Row>
            <Form>
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="vnPayRadio"
                label="Bằng VNPay"
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(paymentMethodType.vnpay);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="cashPayRadio"
                label="Thanh toán tại cửa hàng"
                defaultChecked={true}
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(paymentMethodType.atStore);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="payInAdvanceRadio"
                label="Đặt cọc trước 50%"
                onClick={() => {
                  setPayAdvanced(true);
                  setPaymentMethod(paymentMethodType.payInAdvance50);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="shippingPayRadio"
                label="Thanh toán trực tiếp cho nhân viên giao hàng"
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(paymentMethodType.cod);
                }}
              />
            </Form>
          </Row>
          <Row>
            <Button
              variant="primary"
              className="btn-pay mt-3"
              onClick={checkout}
            >
              Thanh toán
            </Button>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default PaymentPage;
