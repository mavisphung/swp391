import { Col, Row } from "react-bootstrap";

import "./HomeLayout.scss";
import ProductCarousel from "./ProductCarousel";
import CategoryCard from "./CategoryCard";
import { birdList, cateList } from "~/data/Products";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";

function HomePage() {
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
          <ProductCarousel list={birdList} />
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

        {/* <Row>
          <Card>
            <Card.Img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"></Card.Img>
          </Card>
        </Row> */}
        <div style={{ paddingBottom: "150px" }}></div>
      </div>
    </div>
  );
}

export default HomePage;
