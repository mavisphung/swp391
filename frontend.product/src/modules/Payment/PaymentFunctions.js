import dateFormat from "dateformat";
import {
  vnpHashSecret,
  vnpTmnCode,
  locale,
  secureHashType,
} from "~/system/Constants/constants";

function createHmacSHA512(data) {
  const hmac512 = require("crypto-js/hmac-sha512");
  const hashed = hmac512(data, vnpHashSecret);
  return hashed;
}

export async function vnpPayment(sumPrice) {
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let date = new Date();
  let createDate = dateFormat(date, "yyyymmddHHMMss");
  let orderId = dateFormat(date, "HHmmss");
  let vnpVersion = "2.1.0";
  let vnpCommand = "pay";
  let vnpAmount = sumPrice * 100;
  let vnpCurrCode = "VND";
  let vnpLocale = locale;
  let vnpOrderInfo = `Thanh toan don hang ${orderId}, so tien ${sumPrice}`;
  let vnpReturnUrl = `http://localhost:3002`;

  const myUrlWithParams = new URL(vnpUrl);
  myUrlWithParams.searchParams.append("vnp_Version", vnpVersion);
  myUrlWithParams.searchParams.append("vnp_Command", vnpCommand);
  myUrlWithParams.searchParams.append("vnp_TmnCode", vnpTmnCode);
  myUrlWithParams.searchParams.append("vnp_Amount", vnpAmount);
  myUrlWithParams.searchParams.append("vnp_CreateDate", createDate);
  myUrlWithParams.searchParams.append("vnp_CurrCode", vnpCurrCode);
  myUrlWithParams.searchParams.append("vnp_IpAddr", "127.0.0.1");
  myUrlWithParams.searchParams.append("vnp_Locale", vnpLocale);
  myUrlWithParams.searchParams.append("vnp_OrderInfo", vnpOrderInfo);
  myUrlWithParams.searchParams.append("vnp_ReturnUrl", vnpReturnUrl);
  // Order là order ID bên dưới database
  myUrlWithParams.searchParams.append("vnp_TxnRef", orderId);
  myUrlWithParams.searchParams.append("vnp_OrderType", "other");
  myUrlWithParams.searchParams.sort();
  // TODO: Code mẫu
  let hashed = await createHmacSHA512(myUrlWithParams.searchParams.toString());
  myUrlWithParams.searchParams.append("vnp_SecureHashType", secureHashType);
  myUrlWithParams.searchParams.append("vnp_SecureHash", hashed);
  console.log(
    "payment url",
    myUrlWithParams.searchParams.toString().split("&")
  );
  window.location.href = myUrlWithParams.href;
}
