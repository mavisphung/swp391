import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./HomeLayout.scss";
import "react-toastify/dist/ReactToastify.css";
import ProductCarousel from "./ProductCarousel";
import CategoryCard from "./CategoryCard";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";
import api from "~/context/AppApi";

function HomePage() {
  const [birds, setBirds] = useState([]);
  const [foods, setFoods] = useState([]);
  const [popular, setPopular] = useState([]);
  const [others, setOthers] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/product", {
        params: {
          PageNumber: 1,
          PageSize: 50,
        },
      });

      // console.log("RES", response);
      // console.log("RES.DATA", response.data);
      if (response.data) {
        const tmp1 = [];
        const tmp2 = [];
        const tmp3 = [];
        response.data.forEach((p) => {
          if (p.categoryType === 1) {
            tmp1.push(p);
          } else if (p.categoryType === 2) {
            tmp2.push(p);
          } else {
            tmp3.push(p);
          }
        });
        const tmp4 = tmp1.concat(tmp2);
        setBirds(tmp1);
        setFoods(tmp2);
        setOthers(tmp3);
        setPopular(tmp4);
      }
    } catch (error) {
      console.log("Get /product/ Error", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await api.get("/category", {
        params: {
          PageNumber: 1,
          PageSize: 8,
        },
      });
      setCategories(response.data);
      console.log(categories);
    } catch (e) {
      console.log(`Fail to load category: ${e}`);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
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
          <ProductCarousel list={others} />
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
