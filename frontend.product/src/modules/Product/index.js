import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import Bird from "~/models/Bird";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "./widgets/ImageSlider";
import ListComment from "./widgets/ListComment";
import ProductInfo from "./widgets/ProductInfo";
import ProductOrderPane from "./widgets/ProductOrderPane";

function ProductDetails({ relateList, relateList2 }) {
  relateList = relateList
    ? relateList
    : [
        new Bird(
          "Ba lô đeo lồng chim ChyStore",
          "https://www.chimcanhvietnam.vn/images/sanpham/210765393421390586_341776619584210_635816962_o.jpg",
          250000
        ),
        new Bird(
          "Áo lồng dành cho lồng tròn",
          "https://cf.shopee.vn/file/c87eea1ced997c0ff3cb2d50a682c2f4",
          20000
        ),
        new Bird(
          "Áo lồng dành cho lồng tròn",
          "https://cf.shopee.vn/file/c87eea1ced997c0ff3cb2d50a682c2f4",
          20000
        ),
      ];

  relateList2 = relateList2
    ? relateList2
    : [
        new Bird(
          "Ba lô đeo lồng chim ChyStore",
          "https://www.chimcanhvietnam.vn/images/sanpham/210765393421390586_341776619584210_635816962_o.jpg",
          250000
        ),
        new Bird(
          "Áo lồng dành cho lồng tròn",
          "https://cf.shopee.vn/file/c87eea1ced997c0ff3cb2d50a682c2f4",
          20000
        ),
        new Bird(
          "Áo lồng dành cho lồng tròn",
          "https://cf.shopee.vn/file/c87eea1ced997c0ff3cb2d50a682c2f4",
          20000
        ),
        new Bird(
          "Ba lô đeo lồng chim ChyStore",
          "https://www.chimcanhvietnam.vn/images/sanpham/210765393421390586_341776619584210_635816962_o.jpg",
          250000
        ),
        new Bird(
          "Áo lồng dành cho lồng tròn",
          "https://cf.shopee.vn/file/c87eea1ced997c0ff3cb2d50a682c2f4",
          20000
        ),
      ];

  return (
    <div className="container">
      <p>
        Cửa hàng ChyStore chuyên phân phối các loại chim cảnh khu vực miền Nam
      </p>
      <div>
        <Breadcrumb separator={<RightOutlined />}>
          <Breadcrumb.Item href="">
            <HomeFilled />
            <span>Trang chủ</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Lồng chim</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Lồng kỹ chào mào</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-6">
          <ImageSlider />
        </div>
        <div className="col-6">
          <ProductOrderPane />
        </div>
      </div>
      <ProductInfo />
      <div className="product-block">
        <h5>Mọi người thường mua kèm với</h5>
        <ProductCarousel list={relateList} />
      </div>
      <div className="product-block">
        <div className="d-flex justify-content-between">
          <h5>Đánh giá từ người dùng</h5>
          <a href="#">Xem thêm</a>
        </div>
        <ListComment />
      </div>
      <div className="product-block">
        <h5>Sản phẩm tương tự</h5>
        <ProductCarousel list={relateList2} />
      </div>
      <div style={{ marginBottom: "60px" }}></div>
    </div>
  );
}

export default ProductDetails;
