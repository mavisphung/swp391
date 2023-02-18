export function addToCart(pro) {
  const newCart = getCart();
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
  const cart = getCart();
  if (cart.length === 0) return;
  const newCart = cart.filter((p) => p.id !== id);
  localStorage.setItem("CART", JSON.stringify(newCart));
}

export function getCart() {
  const jsonCart = localStorage.getItem("CART");
  const cart = JSON.parse(jsonCart);
  if (!cart) return [];
  return cart;
}

export function getCartAmount() {
  const cart = getCart();
  return cart.length;
}
