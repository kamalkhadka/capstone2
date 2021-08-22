
import './App.css';
import Footer from './Footer';
import Navigation from './Navigation';
import Routes from './Routes';
import useLocalStorage from "./hooks/useLocalStorage.js";
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext.js';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import InvestmentApi from './InvestmentApi';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("portfolio_token");

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { id } = jwt_decode(token);
        let currentUser = await InvestmentApi.getCurrentUser(id, token);
        setCurrentUser(currentUser.data);
      } catch (err) {
        setCurrentUser(null);
      }
    }
    getCurrentUser();

  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <div className="container py-3">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Navigation logout={handleLogout} />
          <Routes setToken={setToken} />
        </UserContext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
