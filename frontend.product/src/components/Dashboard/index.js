import { Component } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import config from "~/config";
import DefaultLayout from "~/components/DefaultLayout";
import HomePage from "~/modules/Home";
import CategoryPage from "~/modules/Category";
class Dashboard extends Component {
  componentDidMount() {
    axios
      .get(`https://localhost:7179/api/category`, {
        params: {
          PageNumber: 1,
          PageSize: 10,
        },
        // withCredentials: false,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

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
            path={config.routes.other}
            element={<div>Page Not Found</div>}
          />
        </Route>
      </Routes>
    );
  }
}

export default Dashboard;
