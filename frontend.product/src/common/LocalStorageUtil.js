export function addToCart(pro) {
  const jsonCart = localStorage.getItem("CART");
  let newCart = JSON.parse(jsonCart);
  if (!newCart) newCart = [];
  newCart.push(pro);
  localStorage.setItem("CART", JSON.stringify(newCart));
}

export function removeFromCart(pro) {
  const jsonCart = localStorage.getItem("CART");
  let cart = JSON.parse(jsonCart);
  if (!cart) cart = [];
  const newCart = cart.filter((p) => p.id != pro.id);
  localStorage.setItem("CART", JSON.stringify(newCart));
}

export function getCart() {
  const jsonCart = localStorage.getItem("CART");
  let cart = JSON.parse(jsonCart);
  if (!cart) cart = [];
  return cart;
}

export function getCartAmount() {
  const jsonCart = localStorage.getItem("CART");
  let cart = JSON.parse(jsonCart);
  if (!cart) cart = [];
  return cart.length;
}
