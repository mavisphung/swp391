const routes = {
  default: "/",
  other: "/*",
  login: "/login",
  register: "/registration",
  dashboard: "/dashboard",
  home: "/dashboard/home",
  aboutUs: "/dashboard/aboutUs",
  productDetails: "/dashboard/:category?/:productId",
  paymentMethods: "/dashboard/payments",
  category: "/dashboard/category",
  productDetails: "/product",
  cart: "/cart",
  confirmLogin: "/cart/confirm-login",
};

const dashboardRoutes = {
  dashbard: "/dashboard/*",
  home: "/home",
  aboutUs: "/aboutUs",
  productDetails: "/:category?/:productId",
  paymentMethods: "/payments",
  category: "/category",
};

const cartRoutes = {
  cart: "/cart/*",
  confirmLogin: "/confirm-login",
};

const personalRoutes = {
  profile: "/profile",
  passwordManagement: "/passwordManagement",
};

export { routes, dashboardRoutes, cartRoutes, personalRoutes };
