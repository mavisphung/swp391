import { Link } from "react-router-dom";
import { Layout, Button, Menu } from "antd";
import { useEffect, useState } from "react";

import "./SidebarLayout.scss";
import config from "~/config";
import { getLastPath } from "~/common/Helper";
import { useUserAuth } from "~/context/UserAuthContext";
import { menuKeys } from "~/system/Constants/constants";

const { Sider } = Layout;

function getItem(key, icon, label, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function Sidebar() {
  const { logOut } = useUserAuth();
  const [key, setKey] = useState("");

  useEffect(() => {
    const newKey = getLastPath(window.location.href);
    console.log(newKey);
    setKey(newKey);
  });

  const handleClick = (e) => {
    setKey(e.key);
  };

  const handleLogOut = () => {
    setTimeout(() => {
      logOut();
    }, 500);
  };

  const renderMenu = () => {
    const menuItems = [
      getItem("account", null, "Tài khoản", [
        getItem(
          `${menuKeys.accountProfile}`,
          null,
          <Link to={config.routes.profile}>Thông tin tài khoản</Link>
        ),
        getItem(
          `${menuKeys.changePassword}`,
          null,
          <Link to={config.routes.passwordManagement}>Thay đổi mật khẩu</Link>
        ),
      ]),
      getItem(
        `${menuKeys.orderList}`,
        null,
        <Link to={config.routes.orderList}>Lịch sử đơn hàng</Link>
      ),
      {
        type: "divider",
      },
      getItem(
        "logOut",
        null,
        <Button type="link" onClick={handleLogOut} danger>
          Đăng xuất
        </Button>
      ),
    ];
    return (
      <Menu
        theme="light"
        className="main-menu"
        items={menuItems}
        mode="inline"
        selectedKeys={[key]}
        selectable={true}
        onClick={handleClick}
      />
    );
  };

  return (
    <Sider theme="light">
      <div className="text-center">
        <h4
          style={{
            borderBottom: "0.2rem solid #0505050f",
            paddingBottom: "10px",
          }}
        >
          Cài đặt
        </h4>
      </div>
      {renderMenu()}
    </Sider>
  );
}

export default Sidebar;
