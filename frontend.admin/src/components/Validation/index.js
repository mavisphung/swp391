import {
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
