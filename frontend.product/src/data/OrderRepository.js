import api from "~/context/AppApi";
import { removeLocalPaymentInfo } from "~/context/LocalPaymentInfo";
import { toast } from "react-toastify";

export async function createOrder({
  paymentMethod,
  note,
  customer,
  cart,
  dispatch,
}) {
  let items = cart.map((c) => {
    return {
      productId: c.id,
      quantity: c.amount,
    };
  });

  try {
    const order = {
      cartItems: items,
      paymentMethod,
      note,
      customer,
    };

    const response = await api.post("/order/unauth", order);
    if (response.status === 201) {
      toast.success("Đặt hàng thành công!");
      dispatch({
        type: "EMPTY_CART",
      });
      removeLocalPaymentInfo();
      console.log("Order success", order);
      return response.data;
    } else {
      console.log("createOrder failed Response", response);
      toast.error("Đặt hàng không thành công! Vui lòng thử lại!");
    }
  } catch (e) {
    toast.error("Đặt hàng không thành công! Vui lòng thử lại!");
    console.log("createOrder catch Error", e);
  }
}
