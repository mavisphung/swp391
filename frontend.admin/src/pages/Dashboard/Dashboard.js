import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Store from '~/pages/Store/Store';
import Orders from '~/pages/Orders';
import Statistics from '../Statistics';
import { viewOrdersList, viewStatistics } from '~/system/Constants/LinkURL';
import Sidebar from '~/components/Sidebar';
import FooterContent from '~/components/Footer';
import HeaderContent from '~/components/Header';
import './Dashboard.scss';

const { Content } = Layout;

function Dashboard() {
  const user = { name: 'Admin', roleId: 'admin' };

  const renderRoutes = () => {
    if (user) {
      if (user.roleId === 'staff') {
        return (
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path={`/${viewOrdersList}`} element={<Orders />} />
            <Route path="/*" element={<div>Page Not Found</div>} />
          </Routes>
        );
      } else if (user.roleId === 'admin') {
        return (
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path={viewOrdersList} element={<Orders />} />
            <Route path={`${viewStatistics}`} element={<Statistics />} />
            <Route path="/*" element={<div>Page Not Found</div>} />
          </Routes>
        );
      }
    }
  };

  return (
    // <DefaultLayout>
    //   <Content>{renderRoutes()}</Content>
    // </DefaultLayout>

    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sidebar />
        <Layout>
          <HeaderContent />
          <Content className="c-site-layout my-4">{renderRoutes()}</Content>
          <div className="line"></div>
          <FooterContent />
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
