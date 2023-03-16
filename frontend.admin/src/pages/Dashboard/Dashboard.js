import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import Store from '~/pages/Store/Store';
import BannersList from '../Store/Banner/BannersList';
import OrdersList from '~/pages/Orders/OrdersList';
import OrderDetail from '../Orders/OrderDetail';
import Statistics from '../Statistics';
import ViewAccountsList from '../Accounts/AccountsList';
import AddEditAccount from '../Accounts/AddEditAccount';
import CategoriesList from '../Categories/CategoriesList';
import AddEditCategory from '../Categories/AddEditCategory';
import ProductsList from '../Products/ProductsList';
import ProductDetail from '../Products/ProductDetail';
import AddEditProduct from '../Products/AddEditProduct';
import AccountProfile from '../Accounts/AccountProfile';
import Sidebar from '~/components/Sidebar';
import FooterContent from '~/components/Footer';
import HeaderContent from '~/components/Header';
import {
  accountId,
  accountProfile,
  addAccount,
  addCategory,
  addProduct,
  categoryId,
  changePassword,
  login,
  orderId,
  productId,
  updateAccount,
  updateCategory,
  updateProduct,
  viewAccountsList,
  viewBannersList,
  viewCategoriesList,
  viewOrderDetail,
  viewOrdersList,
  viewProductDetail,
  viewProductsList,
  viewStatistics,
} from '~/system/Constants/LinkURL';
import './Dashboard.scss';
import ChangePassword from '../Accounts/ChangePassword';
import { useUserAuth } from '~/context/UserAuthContext';
import { useEffect } from 'react';
import { Admin, Staff } from '~/system/Constants/constants';

const { Content } = Layout;

function Dashboard() {
  //Get current user
  const { getCurrentUser } = useUserAuth();
  const user = getCurrentUser();

  let navigate = useNavigate();

  // Unauthen access prohibit
  useEffect(() => {
    if (!user) {
      navigate(`/${login}`);
    }
  }, [user, navigate]);

  const renderRoutes = () => {
    if (user) {
      if (user.roleId === Staff) {
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
      } else if (user.roleId === Admin) {
        return (
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path={`/${viewBannersList}`} element={<BannersList />} />
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
            <Route
              path={`${viewCategoriesList}/${updateCategory}/${categoryId}`}
              element={<AddEditCategory />}
            />
            <Route path={`${addCategory}`} element={<AddEditCategory />} />
            <Route path={`${viewProductsList}`} element={<ProductsList />} />
            <Route
              path={`${viewProductsList}/${viewProductDetail}/${productId}`}
              element={<ProductDetail />}
            />
            <Route
              path={`${viewProductsList}/${viewProductDetail}/${productId}/${viewOrderDetail}/${orderId}`}
              element={<OrderDetail />}
            />
            <Route path={`${addProduct}`} element={<AddEditProduct />} />
            <Route
              path={`${viewProductsList}/${viewProductDetail}/${productId}/${updateProduct}`}
              element={<AddEditProduct />}
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
