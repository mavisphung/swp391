import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { BiSearchAlt } from "react-icons/bi";
import { Checkbox, Slider } from "antd";

import "./CategoryDetailLayout.scss";
import api from "~/context/AppApi";
import AppTrace from "~/components/AppTrace";
import BirdCard from "../Home/BirdCard";
import { formatPrice } from "~/common/Helper";
import CustomSpinner from "~/components/CustomSpinner";
import { loadingText } from "~/system/Constants/constants";

function CategoryPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [productList, setProductList] = useState();

  const [searchKey, setSearchKey] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [inStock, setInStock] = useState(2);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [minValue, setMinValue] = useState(10000); // format date: 2023-02-27
  const [maxValue, setMaxValue] = useState(20010000);

  const location = useLocation();
  let breadcrumb;
  let cateId = location.state.cateId;
  if (location.state) {
    breadcrumb = location.state.breadcrumb;
  }

  console.log("CategoryID", cateId);

  const showModal = () => {
    const modal = document.getElementById("filter-modal");
    modal.style.visibility = "visible";
  };
  const hideModal = () => {
    const modal = document.getElementById("filter-modal");
    modal.style.visibility = "hidden";
  };

  const sortProductList = () => {
    if (productList && productList.length > 1) {
      console.log("SORT", isAscending);
      const newProductList = [...productList].reverse();
      setProductList(newProductList);
    }
  };

  const getProductsWithCategoryId = async (id) => {
    try {
      const response = await api.get("/product", {
        params: {
          CategoryId: id,
          PageNumber: 1,
          PageSize: 10,
          Status: inStock,
          FromPrice: minValue,
          ToPrice: 300000000,
          // ToPrice: maxValue,
          FromDate: minDate,
          ToDate: maxDate,
          Search: queryKey,
        },
      });

      if (response.data) {
        response.data.sort((a, b) => a.price - b.price);
        setProductList(response.data);
      }
    } catch (error) {
      console.log(`Get products with category id ${id} error: ${error}`);
    }
  };

  useEffect(() => {
    getProductsWithCategoryId(categoryId);
  }, [categoryId, inStock, minValue, maxValue, minDate, maxDate, queryKey]);

  useEffect(() => {
    sortProductList();
  }, [isAscending]);

  return (
    <div className="container">
      <AppTrace />
      <div className="div-filter">
        <button id="btn-filter" onClick={showModal}>
          Bộ lọc
        </button>
      </div>

      <div id="filter-modal">
        <div className="filter-modal-content">
          <div>
            <button onClick={hideModal} className="btn-close-filter">
              <ArrowLeftOutlined id="login-left-arrow" />
              <span style={{ paddingTop: "20px !important" }}>Đóng</span>
            </button>
          </div>
          <div className="filter-modal-body">
            <div>
              <h5 style={{ marginTop: "0" }}>Tìm theo tên</h5>
              <div className="d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="Chào mào Ba Tơ..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button
                  className="btn-search"
                  onClick={() => setQueryKey(searchKey)}
                >
                  <BiSearchAlt style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
            <div>
              <h5>Tìm theo trạng thái</h5>
              <select
                className="cbx-filter"
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
              >
                <option key={2} value={2}>
                  Còn hàng
                </option>
                <option key={1} value={1}>
                  Hết hàng
                </option>
              </select>
            </div>
            <div>
              <h5>Lọc theo ngày đăng</h5>
              <div className="d-flex justify-content-between">
                <span>Từ</span>
                <span>Đến</span>
              </div>
              <div className="d-flex justify-content-between">
                <input
                  type="date"
                  value={minDate}
                  onChange={(e) => setMinDate(e.target.value)}
                />
                <input
                  type="date"
                  value={maxDate}
                  onChange={(e) => setMaxDate(e.target.value)}
                  style={{ marginLeft: "30px" }}
                />
              </div>
            </div>
            <div>
              <h5>Lọc theo giá</h5>
              <div>
                <Checkbox
                  checked={isAscending}
                  onChange={() => setIsAscending(true)}
                >
                  Thấp nhất
                </Checkbox>
              </div>
              <div>
                <Checkbox
                  checked={!isAscending}
                  onChange={() => setIsAscending(false)}
                >
                  Cao nhất
                </Checkbox>
              </div>
              <div style={{ marginTop: "9px" }}>
                <div className="d-flex justify-content-between">
                  <span>Từ</span>
                  <span>Đến</span>
                </div>
                <Slider
                  range
                  min={10000}
                  max={40000000}
                  step={100000}
                  defaultValue={[10000, 20010000]}
                  onChange={([val1, val2]) => {
                    setMinValue(val1);
                    setMaxValue(val2);
                  }}
                />
                <div className="d-flex justify-content-between">
                  <span>{formatPrice(minValue)} đ</span>
                  <span>{formatPrice(maxValue)} đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {productList ? (
        <div className="row">
          {productList
            .filter((prod) => prod.categoryId === cateId)
            .map((b) => {
              return (
                <div className="cate-bird-card col-4" key={b.id}>
                  <BirdCard bird={b} historyUrl={breadcrumb} />
                </div>
              );
            })}
        </div>
      ) : (
        <CustomSpinner text={loadingText} />
      )}
    </div>
  );
}

export default CategoryPage;
