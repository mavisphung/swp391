import { Rate } from "antd";
import { Button } from "react-bootstrap";
import { MdOutlineStar } from "react-icons/md";

import "../ProductLayout.scss";
import { formatPrice } from "~/common/Helper";

function ProductOrderPane({ name, rating, des, price, cate }) {
  name = name ? name : "Lồng kỹ chào mào";
  rating = rating ? rating : 4.5;
  des = des
    ? des
    : "Lồng được áp dụng chính sách 'HOÀN TIỀN' nếu khách hàng tìm được lỗi sản phẩm lúc nhận hàng. Gía lồng 720.000đ áp dụng cho tất cả các size (64, 68, 72)";
  price = price ? price : 950000;
  cate = cate ? cate : ["64 nan", "72 nan", "90 nan"];

  return (
    <div id="order-pane">
      <h4 style={{ fontWeight: 400 }}>{name}</h4>
      <span>Đánh giá: </span>
      <Rate
        allowHalf
        disabled
        value={rating}
        defaultValue={4.5}
        character={<MdOutlineStar />}
      />
      <span>({rating})</span>
      <p>{des}</p>
      <p className="price">{formatPrice(price)} đ</p>
      <span>Chọn loại:</span>
      <select id="cb-cate">
        {cate.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="pro-order-ctr">
        <Button className="btn-buy">Mua ngay</Button>
        <Button className="btn-add-cart">Thêm giỏ hàng</Button>
      </div>
      <br />
    </div>
  );
}

export default ProductOrderPane;
