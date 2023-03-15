import { Link } from 'react-router-dom';
import { Layout, Row, Space } from 'antd';
import { Image } from 'react-bootstrap';

import images from '~/assets/img';
import { useUserAuth } from '~/context/UserAuthContext';
import { home } from '~/system/Constants/LinkURL';
import './Header.scss';
import { Admin } from '~/system/Constants/constants';

const { Header } = Layout;

function HeaderContent() {
  const { getCurrentUser } = useUserAuth();

  const user = getCurrentUser();

  const handleRenderHeader = () => {
    if (user && user.roleId === Admin) {
      return (
        <>
          <Space>
            <Row style={{ color: 'white' }}>Xin chào {user.fullname}</Row>
            <Row
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: 40,
                  maxHeight: 60,
                }}
                src={user.avatar}
                alt={user.fullname}
              />
            </Row>
          </Space>
        </>
      );
    } else if (!user) {
      return (
        <div className="c-header-wrapper">
          <Link to={`/${home}`} className="c-logo-homepage">
            <Image
              src={images.logo}
              alt="Chytech Bird Shop"
              className="c-image-homepage"
            />
          </Link>
        </div>
      );
    }
  };

  return <Header className="c-header-homepage">{handleRenderHeader()}</Header>;
}

export default HeaderContent;
