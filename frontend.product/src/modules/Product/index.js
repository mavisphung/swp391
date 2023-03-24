import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import "./ProductLayout.scss";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "./widgets/ImageSlider";
import ListComment from "./widgets/ListComment";
import ProductInfo from "./widgets/ProductInfo";
import ProductOrderPane from "./widgets/ProductOrderPane";
import AppTrace from "~/components/AppTrace";
import config from "~/config";
import CustomSpinner from "~/components/CustomSpinner";
import {
  getProductList,
  getProductWithId,
  getRelativeList,
} from "~/data/ProductRepository";
import { mediaType } from "~/models/CategoryType";
import { getEmbedUrl } from "~/common/Helper";
import { loadingText } from "~/system/Constants/constants";

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"));

  const [pro, setPro] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [relate, setRelate] = useState([]);
  const [proSameCate, setProSameCate] = useState([]);

  const getProductById = async (productId) => {
    const data = await getProductWithId(productId);

    if (data) {
      setPro(data);
      if (
        data.medias[0].type === mediaType.mp4 ||
        data.medias[0].type === mediaType.svg
      ) {
        setVideoUrl(getEmbedUrl(data.medias[0].url));
      }

      getRelativeProducts(productId, data.categoryType);
    }
  };

  const getRelativeProducts = async (productId, CategoryType) => {
    const data = await getRelativeList({
      productId,
    });
    if (data && data.length > 0) {
      const tmp = relate.slice();
      tmp.push(...data);
      setRelate(tmp);
    }

    const data1 = await getProductList({
      CategoryType,
    });
    if (data1 && data1.length > 0) {
      const tmp = proSameCate.slice();
      tmp.push(...data1);
      setProSameCate(tmp);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProductById(productId);
  }, [productId]);

  if (!pro || isLoading) return <CustomSpinner text={loadingText} />;

  return (
    <div className="container">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider imgs={pro.medias.filter((_, index) => index !== 0)} />
        </div>
        <div className="col-6">
          <ProductOrderPane pro={pro} />
        </div>
      </div>
      <ProductInfo />
      <br />

      {videoUrl && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <iframe
            title="Product description video"
            width="540"
            height="305"
            allowFullScreen={true}
            src={videoUrl}
          ></iframe>
        </div>
      )}

      <div className="product-block">
        <h5>Mọi người thường mua kèm với</h5>
        <ProductCarousel list={relate} />
      </div>
      <div className="product-block">
        <div className="d-flex justify-content-between">
          <h5>Đánh giá từ người dùng</h5>
          <Link to={config.routes.dashboard}>Xem thêm</Link>
        </div>
        <ListComment />
      </div>
      <div className="product-block">
        <h5>Sản phẩm tương tự</h5>
        <ProductCarousel list={proSameCate} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default ProductDetails;
