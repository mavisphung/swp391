import { Col, Row, Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/img';

import './Home.scss';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <Image
          src={images.logo}
          alt="Chytech Bird Shop"
          className="image-homepage"
        />
      </div>
      <div className="home-body">
        <di className="home-content-group">
          <Link to={`/login`}>
            <Button variant="dark" className="login-btn">
              Đăng nhập
            </Button>
          </Link>
          <span className="home-quote">
            <strong>
              Công ty Cổ Phần ChyTech chuyên cung cấp sỉ và lẻ các giống chim và
              sản phẩm cho chim.
            </strong>
          </span>
        </di>
      </div>
      <div className="home-footer">
        <Container>
          <Row
            className="footer-content"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col>
              <div className="group-header">Công ty Cổ Phần ChyTech</div>
              <p>
                <strong>Địa chỉ:</strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh
                Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam
              </p>
              <p>
                <strong>Điện thoại:</strong> 0934.434.434
              </p>
              <p>
                <strong>Email:</strong> chystore.vn@chytech.com.vn
              </p>
            </Col>

            <Col>
              <div className="group-header">Chăm sóc khách hàng</div>
              <p>Trung tâm trợ giúp</p>
              <p>ChyTech Blog</p>
            </Col>

            <Col>
              <div className="group-header">Kết nối với chúng tôi</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
