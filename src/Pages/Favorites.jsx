import React, { useEffect, useState } from "react";
import { GifState } from "../context/Gif-context";
import Gif from "../components/Gif";

const Favorites = () => {
  const [favoritesgif, setfavoritesgif] = useState([]);
  console.log(favoritesgif);
  const { Gf, favorites } = GifState();

  const fetchfavoritegif = async () => {
    const { data: gifs } = await Gf.gifs(favorites);
    setfavoritesgif(gifs);
  };

  useEffect(() => {
    fetchfavoritegif();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoritesgif.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
