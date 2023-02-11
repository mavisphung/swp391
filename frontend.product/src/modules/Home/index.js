import BirdCard from "./BirdCard";
import "./HomeLayout.scss";
import Bird from "../../models/Bird";
import BirdCarousel from "~/components/BirdCarousel/BirdCarousel";
import {
  Button,
  Card,
  Col,
  Container,
  Figure,
  Image,
  Row,
} from "react-bootstrap";
import Category from "~/models/Category";
import CategoryCard from "./CategoryCard";

function HomePage() {
  const listBirds2 = [
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chào mào bẫy đấu Ba Tơ",
      "https://www.chimcanhvietnam.vn/images/sanpham/2135923823ml116.jpg",
      950000
    ),
    new Bird(
      "Chào mào bẫy đấu Ba Tơ",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
  ];

  const listCategory = [
    new Category(
      "Chào mào",
      "https://thuvienthucung.com/wp-content/uploads/2021/09/Cam-Nang-Nuoi-Cham-Soc-Chim-Chao-Mao.jpg"
    ),
    new Category(
      "Vành khuyên",
      "https://cdn.tcdulichtphcm.vn/upload/4-2021/images/2021-12-06/1638757785-c64c0545b00759590016.jpg"
    ),
    new Category(
      "Sơn ca",
      "https://truyenngan.net/wp-content/uploads/2018/01/chim-son-ca-1-1-1.jpg"
    ),
    new Category(
      "Chích chòe",
      "https://thiensoncam.com/storage/product/2/18a.jpg"
    ),
    new Category(
      "Thức ăn",
      "https://thuvienthucung.com/wp-content/uploads/2021/10/Thuc-an-dinh-duong-cho-chao-mao.jpg"
    ),
    new Category(
      "Lồng chim",
      "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2020/06/27/longchimtienty-4-1593208921749.jpg"
    ),
    new Category(
      "Phụ kiện",
      "http://longchimvac.net/app/webroot/uploads/images/ba-lo-long-chim-vanh-khuyen.jpg"
    ),
    new Category(
      "Xem thêm",
      "https://dennisagle.files.wordpress.com/2013/08/threedot.jpg"
    ),
  ];

  return (
    <div>
      <Container className="d-flex justify-content-center">
        Cửa hàng ChyStore chuyên phân phối các loại chim cảnh khu vực miền Nam{" "}
      </Container>
      <BirdCarousel />
      {/* <div className="container home-flex-container">
        {listBirds2.map((b) => BirdCard(b))}
      </div> */}
      <Container>
        <div className="d-flex justify-content-center h4 py-3">
          Danh mục sản phẩm
        </div>
        <Row>
          <Col md>{listCategory.map((cate) => CategoryCard(cate))}</Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center h4 py-3">
            Sản phảm bán chạy
          </div>
          <div className="overflow-auto d-flex">
            {listBirds2.map((b) => BirdCard(b))}
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center h4 py-3">
            Giống chim đang hot
          </div>
          <div className="overflow-auto d-flex">
            {listBirds2.map((b) => BirdCard(b))}
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center h4 py-3">
            Phụ kiện dành cho chim
          </div>
          <div className="overflow-auto d-flex">
            {listBirds2.map((b) => BirdCard(b))}
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center h4 py-3">
            Thức ăn dành cho chim
          </div>
          <div className="overflow-auto d-flex">
            {listBirds2.map((b) => BirdCard(b))}
          </div>
        </Row>

        {/* <Row>
          <Card>
            <Card.Img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"></Card.Img>
          </Card>
        </Row> */}
        <div style={{ paddingBottom: "150px" }}></div>
      </Container>
    </div>
  );
}

export default HomePage;
