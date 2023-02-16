export function formatPrice(price) {
  const formatter = Intl.NumberFormat("en-US");
  return formatter.format(price);
}
