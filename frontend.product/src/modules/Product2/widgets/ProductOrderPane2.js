import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../Product2Layout.scss";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { useUserCart } from "~/context/UserCartContext";

function ProductOrderPane2({ bird }) {
  const { dispatch } = useUserCart();
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TO_CART",
      payload: bird,
    });
    navigate(config.routes.cart);
  };

  const isRetail = bird.age && bird.gender != null ? true : false;

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{bird.name}</h4>
      {isRetail ? (
        <div>
          <span className="pro2-des-label">MSP: </span>
          <span>{`LT0${bird.id}`}</span>
          <br />
          <span className="pro2-des-label">Tuổi: </span>
          <span>{bird.age}</span>
          <br />
        </div>
      ) : (
        <>
          <span>Chim bán theo loài</span>
          <br />
        </>
      )}
      <span className="pro2-des-label">Ngày đăng: </span>
      <span>{bird.createdDate.substring(0, 10)}</span>
      <br />
      <span className="pro2-des-label">Mô tả: </span>
      <div>
        <p>{bird.shortDescription}</p>
        <p>{bird.description}</p>
      </div>
      <br />
      <span className="pro2-des-label">Trạng thái: </span>
      <span>{bird.status === 2 ? "Còn hàng" : "Đã bán"}</span>
      <br />
      <span className="pro2-des-label">Giá: </span>
      <span className="price">{formatPrice(bird.price)} đ</span>
      <div className="pro-order-ctr">
        <Button className="btn-buy" onClick={handleBuyClick}>
          Mua ngay
        </Button>
        <Button
          className="btn-add-cart"
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "ADD_TO_CART",
              payload: bird,
            });
          }}
        >
          Thêm giỏ hàng
        </Button>
      </div>
      <br />
    </div>
  );
}

export default ProductOrderPane2;
