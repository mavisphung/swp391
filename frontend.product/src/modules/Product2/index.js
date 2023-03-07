import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Product2Layout.scss";
import api from "~/context/AppApi";
import { des1 } from "~/data/Descriptions";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "../Product/widgets/ImageSlider";
import ProductOrderPane2 from "./widgets/ProductOrderPane2";
import AppTrace from "~/components/AppTrace";

function BirdProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"));

  const [pro, setPro] = useState();
  const [relate, setRelate] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getProductWithId = async (id) => {
    try {
      const response = await api.get(`/product/${id}`);

      console.log("PRODUCT2 RES.DATA", response.data);
      if (response.data) {
        setPro(response.data);
      }
    } catch (error) {
      console.log("PRODUCT2 Get /product/:id Error", error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await api.get("/product", {
        params: {
          PageNumber: 1,
          PageSize: 10,
        },
      });

      console.log("PRODUCT2 RES.DATA", response.data);
      if (response.data) {
        const tmp1 = [];
        response.data.forEach((p) => {
          if (p.categoryType === 1) {
            tmp1.push(p);
          }
        });
        setRelate(tmp1);
      }
    } catch (error) {
      console.log("PRODUCT2 Get /product/ Error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProductWithId(productId);
    getProduct();
  }, [productId]);

  if (!pro || isLoading) return <h1>Loading</h1>;

  return (
    <div className="container pro2-ly">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider imgs={pro.medias.filter((_, index) => index !== 0)} />
        </div>
        <div className="col-6">
          <ProductOrderPane2 bird={pro} />
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
        <ProductCarousel list={relate} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default BirdProductDetails;
