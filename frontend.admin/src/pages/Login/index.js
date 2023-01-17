import { Col, Container, Row } from 'react-bootstrap';
import HeaderContent from '~/components/Header';
import LoginForm from '~/components/LoginForm';
import './Login.scss';

function Login() {
  return (
    <div className="login-page">
      <HeaderContent />
      <div
        className="d-flex flex-row align-items-center my-5"
        style={{ paddingTop: 100 }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
