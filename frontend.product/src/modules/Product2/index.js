import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Product2Layout.scss";
import { des1 } from "~/data/Descriptions";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "../Product/widgets/ImageSlider";
import ProductOrderPane2 from "./widgets/ProductOrderPane2";
import AppTrace from "~/components/AppTrace";
import CustomSpinner from "~/components/CustomSpinner";
import {
  getProductList,
  getProductWithId,
  getRelativeList,
} from "~/data/ProductRepository";
import { mediaType } from "~/models/CategoryType";
import { getEmbedUrl } from "~/common/Helper";
import { loadingText } from "~/system/Constants/constants";

function BirdProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"));

  const [pro, setPro] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [relate, setRelate] = useState([]);
  const [proSameCate, setProSameCate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="container pro2-ly">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider
            imgs={pro.medias.filter((media) => media.type <= mediaType.jpg)}
          />
        </div>
        <div className="col-6">
          <ProductOrderPane2 bird={pro} />
        </div>
      </div>
      <div>
        <h5>Mô tả sản phẩm</h5>
        <div className="my-hr"></div>

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
      <div className="product-block">
        <h5>Mọi người thường mua kèm với</h5>
        <ProductCarousel list={relate} />
      </div>
      <div>
        <h5>Sản phẩm tương tự</h5>
        <div className="my-hr"></div>
        <ProductCarousel list={proSameCate} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default BirdProductDetails;
