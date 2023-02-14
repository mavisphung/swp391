import React from "react";
import { Routes, Route } from "react-router-dom";

import config from "~/config";
import LoginPage from "~/modules/Login";
import RegisterPage from "~/modules/Register";
import Dashboard from "~/components/Dashboard";
import PaymentPage from "~/modules/Payment";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path={config.routes.default} element={<Dashboard />} />
      <Route path={config.dashboardRoutes.dashbard} element={<Dashboard />} />
      <Route path={config.routes.login} element={<LoginPage />} />
      <Route path={config.routes.register} element={<RegisterPage />} />
      <Route path={"/payments"} element={<PaymentPage />} />
      <Route path={config.routes.other} element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default CustomRoutes;
