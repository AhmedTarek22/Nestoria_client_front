import { createContext, useContext, useState } from "react";

const searchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <searchContext.Provider
      value={{ search, setSearch, products, setProducts }}
    >
      {children}
    </searchContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(searchContext);
  return context;
}

export { SearchProvider, useSearchContext };
