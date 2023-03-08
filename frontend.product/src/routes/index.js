import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import config from "~/config";
import LoginPage from "~/modules/Login";
import RegisterPage from "~/modules/Register";
import Dashboard from "~/components/Dashboard";
import Cart from "~/modules/Cart";
import DefaultLayout from "~/components/DefaultLayout";
import ProductDetails from "~/modules/Product";
import BirdProductDetails from "~/modules/Product2";
import ConfirmLogin from "~/modules/ConfirmLogin";
import Settings from "~/modules/settings";
import Protected from "~/components/ProtectedComponent";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path={config.routes.default}
        element={<Navigate to={config.routes.dashboard} />}
      />
      <Route path={config.dashboardRoutes.dashbard} element={<Dashboard />} />
      <Route path={config.routes.login} element={<LoginPage />} />
      <Route path={config.routes.register} element={<RegisterPage />} />
      <Route path={config.cartRoutes.cart} element={<Cart />} />
      <Route
        path={config.settingsRoutes.settings}
        element={
          <Protected>
            <Settings />
          </Protected>
        }
      />
      <Route
        path={config.routes.productDetails}
        element={
          <DefaultLayout>
            <ProductDetails />
          </DefaultLayout>
        }
      />
      <Route
        path={config.routes.birdDetails}
        element={
          <DefaultLayout>
            <BirdProductDetails />
          </DefaultLayout>
        }
      />
      <Route path={config.routes.confirmLogin} element={<ConfirmLogin />} />
      <Route path={config.routes.other} element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default CustomRoutes;
