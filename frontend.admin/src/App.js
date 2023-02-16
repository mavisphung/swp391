import CustomRoute from './routes/Route';
import './App.css';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <ToastContainer
          position="top-center"
          style={{ width: '400px', height: '400px' }}
        />
        <CustomRoute />
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
