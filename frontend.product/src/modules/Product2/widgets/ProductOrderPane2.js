import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { addToCart } from "~/common/LocalStorageUtil";

function ProductOrderPane2({
  name = "Chào mào bẫy đấu Ba Tơ",
  code = "BT71",
  createdDate = "12-01-2023",
  age = "3 tháng",
  price = 1200000,
}) {
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault();
    navigate(config.routes.cart);
  };

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{name}</h4>
      <span>Mã chuồng: </span>
      <span>{code}</span>
      <br />
      <span>Ngày đăng: </span>
      <span>{createdDate}</span>
      <br />
      <span>Tuổi: </span>
      <span>{age}</span>
      <br />
      <span>Giá: </span>
      <span className="price">{formatPrice(price)} đ</span>
      <div className="pro-order-ctr">
        <Button className="btn-buy" onClick={handleBuyClick}>
          Mua ngay
        </Button>
        <Button
          className="btn-add-cart"
          onClick={(e) => {
            e.preventDefault();
            // addToCart(props.bird);
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
