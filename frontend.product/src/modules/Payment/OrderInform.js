import { useLocation } from "react-router-dom";

import Order from "../Order";
import Bill from "./components/Bill";

function OrderInform() {
  const location = useLocation();

  const order = location.state.order;
  const payment = location.state.payment;

  return (
    <div className="container">
      {payment && <Bill data={payment} />}
      <Order order={order} />
      <div style={{ marginBottom: "120px" }}></div>
    </div>
  );
}

export default OrderInform;
