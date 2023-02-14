import { Link, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import {
  faArrowRightFromBracket,
  faClipboardList,
  faFeatherPointed,
  faSquarePollVertical,
  faStore,
  faTableCellsLarge,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import {
  accountProfile,
  addAccount,
  addCategory,
  changePassword,
  home,
  viewAccountsList,
  viewCategoriesList,
  viewOrdersList,
  viewProductsList,
  viewStatistics,
} from '~/system/Constants/LinkURL';
import './SideBar.scss';
import { Image } from 'react-bootstrap';
import images from '~/assets/img';
import { useUserAuth } from '~/context/UserAuthContext';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Sidebar() {
  const pathname = '/dashboard';
  let navigate = useNavigate();
  const { getCurrentUser, logOut } = useUserAuth();
  const user = getCurrentUser();

  //const user = { name: 'Admin', roleId: 'admin' };

  const [key, setKey] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (e) => {
    setKey(e.key);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = async () => {
    try {
      await logOut();

      setTimeout(() => {
        navigate(`/${home}`);
      }, 500);
    } catch (error) {}
  };

  const renderMenuDependOnRole = () => {
    if (user?.roleId === 'admin') {
      return (
        <Menu
          onClick={handleClick}
          mode="inline"
          selectedKeys={[key]}
          selectable={true}
        >
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faStore} />}>
            <Link to={`${pathname}`}>Cửa hàng</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FontAwesomeIcon icon={faClipboardList} />}>
            <Link to={`${pathname}/${viewOrdersList}`}>Đơn hàng</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title="Tài khoản"
            icon={<FontAwesomeIcon icon={faUserGroup} />}
          >
            <MenuItemGroup>
              <Menu.Item key="2">
                <Link to={`${pathname}/${viewAccountsList}`}>
                  Danh sách tài khoản
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`${pathname}/${addAccount}`}>Tạo tài khoản</Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            title="Sản phẩm"
            icon={<FontAwesomeIcon icon={faFeatherPointed} />}
          >
            <MenuItemGroup>
              <Menu.Item key="4">
                <Link to={`${pathname}/${viewProductsList}`}>
                  Danh sách sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={``}>Tạo sản phẩm</Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="sub3"
            title="Loại hàng"
            icon={<FontAwesomeIcon icon={faTableCellsLarge} />}
          >
            <MenuItemGroup>
              <Menu.Item key="11">
                <Link to={`${pathname}/${viewCategoriesList}`}>
                  Danh sách loại hàng
                </Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to={`${pathname}/${addCategory}`}>Tạo loại hàng</Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item
            key="7"
            icon={<FontAwesomeIcon icon={faSquarePollVertical} />}
          >
            <Link to={`${pathname}/${viewStatistics}`}>Thống kê</Link>
          </Menu.Item>
          <Menu.Divider />
          <SubMenu
            key="sub4"
            title="Thông tin"
            icon={<FontAwesomeIcon icon={faUser} />}
          >
            <MenuItemGroup>
              <Menu.Item key="8">
                <Link to={`${pathname}/${accountProfile}`}>Hồ sơ</Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to={`${pathname}/${changePassword}`}>
                  Thay đổi mật khẩu
                </Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item
            key="9"
            icon={
              <FontAwesomeIcon
                className="c-logout-icon"
                icon={faArrowRightFromBracket}
                style={{ color: '#ff4d4f' }}
              />
            }
          >
            <Button type="link" onClick={() => handleLogOut()} danger>
              Log Out
            </Button>
          </Menu.Item>
        </Menu>
      );
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Image className="logo" src={images.logo} alt="Logo" />
      {renderMenuDependOnRole()}
    </Sider>
  );
}

export default Sidebar;
