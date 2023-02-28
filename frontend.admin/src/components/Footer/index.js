import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Layout, Row } from 'antd';
import './Footer.scss';

const { Footer } = Layout;

function FooterContent() {
  return (
    <Footer
      style={{
        backgroundColor: '#001529',
        color: 'white',
        marginBottom: -20,
      }}
    >
      <Row
        className="footer-content"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={12} className="text-start">
          <div className="group-header">Công ty Cổ Phần ChyTech</div>
          <p>
            <strong>Địa chỉ:</strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,
            Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam
          </p>
          <p>
            <strong>Điện thoại:</strong> 0934.434.434
          </p>
          <p>
            <strong>Email:</strong> chystore.vn@chytech.com.vn
          </p>
        </Col>

        <Col span={6} className="text-start">
          <div className="group-header">Chăm sóc khách hàng</div>
          <p>Trung tâm trợ giúp</p>
          <p>ChyTech Blog</p>
        </Col>

        <Col span={6} className="text-start">
          <div className="group-header">Kết nối với chúng tôi</div>
          <div className="social-group">
            <FontAwesomeIcon className="social-icon" icon={faSquareFacebook} />
            <FontAwesomeIcon className="social-icon" icon={faSquareInstagram} />
            <FontAwesomeIcon className="social-icon" icon={faSquareTwitter} />
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterContent;
