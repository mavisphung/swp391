import { Button, Card, Col } from "react-bootstrap";
import "./BirdCardLayout.scss";

const BirdCard = (bird) => {
  return (
    <Col className="pb-4 pe-3">
      <Card style={{ width: "18rem" }} >
        <Card.Img src={bird.img} />
        <Card.Body>
          <Card.Title>{bird.name}</Card.Title>
          <Card.Text style={{ paddingLeft: "0px" }}>ML: LT720</Card.Text>
          <div className="d-flex justify-content-sm-between pb-2">
            <div className="h5" style={{ color: "#ee3e6a" }}>
              {bird.price}đ
            </div>
            <div>Còn hàng</div>
          </div>
          <div className="d-flex justify-content-sm-between">
            <Button style={{ backgroundColor: "#ee3e6a", border: "none" }}>
              Mua ngay
            </Button>
            <Button variant="outline-dark">Thêm giỏ hàng</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BirdCard;
