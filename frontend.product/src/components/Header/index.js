import "./HeaderLayout.scss";
import config from "../../config";

function Header() {
  return (
    <div className="header">
      <div className="topping">
        <div className="container">
          <a href={config.routes.login} className="authen-link">
            Đăng nhập
          </a>
          <a href={config.routes.register} className="authen-link">
            Đăng ký
          </a>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
    </div>
  );
}

export default Header;
