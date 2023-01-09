import { Link, useLocation } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import {
  faArrowRightFromBracket,
  faBarChart,
  faClipboardList,
  faFeatherPointed,
  faStore,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { viewOrdersList, viewStatistics } from '~/system/Constants/LinkURL';
import './SideBar.scss';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Sidebar() {
  // const { pathname } = useLocation();
  // console.log(pathname);
  const pathname = '/dashboard';

  const user = { name: 'Admin', roleId: 'admin' };

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
      //
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
            <Link to={`${pathname}`}>Store</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title="Accounts"
            icon={<FontAwesomeIcon icon={faUserGroup} />}
          >
            <MenuItemGroup>
              <Menu.Item key="2">
                <Link to={``}>Accounts List</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={``}>Create Account</Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            title="Products"
            icon={<FontAwesomeIcon icon={faFeatherPointed} />}
          >
            <MenuItemGroup>
              <Menu.Item key="4">
                <Link to={``}>Products List</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={``}>Create Product</Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item key="6" icon={<FontAwesomeIcon icon={faClipboardList} />}>
            <Link to={`${pathname}/${viewOrdersList}`}>Orders List</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FontAwesomeIcon icon={faBarChart} />}>
            <Link to={`${pathname}/${viewStatistics}`}>Statistics</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="9"
            icon={
              <FontAwesomeIcon
                className="c-logout-icon"
                icon={faArrowRightFromBracket}
              />
            }
            onClick={() => handleLogOut()}
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
      {renderMenuDependOnRole()}
    </Sider>
  );
}

export default Sidebar;
