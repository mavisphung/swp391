import { useNavigate } from "react-router-dom";

import "./CartLayout.scss";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { getCart } from "~/common/LocalStorageUtil";
import CartItem from "./widgets/CartItem";

function CartDetails() {
  let total = 0;

  const cartList = getCart();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(config.routes.confirmLogin);
  };

  return (
    <div className="container cart-detail">
      <div className="row">
        <div className="col-12 col-lg-9" style={{ marginRight: "30px" }}>
          <h5>Hiện đang có {cartList.length} sản phẩm trong giỏ hàng</h5>
          <hr />
          {cartList.map((e) => {
            total += e.price * 1;
            return (
              <CartItem
                key={e.id}
                id={e.id}
                name={e.name}
                img={e.img}
                price={e.price}
                amount={1}
                isBuy={true}
              />
            );
          })}
          <span>
            *ChyStore sẽ gọi điện và gửi Email để xác nhận đơn hàng khi khách
            hàng nhấn
          </span>
          <span style={{ textDecoration: "underline", marginLeft: "3px" }}>
            Đặt hàng
          </span>
        </div>
        <div className="col cart-total">
          <h5>Tổng cộng:</h5>
          <div className="price">{formatPrice(total)}đ</div>
          <button className="btn-buy" onClick={handleClick}>
            Đặt hàng
          </button>
          <br />
          <a href={config.routes.dashboard}>
            <span>Tiếp tục mua hàng?</span>
            <br />
            <span>Trở về</span>
          </a>
        </div>
      </div>
      <div className="row" style={{ marginTop: "37px" }}>
        <div className="col-12 col-lg-9">
          <h5>Lần sau mua tiếp</h5>
          <hr />
          {cartList.map((e) => (
            <CartItem
              key={e.id}
              id={e.id}
              name={e.name}
              img={e.img}
              price={e.price}
              amount={1}
              isBuy={false}
            />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "60px" }}></div>
    </div>
  );
}

export default CartDetails;
