import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import "./ProductLayout.scss";
import ProductCarousel from "../Home/ProductCarousel";
import ImageSlider from "./widgets/ImageSlider";
import ListComment from "./widgets/ListComment";
import ProductInfo from "./widgets/ProductInfo";
import ProductOrderPane from "./widgets/ProductOrderPane";
import AppTrace from "~/components/AppTrace";
import config from "~/config";
import api from "~/context/AppApi";

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("productId"));

  const [pro, setPro] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [relate, setRelate] = useState();
  const [others, setOthers] = useState();
  const [count, setCount] = useState(1);

  const location = useLocation();
  const { categoryType } = location.state;

  const getProductWithId = async (id) => {
    try {
      const response = await api.get(`/product/${id}`);

      console.log("RES", response);
      console.log("RES.DATA", response.data);
      if (response.data) {
        setPro(response.data);
      }
    } catch (error) {
      console.log("Get /product/:id Error", error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await api.get("/product", {
        params: {
          PageNumber: count,
          PageSize: 10,
        },
      });

      console.log("RES", response);
      console.log("RES.DATA", response.data);
      if (response.data) {
        setCount(count + 1);
        const tmp1 = [];
        const tmp2 = [];
        response.data.map((p) => {
          if (p.categoryType === categoryType) {
            tmp1.push(p);
          } else {
            tmp2.push(p);
          }
        });
        setRelate(tmp1);
        setOthers(tmp2);
      }
    } catch (error) {
      console.log("Get /product/ Error", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProductWithId(productId);
    getProduct();
  }, []);

  if (!pro || isLoading) return <h1>Loading</h1>;

  return (
    <div className="container">
      <AppTrace />
      <div className="row">
        <div className="col-6">
          <ImageSlider imgs={pro.medias.filter((_, index) => index !== 0)} />
        </div>
        <div className="col-6">
          <ProductOrderPane name={pro.name} price={pro.price} />
        </div>
      </div>
      <ProductInfo />
      <div className="product-block">
        <h5>Mọi người thường mua kèm với</h5>
        <ProductCarousel list={others} />
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
        <ProductCarousel list={relate} />
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
    </div>
  );
}

export default ProductDetails;
