import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./HomeLayout.scss";
import ProductCarousel from "./ProductCarousel";
import CategoryCard from "./CategoryCard";
import api from "~/context/AppApi";
import { birdList, cateList } from "~/data/Products";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";

function HomePage() {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/product", {
        params: {
          PageNumber: 1,
          PageSize: 10,
        },
      });
      console.log("RES", response);
      console.log("RES.DATA", response.data);
      if (response.data) {
        setBirds(response.data);
      }
    } catch (error) {
      console.log("Get /api/product Error", error);
    }
  };

  return (
    <div className="container">
      <BirdCarousel />
      <div>
        <div className="d-flex justify-content-center home-title">
          Danh mục sản phẩm
        </div>
        <Row>
          <Col md>
            {cateList.map((cate) => (
              <CategoryCard key={cate.id} cate={cate} />
            ))}
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Sản phẩm bán chạy
          </div>
          <ProductCarousel list={birdList} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Giống chim đang hot
          </div>
          <ProductCarousel list={birds} type={1} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Phụ kiện dành cho chim
          </div>
          <ProductCarousel list={birdList} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Thức ăn dành cho chim
          </div>
          <ProductCarousel list={birdList} />
        </Row>
        <div style={{ paddingBottom: "150px" }}></div>
      </div>
    </div>
  );
}

export default HomePage;
