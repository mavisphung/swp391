export function addToCart(pro) {
  const jsonCart = localStorage.getItem("CART");
  let newCart = JSON.parse(jsonCart);
  if (!newCart) newCart = [];
  const existed = newCart.findIndex((e) => e.id === pro.id);
  if (existed !== -1) {
    newCart = newCart.map((e) => {
      if (e.id === pro.id) {
        let amount = e.amount + 1;
        return { ...e, amount: amount };
      }
      return e;
    });
    localStorage.setItem("CART", JSON.stringify(newCart));
    return;
  }
  newCart.push({ ...pro, amount: 1 });
  localStorage.setItem("CART", JSON.stringify(newCart));
}

export function removeFromCart(id) {
  const jsonCart = localStorage.getItem("CART");
  let cart = JSON.parse(jsonCart);
  if (!cart) {
    cart = [];
    return;
  }
  const newCart = cart.filter((p) => p.id !== id);
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
