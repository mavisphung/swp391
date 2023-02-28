import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{bird.name}</h4>
      <span>Mã chuồng: </span>
      <span>{bird.productCode.substring(0, 6)}</span>
      <br />
      <span>Ngày đăng: </span>
      <span>{bird.createdDate.substring(0, 10)}</span>
      <br />
      <span>Tuổi: </span>
      <span></span>
      <br />
      <span>Giá: </span>
      <span className="price text-dark text-decoration-line-through">
        {formatPrice(bird.price + (bird.price * 20) / 100)} đ
      </span>
      <span className="price ps-2">{formatPrice(bird.price)} đ</span>
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
