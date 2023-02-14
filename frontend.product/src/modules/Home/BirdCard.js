import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./BirdCardLayout.scss";
import config from "~/config";
import { formatPrice } from "../../common/Helper";

const BirdCard = (props) => {
  const navigate = useNavigate();

  return (
    <Col className="pb-4 pe-3">
      <Card onClick={() => navigate(config.routes.aboutUs)}>
        <Card.Img src={props.bird.img} />
        <Card.Body>
          <Card.Title className="pro-card-title">{props.bird.name}</Card.Title>
          <Card.Text>ML: LT720</Card.Text>
          <div className="d-flex justify-content-between">
            <div className="price">{formatPrice(props.bird.price)} đ</div>
            <span id="pro-amount-status">Còn hàng</span>
          </div>
          <div className="pro-card-ctr">
            <Button className="btn-buy">Xem ngay</Button>
            <Button className="btn-add-cart">Thêm giỏ hàng</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BirdCard;
