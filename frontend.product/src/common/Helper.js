export function formatPrice(price) {
  const formatter = Intl.NumberFormat("en-US");
  return formatter.format(price);
}

export function formatDate(dateStr) {
  const dateArr = dateStr.substring(0, 10).split("-");
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}

export function getEmbedUrl(url) {
  if (url.includes("watch?v=")) {
    let tmp = url;
    let index = url.indexOf("&");
    if (index !== -1) {
      tmp = url.substring(0, index);
    }
    return tmp.replace("watch?v=", "embed/");
  }
  return url;
}

export function getLastPath(url) {
  const arr = url.split("/");
  return arr[arr.length - 1];
}
