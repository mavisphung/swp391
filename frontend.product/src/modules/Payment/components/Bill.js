import "./BillLayout.scss";
import { formatPrice } from "~/common/Helper";

function Bill({ data }) {
  console.log("PAYMENT INFO", data);
  return (
    <div className="bill-container">
      <h3>Thông tin thanh toán</h3>
      <div>
        <div>
          Ngân hàng thanh toán: <span>{data.vnp_BankCode}</span>
        </div>
        <div>
          Mã giao dịch tại ngân hàng: <span>{data.vnp_BankTranNo}</span>
        </div>
        <div>
          Mã giao dịch ghi nhận tại hệ thống VNPAY:{" "}
          <span>{data.vnp_TransactionNo}</span>
        </div>
        <div>
          Loại tài khoản/thẻ: <span>{data.vnp_CardType}</span>
        </div>
        <div>
          Thời gian thanh toán: <span>{data.vnp_PayDate}</span>
        </div>
        <div>
          Nội dung thanh toán: <span>{data.vnp_OrderInfo}</span>
        </div>
        <div>
          Số tiền thanh toán:{" "}
          <span>{formatPrice(data.vnp_Amount / 100)} đ</span>
        </div>
      </div>
    </div>
  );
}

export default Bill;
