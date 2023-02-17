import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./HomeLayout.scss";
import ProductCarousel from "./ProductCarousel";
import CategoryCard from "./CategoryCard";
import api from "~/context/AppApi";
import { birdList, cateList } from "~/data/Products";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [birds, setBirds] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const productRequests = await axios.get(
        "https://localhost:7179/api/product"
      );
      const cateRequests = await axios.get(
        "https://localhost:7179/api/category"
      );
      setBirds(productRequests.data);
      console.log(cateRequests.data);
      // setBirds(dataRequests.data.results);
      return productRequests;
    }
    fetchData();
  }, []);
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
          <ProductCarousel list={birds} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Giống chim đang hot
          </div>
          <ProductCarousel list={birds} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Phụ kiện dành cho chim
          </div>
          <ProductCarousel list={birds} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Thức ăn dành cho chim
          </div>
          <ProductCarousel list={birds} />
        </Row>
        <div style={{ paddingBottom: "150px" }}></div>
      </div>
    </div>
  );
}

export default HomePage;
