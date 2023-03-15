const routes = {
  default: "/",
  other: "/*",
  login: "/login",
  register: "/registration",
  dashboard: "/dashboard",
  home: "/dashboard/home",
  aboutUs: "/dashboard/aboutUs",
  paymentMethods: "/dashboard/payments",
  category: "/dashboard/category",
  productDetails: "/product",
  birdDetails: "/bird",
  cart: "/cart",
  confirmLogin: "/cart/confirm-login",
  settings: "/settings",
  profile: "/settings/profile",
  passwordManagement: "/settings/change-password",
  paymentInfo: "/payment-info",
  orderNotification: "/order-notification",
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
};

const settingsRoutes = {
  settings: "/settings/*",
  profile: "/profile",
  passwordManagement: "/change-password",
};

export { routes, dashboardRoutes, cartRoutes, settingsRoutes };
