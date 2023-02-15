const routes = {
  default: "/",
  other: "/*",
  login: "/login",
  register: "/registration",
  dashboard: "/dashboard",
  home: "/dashboard/home",
  category: "/dashboard/category",
  productDetails: "/product",
  cart: "/cart",
  confirmLogin: "/cart/confirm-login",
};

const dashboardRoutes = {
  dashbard: "/dashboard/*",
  home: "/home",
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
