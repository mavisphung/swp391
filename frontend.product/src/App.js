import { ToastContainer } from "react-toastify";

import "./App.scss";
import CustomRoutes from "~/routes";
import { UserAuthContextProvider } from "~/context/UserAuthContext";

function App() {
  return (
    <UserAuthContextProvider>
      <ToastContainer />
      <CustomRoutes />
    </UserAuthContextProvider>
  );
}

export default App;
