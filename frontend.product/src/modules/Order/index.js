import { formatDate, formatPrice } from "~/common/Helper";
import {
  getIsSucessStr,
  getOrderStatusStr,
  getPaymentMethodStr,
} from "~/models/CategoryType";
import "./OrderLayout.scss";

function Order({ order }) {
  console.log("WHYYYYY", order);
  const orderDetails = order.orderDetails;
  const payments = order.payments;
  const customerInfo = order.customerInfo;

  function handleAddress() {
    const addr = [
      customerInfo.address,
      customerInfo.ward,
      customerInfo.district,
      customerInfo.province,
    ];
    return addr.join(", ");
  }

  return (
    <div className="order-container">
      <div className="d-flex justify-content-between">
        <div>
          <h3>Thông tin đơn hàng</h3>
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: "40px" }}>Mã đơn hàng:</td>
                <td>{order.id}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Trạng thái:</td>
                <td>{getOrderStatusStr(order.status)}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Ngày tạo đơn hàng:</td>
                <td>{formatDate(order.orderDate)}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>
                  Ngày giao hàng dự kiến:
                </td>
                <td>{order.estimatedReceiveDate}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Ngày đóng đơn hàng:</td>
                <td>{order.closeDate}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Lý do hủy đơn:</td>
                <td>{order.cancelReason}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Ghi chú đơn hàng:</td>
                <td>{order.note}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "40px" }}>Tổng tiền hàng:</td>
                <td style={{ fontWeight: "bolder" }}>
                  {formatPrice(order.totalPrice)} đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3>Thông tin giao hàng</h3>
          <table className="tbl-delivery">
            <tbody>
              <tr>
                <td style={{ paddingRight: "80px" }}>Họ và tên:</td>
                <td>{customerInfo.fullname}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "80px" }}>Email:</td>
                <td>{customerInfo.email}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "80px" }}>Số điện thoại:</td>
                <td>{customerInfo.phoneNumber}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: "80px" }}>Địa chỉ:</td>
                <td>{handleAddress()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <table className="tbl-products">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Đơn giá (VNĐ)</th>
              <th>Số lượng</th>
              <th>Thành tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((p, index) => {
              return (
                <tr key={index}>
                  <td>{p.product.name}</td>
                  <td>{p.product.description.substring(0, 50)}</td>
                  <td>{formatPrice(p.product.price)}</td>
                  <td>{p.quantity}</td>
                  <td>{formatPrice(p.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Thông tin thanh toán</h3>
      {payments.map((p, index) => {
        return (
          <div key={index} className="payment-row">
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingRight: "80px" }}>
                    Ngày thanh toán: <span>{formatDate(p.paidDate)}</span>
                  </td>
                  <td>Trạng thái: {getIsSucessStr(p.isSuccess)}</td>
                </tr>
                <tr>
                  <td style={{ paddingRight: "80px" }}>
                    Phương thức thanh toán:{" "}
                    <span>{getPaymentMethodStr(p.paymentMethod)}</span>
                  </td>
                  <td>
                    Số tiền: <span>{formatPrice(p.amount)} đ</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
