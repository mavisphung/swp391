import "./App.css";
import CustomRoutes from "~/routes";
import { UserAuthContextProvider } from "~/context/UserAuthContext";

function App() {
  return (
    <UserAuthContextProvider>
      <CustomRoutes />
    </UserAuthContextProvider>
  );
}

export default App;
