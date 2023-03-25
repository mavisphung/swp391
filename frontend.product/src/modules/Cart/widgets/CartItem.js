import { useState } from "react";

import "../CartLayout.scss";
import { formatPrice } from "~/common/Helper";
import { useUserCart } from "~/context/UserCartContext";

function CartItem({ id, name, img, des, price, amount, isBuy }) {
  const { dispatch } = useUserCart();
  const [newAmount, setAmount] = useState(amount);
  const total = price * newAmount;

  const getDescription = () => {
    const arr = des.split(" ");
    if (arr.length > 29) {
      const newDes = arr.slice(0, 29).join(" ");
      return newDes + "...";
    }
    return arr.join(" ");
  };

  return (
    <div className="row cart-row">
      <div className="d-none d-lg-inline col-lg-3">
        <img src={img} alt={id} />
      </div>
      <div className="row col-12 col-lg-9">
        <h6>{name}</h6>
        <div className="col-9">
          <div className="row">
            <span className="col-7">Mô tả: {getDescription()}</span>
            <span className="col-5" style={{ textAlign: "right" }}>
              Giá sản phẩm: {formatPrice(price)}đ
            </span>
          </div>
          <div className="row">
            <div className="mt15 col-md-7">
              <span>Số lượng:</span>
              <input
                type="number"
                min={1}
                value={newAmount}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                  const value = e.target.value;
                  setAmount(value);
                  dispatch({
                    type: "UPDATE_AMOUNT",
                    payload: {
                      proId: id,
                      amount: value,
                    },
                  });
                }}
              />
            </div>
            <div className="mt15 col-md-5" style={{ textAlign: "right" }}>
              <span>Thành tiền: </span>
              <span style={{ textDecoration: "underline" }}>
                {formatPrice(total)}đ
              </span>
            </div>
          </div>
        </div>
        <div className="col-3 d-flex align-items-end flex-column">
          <button
            onClick={(e) => {
              e.preventDefault();
              // addToCart(props.bird);
            }}
          >
            {isBuy ? "Để dành lần sau" : "Thêm vào đơn hàng"}
          </button>
          <button
            className="mt15"
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: id,
              });
            }}
          >
            Xóa?
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
