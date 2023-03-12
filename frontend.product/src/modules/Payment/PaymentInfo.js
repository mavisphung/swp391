import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import config from "~/config";
import CustomSpinner from "~/components/CustomSpinner";
import { getLocalPaymentInfo } from "~/context/LocalPaymentInfo";
import { createOrder } from "~/data/OrderRepository";
import { useUserCart } from "~/context/UserCartContext";

function PaymentInfo() {
  const { dispatch, cart } = useUserCart();

  const [isSuccess, setIsSucess] = useState();
  const [orderData, setOrderData] = useState();

  const [searchParams] = useSearchParams();
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHashType = searchParams.get("vnp_SecureHashType");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  const postOrder = async () => {
    const paymentInfo = getLocalPaymentInfo();
    const data = await createOrder({
      paymentMethod: paymentInfo.paymentMethod,
      note: paymentInfo.note,
      customer: paymentInfo.customer,
      cart,
      dispatch,
    });
    if (data) {
      console.log("ORDER SUCCESS INFORMATION", data);
      setOrderData(data);
      setIsSucess(true);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT ALERT!!!!!!!!!!");
    if (vnp_TransactionStatus === "00" || vnp_ResponseCode === "00") {
      postOrder();
    }
  });

  if (isSuccess && orderData)
    return (
      <Navigate
        to={config.routes.orderNotification}
        state={{
          order: orderData,
          payment: {
            vnp_Amount,
            vnp_BankCode,
            vnp_BankTranNo,
            vnp_CardType,
            vnp_PayDate,
            vnp_OrderInfo,
            vnp_TransactionNo,
          },
        }}
      />
    );

  return <CustomSpinner text="Đang xử lý giao dịch và đặt hàng.." />;
}

export default PaymentInfo;
