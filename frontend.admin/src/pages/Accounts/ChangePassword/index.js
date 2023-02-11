import { Col } from 'react-bootstrap';
import ChangePasswordForm from '~/components/ChangePasswordForm';
import CustomWrapper from '~/ui/CustomWrapper';

function ChangePassword() {
  return (
    <CustomWrapper>
      <h2 style={{ textAlign: 'center' }}>Thay đổi mật khẩu</h2>
      <Col lg={6}>
        <ChangePasswordForm />
      </Col>
    </CustomWrapper>
  );
}

export default ChangePassword;
