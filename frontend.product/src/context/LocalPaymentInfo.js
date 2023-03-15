export function getLocalPaymentInfo() {
  return JSON.parse(localStorage.getItem("LOCAL_PAYMENT_INFO"));
}

export function setLocalPaymentInfo(newValue) {
  localStorage.setItem("LOCAL_PAYMENT_INFO", JSON.stringify(newValue));
}

export function removeLocalPaymentInfo() {
  localStorage.removeItem("LOCAL_PAYMENT_INFO");
}
