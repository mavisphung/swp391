import { Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "antd";

import HomePage from "~/modules/Home";
import Navbar from "~/components/Navbar";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ProductDetails from "~/modules/Product";
import config from "~/config";
import PaymentPage from "~/modules/Payment";

const Dashboard = () => {
  const { Content } = Layout;

  return (
    <Routes>
      <Route
        element={
          <div>
            <Layout style={{ backgroundColor: "white" }}>
              <Header />
              <Navbar />
              <Content>
                <Outlet />
              </Content>
              <Footer />
            </Layout>
          </div>
        }
      >
        <Route path={config.routes.default} element={<HomePage />} />
        <Route path={config.dashboardRoutes.home} element={<HomePage />} />
        <Route
          path={config.dashboardRoutes.aboutUs}
          element={<ProductDetails />}
        />
        <Route
          path={config.dashboardRoutes.paymentMethods}
          element={<PaymentPage />}
        />
        <Route path={config.routes.other} element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
