import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { addToCart } from "~/common/LocalStorageUtil";

function ProductOrderPane2({ bird }) {
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault();
    navigate(config.routes.cart);
  };

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{bird.name}</h4>
      <span>Mã chuồng: </span>
      <span>{bird.productCode.substring(0, 7)}</span>
      <br />
      <span>Ngày đăng: </span>
      <span>{bird.createdDate}</span>
      <br />
      <span>Tuổi: </span>
      <span></span>
      <br />
      <span>Giá: </span>
      <span className="price">{formatPrice(bird.price)} đ</span>
      <div className="pro-order-ctr">
        <Button className="btn-buy" onClick={handleBuyClick}>
          Mua ngay
        </Button>
        <Button
          className="btn-add-cart"
          onClick={(e) => {
            e.preventDefault();
            addToCart(bird);
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
