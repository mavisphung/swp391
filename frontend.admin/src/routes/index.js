import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import { Dashboard } from '~/pages/Dashboard';
import Orders from '~/pages/Orders';
import Products from '~/pages/Products';

// Public Routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: null },
];

// Private Routes
const privateRoutes = [
  { path: config.dashboardRoutes.dashboard, component: Dashboard },
  { path: config.dashboardRoutes.orders, component: Orders },
  { path: config.dashboardRoutes.products, component: Products },
];

export { publicRoutes, privateRoutes };
