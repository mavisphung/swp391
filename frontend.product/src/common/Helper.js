export function formatPrice(price) {
  const formatter = Intl.NumberFormat("en-US");
  return formatter.format(price);
}

export function formatDate(dateStr) {
  const dateArr = dateStr.substring(0, 10).split("-");
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}

export function getLastPath(url) {
  const arr = url.split("/");
  return arr[arr.length - 1];
}
