import { Col } from 'react-bootstrap';
import AccountProfileForm from '~/components/AccountProfileForm';
import CustomWrapper from '~/ui/CustomWrapper';

function AccountProfile() {
  return (
    <CustomWrapper>
      <h2 style={{ textAlign: 'center' }}>Thông tin tài khoản</h2>
      <Col lg={12}>
        <AccountProfileForm />
      </Col>
    </CustomWrapper>
  );
}

export default AccountProfile;
