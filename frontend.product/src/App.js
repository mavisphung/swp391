import { ToastContainer } from "react-toastify";

import "./App.scss";
import CustomRoutes from "~/routes";
import { UserAuthContextProvider } from "~/context/UserAuthContext";
import { UserCartContextProvider } from "~/context/UserCartContext";

function App() {
  return (
    <UserAuthContextProvider>
      <UserCartContextProvider>
        <ToastContainer />
        <CustomRoutes />
      </UserCartContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
