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

  const isRetail = props.bird.age && props.bird.gender ? true : false;

  return (
    <Col className="pb-4 pe-3">
      <Card>
        <Card.Img src={props.bird.medias[1].url} />
        <Card.Body>
          <Card.Title className="pro-card-title">
            {props.bird.name} {isRetail ? "" : "các loại"}
          </Card.Title>
          <Card.Text>{isRetail ? `ML: LT0${props.bird.id}` : ""}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <span className="price">{formatPrice(props.bird.price)} đ</span>
              <span style={{ fontSize: "18px" }}>
                {isRetail ? "" : " / con"}
              </span>
            </div>
            <span id="pro-amount-status">
              {props.bird.quantity > 0 ? "Còn hàng" : "Đã bán"}
            </span>
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
                          categoryType: props.bird.categoryType,
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
