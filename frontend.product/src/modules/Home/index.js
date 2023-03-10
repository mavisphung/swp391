import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./HomeLayout.scss";
import "react-toastify/dist/ReactToastify.css";
import ProductCarousel from "./ProductCarousel";
import CategoryCard from "./CategoryCard";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";
import api from "~/context/AppApi";
import { getProductList } from "~/data/ProductRepository";
import { categoryType } from "~/models/CategoryType";

function HomePage() {
  const [birds, setBirds] = useState([]);
  const [foods, setFoods] = useState([]);
  const [popular, setPopular] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await api.get("/category", {
          params: {
            PageNumber: 2,
            PageSize: 9,
          },
        });
        setCategories(response.data);
        console.log(categories);
      } catch (e) {
        console.log(`Fail to load category: ${e}`);
      }
    };

    getCategory();

    const getProductsByType = async (CategoryType, arr, setArr) => {
      const data = await getProductList({
        CategoryType,
      });
      if (data && data.length > 0) {
        const tmp = arr.slice();
        tmp.push(...data);
        setArr(tmp);
      }
    };

    getProductsByType(categoryType.bird, popular, setPopular);
    getProductsByType(categoryType.bird, birds, setBirds);
    getProductsByType(categoryType.accessory, accessory, setAccessory);
    getProductsByType(categoryType.food, foods, setFoods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <BirdCarousel />
      <div>
        <div className="d-flex justify-content-center home-title">
          Danh mục sản phẩm
        </div>
        <Row>
          <Col md={12}>
            {categories.map((cate) => (
              <CategoryCard key={cate.id} cate={cate} />
            ))}
            <CategoryCard
              cate={{
                id: 7,
                name: "Xem thêm",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlQ18XoCeH7nThpXbP5HApe3AA1LhldLbK9g&usqp=CAU",
              }}
            />
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Sản phẩm bán chạy
          </div>
          <ProductCarousel list={popular} />
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
          <ProductCarousel list={accessory} />
        </Row>
        <Row>
          <div className="d-flex justify-content-center home-title">
            Thức ăn dành cho chim
          </div>
          <ProductCarousel list={foods} />
        </Row>
        <div style={{ paddingBottom: "150px" }}></div>
      </div>
    </div>
  );
}

export default HomePage;
