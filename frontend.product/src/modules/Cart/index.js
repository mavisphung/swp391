import { Routes, Route } from "react-router-dom";

import config from "~/config";
import CartDetails from "./CartDetails";
import DefaultLayout from "~/components/DefaultLayout";
import ConfirmLogin from "~/modules/ConfirmLogin";

function Cart() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={config.routes.default} element={<CartDetails />} />
        <Route
          path={config.cartRoutes.confirmLogin}
          element={<ConfirmLogin />}
        />
        <Route path={config.routes.other} element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default Cart;
