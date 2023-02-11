//disable past date
export const disablePastDate = () => {
  var today, dd, mm, yyyy;
  today = new Date();
  dd = today.getDate();
  mm = today.getMonth() + 1;
  mm = mm % 12;
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

//disable future date
function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

export const disableFutureDate = () => {
  var today, dd, mm, yyyy;
  today = new Date();
  addHours(48, today);
  dd = today.getDate();
  mm = today.getMonth() + 1;
  mm = mm % 12;
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
};

// Disable hours
export const disabledDateTime = () => {
  return {
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 21, 22, 23],
  };
};
