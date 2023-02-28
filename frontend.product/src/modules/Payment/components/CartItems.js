import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { formatPrice } from "~/common/Helper";

function CartItems({
  productImage,
  productName,
  productType,
  productPrice,
  productAmount,
}) {
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
              Số lượng:{" "}
            </Col>
            <Col className="">
              <div className="form-outline w-25 h-25">{productAmount}</div>
            </Col>
            <Col className="col-md-auto">
              Thành tiền:{" "}
              <span>
                <u>{`${formatPrice(productAmount * productPrice)}đ`}</u>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default CartItems;
