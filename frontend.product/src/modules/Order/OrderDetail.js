import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import { getOrderWithId } from "../../data/OrderRepository";
import Order from "./index";

function OrderDetail() {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id"));

  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async (orderId) => {
      const data = await getOrderWithId({
        id: orderId,
      });
      if (data) {
        setOrder(data);
      }
    };

    getOrder(id);
  }, [id]);

  if (!order) return <CustomSpinner />;

  return (
    <Container>
      <Order order={order} />
      <div style={{ marginBottom: "120px" }}></div>
    </Container>
  );
}

export default OrderDetail;
