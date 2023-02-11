const routes = {
  default: "/",
  other: "/*",
  login: "/login",
  register: "/registration",
  dashboard: "/dashboard",
  home: "/dashboard/home",
  aboutUs: "/dashboard/aboutUs",
  productDetails: "/dashboard/:category?/:productId",
};

const dashboardRoutes = {
  dashbard: "/dashboard/*",
  home: "/home",
  aboutUs: "/aboutUs",
  productDetails: "/:category?/:productId",
};

const personalRoutes = {
  profile: "/profile",
  passwordManagement: "/passwordManagement",
};

export { routes, dashboardRoutes, personalRoutes };
