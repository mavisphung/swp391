import logo from './logo.svg';
import './App.css';
// import { Home } from './modules/home';
import { Navigate } from './modules/navigate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
      </header>
      <Navigate />
    </div>
  );
}

export default App;
