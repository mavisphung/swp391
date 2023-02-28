import { Rate } from "antd";
import { Button } from "react-bootstrap";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "../ProductLayout.scss";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { useUserCart } from "~/context/UserCartContext";

function ProductOrderPane({ pro }) {
  // name = name ? name : "Lồng kỹ chào mào";
  // rating = rating ? rating : 4.5;
  // des = des
  //   ? des
  //   : "Lồng được áp dụng chính sách 'HOÀN TIỀN' nếu khách hàng tìm được lỗi sản phẩm lúc nhận hàng. Gía lồng 720.000đ áp dụng cho tất cả các size (64, 68, 72)";
  // price = price ? price : 950000;
  // cate = cate ? cate : ["64 nan", "72 nan", "90 nan"];

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
      <span>Đánh giá: </span>
      <Rate
        allowHalf
        disabled
        value={pro.rating}
        defaultValue={4.5}
        character={<MdOutlineStar />}
      />
      <span>({pro.rating})</span>
      <p>{pro.description}</p>
      <p className="price">{formatPrice(pro.price)} đ</p>
      {/* <span>Chọn loại:</span>
      <select id="cb-cate">
        {cate.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select> */}
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
