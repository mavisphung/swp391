import { phonePattern } from "~/system/Constants/constants";

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

export function checkPassword(password) {
  if (!password || password === "") {
    return "Mật khẩu không được để trống";
  } else if (password.length < 6 || password.length > 20) {
    return "Mật khẩu phải chứa từ 6 đến 20 ký tự";
  }
}