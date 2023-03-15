import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Layout } from "antd";

import Navbar from "~/components/Navbar";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

function DefaultLayout2() {
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header />
      <Navbar />
      <div className="d-flex justify-content-center" id="introduce-text">
        Cửa hàng ChyStore chuyên phân phối các loại chim cảnh khu vực miền Nam
      </div>
      <Container>
        <Layout style={{ minHeight: "100%" }}>
          <Sidebar />
          <Outlet />
        </Layout>
      </Container>
      <Footer />
    </Layout>
  );
}

export default DefaultLayout2;
