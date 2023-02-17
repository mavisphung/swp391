import "./Product2Layout.scss";
import { des1 } from "~/data/Descriptions";
import { birdList } from "~/data/Products";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "../Product/widgets/ImageSlider";
import ProductOrderPane2 from "./widgets/ProductOrderPane2";
import AppTrace from "~/components/AppTrace";

function Product2() {
  return (
    <div className="container pro2-ly">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider />
        </div>
        <div className="col-6">
          <ProductOrderPane2 />
        </div>
      </div>
      <div>
        <h5>Mô tả sản phẩm</h5>
        <div className="my-hr"></div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <iframe
            title="chim chao mao"
            width="540"
            height="305"
            allowFullScreen={true}
            src="https://www.youtube.com/embed/OAnU9XPM5Ms"
          ></iframe>
        </div>
        <div>
          <h6>Thông tin chi tiết</h6>
          {des1.map((e, index) => {
            return (
              <div key={index}>
                <span className="pro2-title">{e.title}</span>
                <p>{e.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h5>Sản phẩm tương tự</h5>
        <div className="my-hr"></div>
        <ProductCarousel list={birdList} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default Product2;
