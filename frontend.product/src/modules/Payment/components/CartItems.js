import React from "react";
import { Col, Image, Row } from "react-bootstrap";

function CartItems({ productImage, productName, productType, productPrice }) {
  return (
    <Row className="pb-2">
      <Row>
        <Col className="col-md-auto pe-2">
          <Image
            src={productImage}
            width={160}
            height={120}
            style={{ objectFit: "fill" }}
            // className="img-fluid"
          ></Image>
        </Col>
        <Col>
          <Row className="h4">{productName}</Row>
          <Row className="">Loại: {productType}</Row>
          <Row className="">
            <Col className="col-md-auto pe-2 row justify-content-center align-self-center">
              Số lượng{" "}
            </Col>
            <Col className="">
              <div className="form-outline w-25 h-25">
                <input
                  defaultValue={"1"}
                  type="text"
                  id="input1"
                  class="form-control p-0 text-center"
                />
              </div>
            </Col>
            <Col className="col-md-auto">
              Thành tiền:{" "}
              <span>
                <u>{`${productPrice}đ`}</u>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default CartItems;
