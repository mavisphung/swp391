import "./NavbarLayout.scss";
import config from "~/config";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="myNavbar">
      <div className="container">
        <Link className="render-link" to={config.routes.home}>
          Trang chủ
        </Link>
        <Link className="render-link">Tin tức</Link>
        <div className="dropdown">
          <button className="render-link">Giống chim</button>
          <div className="dropdown-content">
            <Link className="render-link">Loại 1</Link>
            <Link className="render-link">Loại 2</Link>
            <Link className="render-link">Loại 3</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="render-link">Lồng chim</button>
          <div className="dropdown-content">
            <Link className="render-link">Loại 1</Link>
            <Link className="render-link">Loại 2</Link>
            <Link className="render-link">Loại 3</Link>
          </div>
        </div>
        <div className="dropdown">
          <button className="render-link">Phụ kiện</button>
          <div className="dropdown-content">
            <Link className="render-link">Loại 1</Link>
            <Link className="render-link">Loại 2</Link>
            <Link className="render-link">Loại 3</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
