import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const userCartContext = createContext();

export const useUserCart = () => {
  return useContext(userCartContext);
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      addToLocalCart(action.payload);
      const pro = action.payload;
      const existed = state.cart.findIndex((e) => e.id === pro.id);
      if (existed !== -1) {
        state.cart.map((e) => {
          if (e.id === pro.id) {
            e.amount += 1;
          }
          return e;
        });
        action.type = "DONE";
        toast.success("Thêm sản phẩm vào giỏ hàng thành công.");
        return { ...state };
      }
      state.cart.push({ ...pro, amount: 1 });
      action.type = "DONE";
      toast.success("Thêm sản phẩm vào giỏ hàng thành công.");
      return { ...state };
    case "UPDATE_AMOUNT":
      const amount = action.payload.amount;
      const proId = action.payload.proId;
      updateAmountLocalCart(proId, amount);
      const existed1 = state.cart.findIndex((e) => e.id === proId);
      if (existed1 !== -1) {
        state.cart.map((e) => {
          if (e.id === proId) {
            e.amount = amount;
          }
          return e;
        });
        action.type = "DONE";
      }
      return { ...state };
    case "REMOVE_FROM_CART":
      removeFromLocalCart(action.payload);
      if (state.cart.length === 0) return { ...state };
      const newCart = state.cart.filter((p) => p.id !== action.payload);
      state.cart = newCart;
      action.type = "DONE";
      toast.success("Bỏ sản phẩm khỏi giỏ hàng thành công.");
      return {
        ...state,
      };
    case "EMPTY_CART":
      setLocalCart([]);
      state.cart = [];
      action.type = "DONE";
      return {
        ...state,
      };
    default:
      return state;
  }
};

const initialState = {
  cart: getLocalCart(),
};

export const UserCartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <userCartContext.Provider
      value={{
        dispatch: dispatch,
        cart: state.cart,
        cartAmount: state.cart.length,
      }}
    >
      {children}
    </userCartContext.Provider>
  );
};

function getLocalCart() {
  const cart = localStorage.getItem("CART");
  return cart ? JSON.parse(cart) : [];
}

function setLocalCart(newCart) {
  localStorage.setItem("CART", JSON.stringify(newCart));
}

function addToLocalCart(pro) {
  const cart = getLocalCart();
  const existed = cart.findIndex((e) => e.id === pro.id);
  if (existed !== -1) {
    const newCart = cart.map((e) => {
      if (e.id === pro.id) {
        e.amount += 1;
      }
      return e;
    });
    setLocalCart(newCart);
    return;
  }
  cart.push({ ...pro, amount: 1 });
  setLocalCart(cart);
}

function updateAmountLocalCart(proId, amount) {
  const cart = getLocalCart();
  const existed = cart.findIndex((e) => e.id === proId);
  if (existed !== -1) {
    const newCart = cart.map((e) => {
      if (e.id === proId) {
        e.amount = amount;
      }
      return e;
    });
    setLocalCart(newCart);
  }
}

function removeFromLocalCart(id) {
  const cart = getLocalCart();
  if (cart.length === 0) return;
  const newCart = cart.filter((p) => p.id !== id);
  setLocalCart(newCart);
}
