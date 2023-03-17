// import { Rate } from "antd";
import { Button } from "react-bootstrap";
// import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "../ProductLayout.scss";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { useUserCart } from "~/context/UserCartContext";

function ProductOrderPane({ pro }) {
  const { dispatch } = useUserCart();
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TO_CART",
      payload: pro,
    });
    navigate(config.routes.cart);
  };

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{pro.name}</h4>
      {/* <span>Đánh giá: </span>
      <Rate
        allowHalf
        disabled
        value={pro.rating}
        defaultValue={4.5}
        character={<MdOutlineStar />}
      />
      <span>({pro.rating})</span> */}
      <span className="pro-des-label">Ngày đăng: </span>
      <span>{pro.createdDate.substring(0, 10)}</span>
      <br />
      <span className="pro-des-label">Mô tả: </span>
      <div>
        {/* <p>{pro.shortDescription}</p> */}
        <p>{pro.description}</p>
      </div>
      <br />
      <span className="pro-des-label">Trạng thái: </span>
      <span>{pro.status === 2 ? "Còn hàng" : "Đã bán"}</span>
      <br />
      <span className="pro-des-label">Giá: </span>
      <span className="price">{formatPrice(pro.price)} đ</span>
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
              payload: pro,
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

export default ProductOrderPane;
