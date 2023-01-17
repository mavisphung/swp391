import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Menu, Row, Space } from 'antd';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/img';
import { home, login } from '~/system/Constants/LinkURL';
import './Header.scss';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function HeaderContent() {
  //const user = { name: 'Admin', roleId: 'admin' };
  const user = null;

  const handleRenderHeader = () => {
    if (user && user.roleId === 'admin') {
      return (
        <>
          <Space mode="horizontal">
            <Row style={{ color: 'white' }}>Welcome, {user.name}</Row>
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
