import { useSearchParams } from "react-router-dom";

import "./ProductLayout.scss";
import { birdList, proList } from "~/data/Products";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "./widgets/ImageSlider";
import ListComment from "./widgets/ListComment";
import ProductInfo from "./widgets/ProductInfo";
import ProductOrderPane from "./widgets/ProductOrderPane";
import AppTrace from "~/components/AppTrace";
import config from "~/config";

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"));
  const pro = birdList.find((b) => b.id === productId);

  return (
    <div className="container">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider img={pro?.img} />
        </div>
        <div className="col-6">
          <ProductOrderPane name={pro?.name} price={pro?.price} />
        </div>
      </div>
      <ProductInfo />
      <div className="product-block">
        <h5>Mọi người thường mua kèm với</h5>
        <ProductCarousel list={birdList} />
      </div>
      <div className="product-block">
        <div className="d-flex justify-content-between">
          <h5>Đánh giá từ người dùng</h5>
          <a href={config.routes.dashboard}>Xem thêm</a>
        </div>
        <ListComment />
      </div>
      <div className="product-block">
        <h5>Sản phẩm tương tự</h5>
        <ProductCarousel list={proList} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default ProductDetails;
