import { Component } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import config from "~/config";
import DefaultLayout from "~/components/DefaultLayout";
import HomePage from "~/modules/Home";
import CategoryPage from "~/modules/Category";
class Dashboard extends Component {
  // test = async () => {
  //   axios.defaults.timeout = 8000;
  //   // const source = CancelToken.source();
  //   const timeout = setTimeout(() => {
  //     // source.cancel();
  //     // Timeout Logic
  //   }, 10000);
  //   try {
  //     const res = await axios.get("https://localhost:7179/api/category", {
  //       params: {
  //         PageNumber: 1,
  //         PageSize: 10,
  //       },
  //     });
  //     clearTimeout(timeout);
  //     console.log("RES", res.data);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  componentDidMount() {
    axios
      .get("https://localhost:7179/api/category", {
        params: {
          PageNumber: 1,
          PageSize: 10,
        },
        signal: AbortSignal.timeout(8000),
        // withCredentials: false,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // },
      })
      .then((res) => {
        console.log("Res", res);
      })
      .catch((error) => console.log("Error", error));
    // this.test();
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
