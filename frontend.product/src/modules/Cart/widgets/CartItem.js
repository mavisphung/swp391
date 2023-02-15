import { useState } from "react";
import { formatPrice } from "~/common/Helper";

import "../CartLayout.scss";

function CartItem({ id, name, img, cate, price, amount, isBuy }) {
  const [newAmount, setAmount] = useState(amount);
  const total = price * newAmount;
  return (
    <div className="row cart-row">
      <div className="d-none d-lg-inline col-lg-3">
        <img src={img} alt={id} />
      </div>
      <div className="row col-12 col-lg-9">
        <h6>{name}</h6>
        <div className="col-9">
          <div className="d-flex justify-content-between">
            <span>Loại: {cate ? cate : "64 nan"}</span>
            <span>Giá sản phẩm: {formatPrice(price)}đ</span>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mt15">
              <span>Số lượng:</span>
              <input
                className="no-spinner"
                type="number"
                value={newAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value <= 0) {
                    setAmount(1);
                  } else {
                    setAmount(e.target.value);
                  }
                }}
              />
            </div>
            <div className="mt15">
              <span>Thành tiền: </span>
              <span style={{ textDecoration: "underline" }}>
                {formatPrice(total)}đ
              </span>
            </div>
          </div>
        </div>
        <div className="col-3 d-flex align-items-end flex-column">
          <a href="/">{isBuy ? "Để dành lần sau" : "Thêm vào đơn hàng"}</a>
          <a href="/" className="mt15">
            Xóa?
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartItem;