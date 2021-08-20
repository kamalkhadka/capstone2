import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [token, setToken] = useState(localStorage.getItem(key));
  useEffect(() => {
    if (!token) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, token);
    }
  }, [key, token]);

  return [token, setToken];
};

export default useLocalStorage;