import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, Link, redirect } from "react-router-dom";
import { formatPrice } from "~/common/Helper";
import CartItems from "./components/CartItems";
import "./PaymentLayout.scss";
import { toast } from "react-toastify";
import config from "~/config";

import { setLocalCart, useUserCart } from "~/context/UserCartContext";
import { vnpPayment } from "./PaymentFunctions";

function PaymentPage() {
  const location = useLocation();
  const userCart = useUserCart();
  const [ip, setIp] = useState("");
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

  // console.log("NAME", name);
  // console.log("TEL", tel);
  // console.log("EMAIL", email);
  // console.log("COMMUNE", commune);
  // console.log("DISTRICT", district);
  // console.log("PROVINCE", province);
  // console.log("ADDRESS", address);
  // console.log("CART", cart);
  // console.log("UserCart", userCart.cart);
  // console.log("COMMUNE_ID", communeId);
  console.log(`Commune ID: ${communeId}`);
  console.log(`District ID: ${districtId}`);

  console.log(`Province ID: ${provinceId}`);

  const navigate = useNavigate();

  let sum = 0;

  cart.map((c) => {
    sum = sum + c.price * c.amount;
  });

  const getIp = () => {
    // const res = await axios.get("https://geolocation-db.com/json/");
    // console.log(res.data);

    setIp("127.0.0.1");
    // return "127.0.0.1";
  };

  const notify = () => {
    toast("Đặt hàng thành công!");
  };

  let items = userCart.cart.map((c) => {
    return {
      productId: c.id,
      quantity: c.amount,
    };
  });
  const postOrder = async () => {
    try {
      const order = {
        cartItems: items,
        paymentMethod: paymentMethod,
        note: note,
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

      const request = await axios.post(
        "https://localhost:7179/api/order/unauth",
        order
      );
      toast("Đặt hàng thành công!");
      console.log(request.data);
      setLocalCart([]);
    } catch (e) {
      toast("Đặt hàng không thành công! Vui lòng thử lại!");
      console.log(e);
    }
  };

  const handleNoteChanged = (event) => {
    setNote(event.target.value);
    console.log(event.target.value);
  };

  async function checkout() {
    if (paymentMethod === 1) {
      await postOrder();
      vnpPayment(sum);
      // postOrder();
    } else {
      // notify();
      await postOrder();
      navigate(config.routes.home);
    }
  }

  useEffect(() => {
    getIp();
  }, []);

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
              onChange={handleNoteChanged}
            ></textarea>
          </Row>
        </Col>
        <Col xs lg="3" md>
          <Row className="h5">Hình thức thanh toán</Row>
          <Row>
            <Form>
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="vnPayRadio"
                label="Bằng VNPay"
                // checked={payAdvanced === "VNPay"}
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(1);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="cashPayRadio"
                label="Thanh toán tại cửa hàng"
                defaultChecked={true}
                // checked={payAdvanced === "CashPay"}
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(2);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="payInAdvanceRadio"
                label="Đặt cọc trước 50%"
                onClick={() => {
                  setPayAdvanced(true);
                  setPaymentMethod(3);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="shippingPayRadio"
                label="Thanh toán trực tiếp cho nhân viên giao hàng"
                // checked={payAdvanced === "ShippingPay"}
                onClick={() => {
                  setPayAdvanced(false);
                  setPaymentMethod(4);
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
            {/* <Button onClick={notify}>Toast</Button> */}
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default PaymentPage;
