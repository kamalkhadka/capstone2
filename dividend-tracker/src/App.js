
import './App.css';
import Footer from './Footer';
import Navigation from './Navigation';
import Routes from './Routes';
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [token, setToken] = useLocalStorage("portfolio_token");

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="container py-3">
    <Navigation logout={handleLogout} />
    <Routes setToken={setToken} />
    <Footer />
    </div>
  );
}

export default App;
