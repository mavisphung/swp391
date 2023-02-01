import CustomRoute from './routes/Route';
import './App.css';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <CustomRoute />
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
