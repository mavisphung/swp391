import "./NavbarLayout.scss";

import config from "~/config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "~/context/AppApi";

function Navbar() {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const response = await api.get("/category", {
        params: {
          PageNumber: 1,
          PageSize: 50,
        },
      });
      setCategories(response.data);
    } catch (e) {
      console.log(`Fail to load category: ${e}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="myNavbar">
      <div className="container">
        <Link className="render-link" to={config.routes.home}>
          Trang chủ
        </Link>
        {/* <Link className="render-link">Tin tức</Link> */}
        <div className="dropdown">
          <button className="render-link">Giống chim</button>
          <div className="dropdown-content">
            {categories
              .filter((c) => c.categoryType === 1)
              .map((cate) => (
                <Link className="render-link" key={cate.id}>
                  {cate.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="dropdown">
          <button className="render-link">Lồng chim</button>
          <div className="dropdown-content">
            {categories
              .filter((c) => c.categoryType === 3)
              .map((cate) => (
                <Link className="render-link" key={cate.id}>
                  {cate.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="dropdown">
          <button className="render-link">Thức ăn</button>

          <div className="dropdown-content">
            {categories
              .filter((c) => c.categoryType === 2)
              .map((cate) => (
                <Link className="render-link" key={cate.id}>
                  {cate.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
