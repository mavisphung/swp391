import config from "../config";
import Protected from "../components/ProtectedComponent";

// Pages
import LoginPage from "../modules/Login";
import Dashboard from "../components/Dashboard";
import HomePage from "../modules/Home";
import ProfilePage from "../modules/Profile";
import AboutUsPage from "../modules/AboutUs";
import RegisterPage from "../modules/Register";

const routes = [
  {
    path: config.routes.login,
    component: LoginPage,
    layout: null,
  },
  {
    path: config.routes.register,
    component: RegisterPage,
    layout: null,
  },
  {
    path: config.routes.default,
    component: () => Dashboard(HomePage),
  },
  {
    path: config.dashboardRoutes.home,
    component: () => Dashboard(HomePage),
  },
  {
    path: config.dashboardRoutes.aboutUs,
    component: () => Dashboard(AboutUsPage),
  },
  {
    path: config.personalRoutes.profile,
    component: () => Protected(ProfilePage),
    layout: null,
  },
];

export default routes;
