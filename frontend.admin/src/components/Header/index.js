import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Space } from 'antd';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/img';
import { useUserAuth } from '~/context/UserAuthContext';
import { home, login } from '~/system/Constants/LinkURL';
import './Header.scss';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function HeaderContent() {
  const { getCurrentUser } = useUserAuth();

  const user = getCurrentUser();

  const handleRenderHeader = () => {
    if (user && user.roleId === 'admin') {
      return (
        <>
          <Space>
            <Row style={{ color: 'white' }}>Xin chào {user.name}</Row>
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

          <Menu mode="horizontal" theme="dark" className="c-menu-homepage">
            <SubMenu
              key="sub1"
              icon={
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ fontSize: 32, paddingTop: 8, paddingLeft: 8 }}
                />
              }
            >
              <MenuItemGroup>
                <Menu.Item key="1">
                  <Link to={`/${login}`}>Đăng nhập</Link>
                </Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </div>
      );
    }
  };

  return <Header className="c-header-homepage">{handleRenderHeader()}</Header>;
}

export default HeaderContent;
