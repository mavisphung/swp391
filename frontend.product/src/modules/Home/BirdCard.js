import { Button, Card, Col } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

import "./BirdCardLayout.scss";
import config from "~/config";
import { formatPrice } from "~/common/Helper";
import { useUserCart } from "~/context/UserCartContext";

const BirdCard = (props) => {
  const { dispatch } = useUserCart();

  const navigate = useNavigate();
  const params = {
    productId: props.bird.id,
  };

  const historyUrl = props.historyUrl ? props.historyUrl : [];

  const isRetail =
    (props.bird.age && props.bird.gender != null) ||
    props.bird.categoryType !== 1
      ? true
      : false;

  const saleAmount = props.bird.categoryType / 10 + 1.1;
  const fakePrice = props.bird.price * saleAmount;

  return (
    <Col className="pb-4 pe-3">
      <Card>
        <Card.Img src={props.bird.medias[1].url} />
        <Card.Body>
          <Card.Title className="pro-card-title">{props.bird.name}</Card.Title>
          <div className="d-flex justify-content-between">
            <Card.Text>
              {props.bird.categoryType === 1
                ? isRetail
                  ? `MSP: LT0${props.bird.id}`
                  : "Chim bán theo loài"
                : "Trạng thái:"}
            </Card.Text>
            <span id="pro-amount-status">
              {props.bird.status === 2 ? "Còn hàng" : "Đã bán"}
            </span>
          </div>
          <div>
            <span className="price">{formatPrice(props.bird.price)} đ</span>
            <span className="fake-price">{formatPrice(fakePrice)} đ</span>
            <span style={{ fontSize: "18px" }}>{isRetail ? "" : " / con"}</span>
          </div>
          <div className="pro-card-ctr">
            <Button
              className="btn-buy"
              onClick={() =>
                props.bird.categoryType === 1
                  ? navigate(
                      {
                        pathname: config.routes.birdDetails,
                        search: `?${createSearchParams(params)}`,
                      },
                      {
                        preventScrollReset: false,
                        state: {
                          breadcrumb: [
                            ...historyUrl,
                            {
                              name: props.bird.name,
                              url: `/product?productId=${props.bird.id}`,
                            },
                          ],
                        },
                      }
                    )
                  : navigate(
                      {
                        pathname: config.routes.productDetails,
                        search: `?${createSearchParams(params)}`,
                      },
                      {
                        preventScrollReset: false,
                        state: {
                          breadcrumb: [
                            ...historyUrl,
                            {
                              name: props.bird.name,
                              url: `/product?productId=${props.bird.id}`,
                            },
                          ],
                        },
                      }
                    )
              }
            >
              Xem ngay
            </Button>
            <Button
              className="btn-add-cart"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: "ADD_TO_CART",
                  payload: props.bird,
                });
              }}
            >
              Thêm giỏ hàng
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BirdCard;
