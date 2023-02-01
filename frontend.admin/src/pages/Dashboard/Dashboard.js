import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Store from '~/pages/Store/Store';
import Orders from '~/pages/Orders';
import Statistics from '../Statistics';
import ViewAccountsList from '../Accounts/AccountsList';
import AddEditAccount from '../Accounts/AddEditAccount';
import Sidebar from '~/components/Sidebar';
import FooterContent from '~/components/Footer';
import HeaderContent from '~/components/Header';
import {
  accountId,
  addAccount,
  updateAccount,
  viewAccountsList,
  viewOrdersList,
  viewStatistics,
} from '~/system/Constants/LinkURL';
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
            <Route
              path={`${viewAccountsList}`}
              element={<ViewAccountsList />}
            />
            <Route
              path={`${viewAccountsList}/${updateAccount}/${accountId}`}
              element={<AddEditAccount />}
            />
            <Route path={`${addAccount}`} element={<AddEditAccount />} />
            <Route path={`${viewOrdersList}`} element={<Orders />} />
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
