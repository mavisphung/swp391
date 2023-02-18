import { Component } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import config from "~/config";

import PaymentPage from "~/modules/Payment";

import DefaultLayout from "~/components/DefaultLayout";
import HomePage from "~/modules/Home";
import CategoryPage from "~/modules/Category";
class Dashboard extends Component {
  render() {
    return (
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={config.routes.default} element={<HomePage />} />
          <Route path={config.dashboardRoutes.home} element={<HomePage />} />
          <Route
            path={config.dashboardRoutes.category}
            element={<CategoryPage />}
          />
          <Route
            path={config.dashboardRoutes.paymentMethods}
            element={<PaymentPage />}
          />
          <Route
            path={config.routes.other}
            element={<div>Page Not Found</div>}
          />
        </Route>
      </Routes>
    );
  }
}

export default Dashboard;
