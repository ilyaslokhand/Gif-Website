import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
const Gifcontext = createContext();

const Gifprovider = ({ children }) => {
  const [gifs, setgifs] = useState([]);
  const [filter, setfilter] = useState("gifs");
  const [favorites, setfavorites] = useState([]);

  const Gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <Gifcontext.Provider
      value={{ Gf, gifs, setgifs, filter, setfilter, favorites, setfavorites }}
    >
      {children}
    </Gifcontext.Provider>
  );
};

export const GifState = () => {
  return useContext(Gifcontext);
};

export default Gifprovider;
