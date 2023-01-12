import { Col, Layout, Row } from 'antd';

const { Footer } = Layout;

function FooterContent() {
  return (
    <Footer style={{ backgroundColor: '#001529', color: 'white' }}>
      <Row
        className="footer-content"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={8} className="text-start">
          <h4>Công ty Cổ Phần ChyTech</h4>
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

        <Col span={8} className="text-start">
          <h4>Chăm sóc khách hàng</h4>
          <p>Trung tâm trợ giúp</p>
          <p>ChyTech Blog</p>
        </Col>

        <Col span={8} className="text-start">
          <h4>Kết nối với chúng tôi</h4>
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterContent;
