import { useCallback } from "react";

const useLocalStorage = () => {
  const setItem = (key, value) => {
    const data = typeof value === "object" ? JSON.stringify(value) : value;
    const encodeData = btoa(data);

    localStorage.setItem(key, encodeData);
  };

  const getItem = useCallback((key) => {
    const data = localStorage.getItem(key);
    if (data) {
      const decodeData = atob(data);
      try {
        return JSON.parse(decodeData);
      } catch {
        return decodeData || null;
      }
    }
    return null;
  }, []);

  const removeItem = useCallback((key) => {
    localStorage.removeItem(key);
  }, []);

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
