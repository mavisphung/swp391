import { Rate } from "antd";
import { MdOutlineStar } from "react-icons/md";
import "../ProductLayout.scss";

function CommentRow({ name, img, rating, com, date }) {
  return (
    <div className="row com-row">
      <div className="col-2">
        <img src={img} alt="User avatar" />
      </div>
      <div className="col-10">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <span>{date}</span>
        </div>
        <span style={{ textDecoration: "underline" }}>Đánh giá: </span>
        <Rate
          allowHalf
          disabled
          value={rating}
          defaultValue={4.5}
          character={<MdOutlineStar />}
        />
        <br />
        <span style={{ textDecoration: "underline" }}>Nhận xét: </span>
        <p>{com}</p>
      </div>
    </div>
  );
}

export default CommentRow;
