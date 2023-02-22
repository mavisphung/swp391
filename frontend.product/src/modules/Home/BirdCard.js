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

  const quantity = props.bird.quantity ? props.bird.quantity : 100;

  return (
    <Col className="pb-4 pe-3">
      <Card>
        <Card.Img src={props.bird.medias[1].url} />
        <Card.Body>
          <Card.Title className="pro-card-title">{props.bird.name}</Card.Title>
          <Card.Text>MSP: {props.bird.productCode.substring(0, 6)}</Card.Text>
          <div className="d-flex justify-content-between">
            <div className="price">{formatPrice(props.bird.price)} đ</div>
            <span id="pro-amount-status">
              {quantity > 0 ? "Còn hàng" : "Đã bán"}
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
