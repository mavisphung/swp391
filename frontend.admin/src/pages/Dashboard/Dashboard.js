import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Store from '~/pages/Store/Store';
import OrdersList from '~/pages/Orders/OrdersList';
import OrderDetail from '../Orders/OrderDetail';
import Statistics from '../Statistics';
import ViewAccountsList from '../Accounts/AccountsList';
import CategoriesList from '../Categories/CategoriesList';
import AddEditAccount from '../Accounts/AddEditAccount';
import AccountProfile from '../Accounts/AccountProfile';
import Sidebar from '~/components/Sidebar';
import FooterContent from '~/components/Footer';
import HeaderContent from '~/components/Header';
import {
  accountId,
  accountProfile,
  addAccount,
  changePassword,
  orderId,
  updateAccount,
  viewAccountsList,
  viewCategoriesList,
  viewOrderDetail,
  viewOrdersList,
  viewStatistics,
} from '~/system/Constants/LinkURL';
import './Dashboard.scss';
import ChangePassword from '../Accounts/ChangePassword';

const { Content } = Layout;

function Dashboard() {
  const user = { name: 'Admin', roleId: 'admin' };

  const renderRoutes = () => {
    if (user) {
      if (user.roleId === 'staff') {
        return (
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path={`/${viewOrdersList}`} element={<OrdersList />} />
            <Route
              path={`${viewOrdersList}/${viewOrderDetail}/${orderId}`}
              element={<OrderDetail />}
            />
            <Route path={`${accountProfile}`} element={<AccountProfile />} />
            <Route path={`${changePassword}`} element={<ChangePassword />} />
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
            <Route path={`${viewOrdersList}`} element={<OrdersList />} />
            <Route
              path={`${viewOrdersList}/${viewOrderDetail}/${orderId}`}
              element={<OrderDetail />}
            />
            <Route
              path={`${viewCategoriesList}`}
              element={<CategoriesList />}
            />
            <Route path={`${viewStatistics}`} element={<Statistics />} />
            <Route path={`${accountProfile}`} element={<AccountProfile />} />
            <Route path={`${changePassword}`} element={<ChangePassword />} />
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
