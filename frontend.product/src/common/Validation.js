import { emailCommonPattern, phonePattern } from "~/system/Constants/constants";

export function checkEmail(value) {
  if (!value || value === "") {
    return "Email không được để trống";
  } else if (!emailCommonPattern.test(value)) {
    return "Sai định dạng email";
  }
}

export function checkFieldIsEmpty(value, message) {
  if (!value || value === "") {
    return message;
  }
}

export function checkPhoneNumber(phone) {
  if (!phone || phone === "") {
    return "Số điện thoại không được để trống";
  } else if (!phonePattern.test(phone)) {
    return "Số điện thoại bao gồm 10 số";
  }
}

export function checkPassword(password, isConfirm) {
  if (!password || password === "") {
    return isConfirm
      ? "Xác nhận mật khẩu không được để trống"
      : "Mật khẩu không được để trống";
  } else if (password.length < 6 || password.length > 20) {
    return "Mật khẩu phải chứa từ 6 đến 20 ký tự";
  }
}
