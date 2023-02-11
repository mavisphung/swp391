import { HomeFilled, RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import ImageSlider from "./widgets/Image-slider";

function ProductDetails() {
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
        <div className="col">
          <ImageSlider />
        </div>
        <div className="col">
          <h4>Product Detail</h4>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
