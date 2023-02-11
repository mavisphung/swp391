import { Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "antd";

import HomePage from "~/modules/Home";
import Navbar from "~/components/Navbar";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
// import Protected from "~/components/ProtectedComponent";
import ProductDetails from "~/modules/Product";

const Dashboard = () => {
  const { Content } = Layout;

  return (
    <Routes>
      <Route
        element={
          <div>
            <Layout>
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
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/aboutUs" element={<ProductDetails />} />
        <Route path="/*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
