import { Col, Container, Image, Row } from "react-bootstrap";
import "./FooterLayout.scss";
import footerIcon from "~/assets/images/chystore_footer_icon.svg";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <Container style={{ backgroundColor: "#252525", color: "#fff" }} fluid>
      <Container className="mb-2 mt2">
        <Image src={footerIcon} alt="ChyStore icon" className="pr-2" />
        <Row>
          <Col xs={4}>
            <Row className="h5">Công ty Cổ Phần ChyTech</Row>
            <div style={{ fontSize: "14px" }}>
              <Row>
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                Thành phố Hồ Chí Minh 700000, Việt Nam
              </Row>
              <Row>ĐT: 0934.434.434</Row>
              <Row>Email: chystore.vn@chytech.com.vn</Row>
            </div>
          </Col>
          <Col className="ps-4">
            <div style={{ fontSize: "14px" }}>
              <Row className="h6">Chăm sóc khách hàng</Row>
              <Row>Chytech Blog</Row>
              <Row>Hướng dẫn mua hàng</Row>
              <Row>Hướng dẫn thanh toán</Row>
              <Row>Trả hàng và hoàn tiền</Row>
            </div>
          </Col>
          <Col></Col>
          <Col>
            <Row className="d-flex justify-content-end h6">
              Kết nối với chúng tôi
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <BsFacebook size={20} />
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ marginBottom: "80px" }}></div>
        <Col md>
          <AiOutlineCopyrightCircle /> 2023 - ChyTech Co.op
        </Col>
      </Container>
    </Container>
  );
}

export default Footer;
