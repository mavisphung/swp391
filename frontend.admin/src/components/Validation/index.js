import {
  birdAgePattern,
  emailPattern,
  fullNamePattern,
  phonePattern,
} from '~/system/Constants/constants';
import {
  MSG01,
  MSG02,
  MSG03,
  MSG04,
  MSG05,
  MSG06,
  MSG10,
  MSG11,
  MSG12,
  MSG13,
  MSG21,
  MSG22,
  MSG23,
  MSG52,
  MSG53,
  MSG54,
  MSG55,
  MSG56,
  MSG57,
  MSG58,
} from '~/system/Messages/messages';

export const checkFieldIsEmpty = (value, message) => {
  if (value === '' || !value) {
    return message;
  }
};

export const checkEmailMessage = (email, emailIsExisted) => {
  if (email === '' || !email) {
    return MSG01;
  } else if (!emailPattern.test(email)) {
    return MSG04;
  } else if (emailIsExisted === true) {
    return MSG03;
  }
};

export const checkPasswordMessage = (password, currentPasswordIsNotMatch) => {
  if (password.length === 0) {
    return MSG02;
  } else if (password.length < 6 || password.length > 20) {
    return MSG05;
  } else if (currentPasswordIsNotMatch === true) {
    return MSG06;
  }
};

export const checkNewPasswordMessage = (oldPassword, newPassword) => {
  if (newPassword.length === 0) {
    return MSG02;
  } else if (newPassword.length < 6 || newPassword.length > 20) {
    return MSG05;
  } else if (newPassword === oldPassword) {
    return MSG21;
  }
};

export const checkConfirmNewPasswordMessage = (
  newPassword,
  confirmNewPassword,
) => {
  if (confirmNewPassword.length === 0) {
    return MSG22;
  } else if (confirmNewPassword.length < 6 || confirmNewPassword.length > 20) {
    return MSG05;
  } else if (confirmNewPassword !== newPassword) {
    return MSG23;
  }
};

export const checkFullNameMessage = (fullName) => {
  if (fullName === '' || !fullName) {
    return MSG10;
  } else if (!fullNamePattern.test(fullName)) {
    return MSG11;
  }
};

export const checkPhoneNumber = (phone) => {
  if (phone === '' || !phone) {
    return MSG12;
  } else if (!phonePattern.test(phone)) {
    return MSG13;
  }
};

export const checkProductQuantity = (quantity) => {
  if (quantity.length === 0) {
    return MSG52;
  } else if (parseInt(quantity) <= 0) {
    return MSG53;
  }
};

export const checkProductPrice = (price) => {
  if (price.length === 0) {
    return MSG54;
  } else if (parseInt(price) <= 0) {
    return MSG55;
  } else if (parseInt(price) <= 1000) {
    return MSG56;
  }
};

export const checkBirdAge = (age) => {
  if (age === '' || !age) {
    return MSG57;
  } else if (!birdAgePattern.test(age)) {
    return MSG58;
  }
};
