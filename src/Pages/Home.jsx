import React, { useEffect } from "react";
import { GifState } from "../context/Gif-context";
import Gif from "../components/Gif";
import Filtergif from "../components/Filter-gif";
import Gifsearch from "../components/Gif-search";

const Home = () => {
  const { Gf, gifs, setgifs, filter } = GifState();

  const fetchtredinggifs = async () => {
    const { data } = await Gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setgifs(data);
  };

  useEffect(() => {
    fetchtredinggifs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />
      <Filtergif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.title} />
        ))}
      </div>
    </div>
  );
};

export default Home;
