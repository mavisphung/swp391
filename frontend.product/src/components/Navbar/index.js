import "./NavbarLayout.scss";
import config from "../../config";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="myNavbar">
      <div className="container">
        <Link className="render-link" to={config.dashboardRoutes.home}>
          Trang chủ
        </Link>
        <Link className="render-link">Thương hiệu</Link>
        <div className="dropdown">
          <button>Các loại phụ kiện</button>
          <div className="dropdown-content">
            <Link className="render-link">Loại 1</Link>
            <Link className="render-link">Loại 2</Link>
            <Link className="render-link">Loại 3</Link>
          </div>
        </div>
        <Link className="render-link" to={config.dashboardRoutes.aboutUs}>
          Liên hệ
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
