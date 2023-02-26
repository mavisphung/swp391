import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatPrice } from "~/common/Helper";
import CartItems from "./components/CartItems";
import "./PaymentLayout.scss";
import { toast } from "react-toastify";
import config from "~/config";
import { emptyCart, getCart } from "~/common/LocalStorageUtil";

function PaymentPage() {
  const location = useLocation();
  const { name, tel, email, address, commune, district, province, cart } =
    location.state;

  const [isPayAdvanced, setPayAdvanced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [note, setNote] = useState("");

  console.log("NAME", name);
  console.log("TEL", tel);
  console.log("EMAIL", email);
  console.log("COMMUNE", commune);
  console.log("DISTRICT", district);
  console.log("PROVINCE", province);
  console.log("ADDRESS", address);
  console.log("CART", cart);

  const navigate = useNavigate();

  let sum = 0;

  cart.map((c) => {
    sum = sum + c.price;
  });

  const notify = () => {
    toast("Đặt hàng thành công!");
  };

  let items = cart.map((c) => {
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
        },
      };

      const request = await axios.post(
        "https://localhost:7179/api/order/unauth",
        order
      );
      // toast("Successfully!!!");
      console.log(request.data);
      emptyCart();
      // window.location.reload(false);
      navigate(config.routes.home);
    } catch (e) {
      // toast("Error!!!");
      console.log(e);
    }
  };

  const handleNoteChanged = (event) => {
    setNote(event.target.value);
    console.log(event.target.value);
  };

  function checkout() {
    notify();
    postOrder();
  }

  return (
    <Container>
      <div>
        <Breadcrumb separator={<RightOutlined />}>
          <Breadcrumb.Item href="">
            <HomeFilled />
            <span>Trang chủ</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Giỏ hàng của bạn</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Phương thức thanh toán</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <h3 style={{ fontWeight: "bold" }}>Đơn hàng</h3>
      <Col className="pb-3">
        <Container className="square rounded border border-2 border-dark">
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
              <Row>{`Địa chỉ: ${address}`}</Row>
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
              productPrice={formatPrice(c.price)}
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
            <ToastContainer />
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default PaymentPage;
