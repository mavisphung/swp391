import { HomeFilled, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form,
  // Image,
  Row,
} from "react-bootstrap";
import CartItems from "./components/CartItems";
import "./PaymentLayout.scss";

function PaymentPage() {
  const [isPayAdvanced, setPayAdvanced] = useState(false);

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
      <Container className="d-flex p-0 pb-2">
        <Col className="pe-5" md>
          <CartItems
            productName={"Lồng mi chim tròn hoa cnc"}
            productImage={
              "https://longchimdep.net/wp-content/uploads/2019/06/chim-hoa-hoa-mi.jpg"
            }
            productType={"64 nan"}
            productPrice={720000}
          />
          <CartItems
            productName={"Lồng yến tròn chân dũi chỉ"}
            productImage={
              "https://longchimdep.net/wp-content/uploads/2018/04/876-1.jpg"
            }
            productType={"64 nan"}
            productPrice={1150000}
          />
          <Row>
            <Col>
              <a href="/" style={{ color: "#ee3e6a" }} className="h6">
                Thay đổi giỏ hàng
              </a>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              Tổng cộng:{" "}
              <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                1,870,000đ
              </span>
            </Col>
          </Row>
          {isPayAdvanced && (
            <>
              <Row className="d-flex justify-content-end align-items-center">
                <Col className="d-flex justify-content-end align-items-center">
                  Cọc trước:{" "}
                  <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                    935,000đ
                  </span>
                </Col>
              </Row>
              <Row className="d-flex justify-content-end align-items-center">
                <Col className="d-flex justify-content-end align-items-center">
                  Còn lại:{" "}
                  <span className="h3 ps-1" style={{ color: "#ee3e6a" }}>
                    935,000đ
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
              class="w-75 form-control form-rounded"
              rows="7"
              placeholder="Ghi chú nếu địa chỉ khó tìm"
              required
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
                onClick={() => setPayAdvanced(false)}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="cashPayRadio"
                label="Thanh toán tại cửa hàng"
                // checked={payAdvanced === "CashPay"}
                onClick={() => setPayAdvanced(false)}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="payInAdvanceRadio"
                label="Đặt cọc trước 50%"
                onClick={() => setPayAdvanced(true)}
              />
              <Form.Check
                type={"radio"}
                name="paymentGroup"
                id="shippingPayRadio"
                label="Thanh toán trực tiếp cho nhân viên giao hàng"
                // checked={payAdvanced === "ShippingPay"}
                onClick={() => setPayAdvanced(false)}
              />
            </Form>
          </Row>
          <Row>
            {" "}
            <Button className="btn-pay mt-3">Thanh toán</Button>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default PaymentPage;
