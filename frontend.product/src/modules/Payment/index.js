import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatPrice } from "~/common/Helper";
import CartItems from "./components/CartItems";
import "./PaymentLayout.scss";
import { ToastContainer, toast } from "react-toastify";
import config from "~/config";
import { emptyCart } from "~/common/LocalStorageUtil";

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
          ward: commune,
          district: district,
          province: province,
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

  // const onepayIntl = new OnePayInternational({
  //   paymentGateway: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  //   merchant: "TESTONEPAY",
  //   accessCode: "4KKAH0Z4",
  //   secureSecret: "XGJLPDAXNSVTYJFOZDUUOSJTJAYEWNNK",
  // });

  return (
    <Container>
      {/* <div>
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
      </div> */}

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
                  setPaymentMethod(0);
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
                  setPaymentMethod(1);
                }}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="payInAdvanceRadio"
                label="Đặt cọc trước 50%"
                onClick={() => {
                  setPayAdvanced(true);
                  setPaymentMethod(2);
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
                  setPaymentMethod(3);
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
          <Row>
            <Button
              className="mt-5"
              onClick={() => {
                // var dateFormat = require("dateformat");
                // var date = new Date();
                // var createDate = dateFormat(date, "yyyymmddHHmmss");
                // window.location.replace(
                //   "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20230227112801&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=4KKAH0Z4&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=XGJLPDAXNSVTYJFOZDUUOSJTJAYEWNNK"
                // );
              }}
            >
              test vnpay
            </Button>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default PaymentPage;
