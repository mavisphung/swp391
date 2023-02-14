import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "~/components/Navbar";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function DefaultLayout({ children }) {
  const { Content } = Layout;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header />
      <Navbar />
      <div className="d-flex justify-content-center" id="introduce-text">
        Cửa hàng ChyStore chuyên phân phối các loại chim cảnh khu vực miền Nam
      </div>
      <Content>{children ? children : <Outlet />}</Content>
      <Footer />
    </Layout>
  );
}

export default DefaultLayout;
