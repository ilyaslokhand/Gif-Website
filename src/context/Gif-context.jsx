import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
const Gifcontext = createContext();

const Gifprovider = ({ children }) => {
  const [gifs, setgifs] = useState([]);
  const [filter, setfilter] = useState("gifs");
  const [favorites, setfavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoritesGifs")) || [];
    setfavorites(storedFavorites); // Set favorites state from localStorage
  }, []);

  const addtofavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedfavorites = favorites.filter((itemid) => itemid !== id);
      localStorage.setItem("favoritesGifs", JSON.stringify(updatedfavorites));
      setfavorites(updatedfavorites);
    } else {
      const updatedfavorites = [...favorites];
      updatedfavorites.push(id);
      localStorage.setItem("favoritesGifs", JSON.stringify(updatedfavorites));
      setfavorites(updatedfavorites);
    }
  };

  const Gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <Gifcontext.Provider
      value={{
        Gf,
        gifs,
        setgifs,
        filter,
        setfilter,
        favorites,
        setfavorites,
        addtofavorites,
      }}
    >
      {children}
    </Gifcontext.Provider>
  );
};

export const GifState = () => {
  return useContext(Gifcontext);
};

export default Gifprovider;
