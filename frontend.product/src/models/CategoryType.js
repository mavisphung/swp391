export const categoryType = {
  retailBird: 0,
  bird: 1,
  food: 2,
  cage: 3,
  accessory: 4,
  other: 5,
};

export const mediaType = {
  png: 0,
  jpeg: 1,
  jpg: 2,
  pdf: 3,
  svg: 4,
  mp4: 5,
  mov: 6,
  avi: 7,
  wmv: 8,
};

export const paymentMethodType = {
  vnpay: 1,
  atStore: 2,
  payInAdvance50: 3,
  cod: 4,
};

export function getPaymentMethodStr(type) {
  if (type === paymentMethodType.vnpay) {
    return "Bằng VNPay";
  } else if (type === paymentMethodType.atStore) {
    return "Thanh toán tại cửa hàng";
  } else if (type === paymentMethodType.payInAdvance50) {
    return "Đặt cọc trước 50%";
  } else if (type === paymentMethodType.cod) {
    return "Thanh toán trực tiếp cho nhân viên giao hàng";
  }
}

export const productStatusType = {
  outOfStock: 0,
  available: 1,
};

export const orderStatusType = {
  accept: 1,
  finished: 2,
  cancelled: 3,
  pending: 4,
};

export function getOrderStatusStr(status) {
  if (status === orderStatusType.accept) {
    return (
      <span style={{ fontWeight: "bolder", color: "#27b2f3" }}>Đang xử lý</span>
    );
  } else if (status === orderStatusType.finished) {
    return (
      <span style={{ fontWeight: "bolder", color: "#15b700" }}>Thành công</span>
    );
  } else if (status === orderStatusType.cancelled) {
    return (
      <span style={{ fontWeight: "bolder", color: "#ef4a4a" }}>Đã hủy</span>
    );
  } else if (status === orderStatusType.pending) {
    return (
      <span style={{ fontWeight: "bolder", color: "#ffcc00" }}>
        Chờ xác nhận
      </span>
    );
  }
}

export function getIsSucessStr(isSucess) {
  if (isSucess) {
    return (
      <span style={{ fontWeight: "bolder", color: "#15b700" }}>Thành công</span>
    );
  } else {
    return (
      <span style={{ fontWeight: "bolder", color: "#ef4a4a" }}>Thất bại</span>
    );
  }
}
