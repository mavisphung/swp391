export function formatPrice(price) {
  const formatter = Intl.NumberFormat("en-US");
  return formatter.format(price);
}

export function getLastPath(url) {
  const arr = url.split("/");
  return arr[arr.length - 1];
}
