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

export async function getListOrder({
  OrderStatus,
  From,
  To,
  Ascending,
  PageNumber,
  PageSize,
  Search,
}) {
  try {
    const response = await api.get("/order", {
      params: {
        OrderStatus,
        From,
        To,
        Ascending,
        PageNumber,
        PageSize,
        Search,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log("getListOrder Error", e);
  }
}

export async function getOrderWithId({ id }) {
  try {
    const response = await api.get(`/order/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log("getOrderWithId Error", e);
  }
}
