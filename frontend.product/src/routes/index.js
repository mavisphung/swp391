import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import config from "~/config";
import LoginPage from "~/modules/Login";
import RegisterPage from "~/modules/Register";
import Dashboard from "~/components/Dashboard";
import PaymentPage from "~/modules/Payment";
import Cart from "~/modules/Cart";
import DefaultLayout from "~/components/DefaultLayout";
import ProductDetails from "~/modules/Product";

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
      <Route path={"/payments"} element={<PaymentPage />} />
      <Route path={config.routes.other} element={<div>Page Not Found</div>} />
      <Route path={config.cartRoutes.cart} element={<Cart />} />
      <Route
        path={config.routes.productDetails}
        element={
          <DefaultLayout>
            <ProductDetails />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
