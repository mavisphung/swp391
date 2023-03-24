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
  settings: "/user",
  profile: "/user/profile",
  passwordManagement: "/user/change-password",
  paymentInfo: "/payment-info",
  orderNotification: "/order-notification",
  orderList: "/user/order-list",
  orderDetail: "/user/order-detail",
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
  settings: "/user/*",
  profile: "/profile",
  passwordManagement: "/change-password",
  orderList: "/order-list",
};

export { routes, dashboardRoutes, cartRoutes, settingsRoutes };
