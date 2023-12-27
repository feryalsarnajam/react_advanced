import React, { useState, useEffect, useContext } from "react";

const Context = React.createContext({});
const AffiliateContext = (init) => useContext(Context);

export const AffiliateProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAffiliates = async () => {
    setLoading(true);
    const newText = await fetch(`http://localhost:3000/categories`);
    setData(newText);
    setLoading(false);
  };

  useEffect(() => {
    getAffiliates();
  }, []);

  return (
    <AffiliateContext.Provider value={{ loading, list: data }}>
      {children}
    </AffiliateContext.Provider>
  );
};
