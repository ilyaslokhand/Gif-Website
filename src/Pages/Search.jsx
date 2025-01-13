import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-context";
import Filtergif from "../components/Filter-gif";
import Gif from "../components/Gif";

const Search = () => {
  const [searchresults, setsearchresult] = useState([]);

  const { Gf, filter } = GifState();

  const { query } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await Gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setsearchresult(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <Filtergif alignLeft={true} />
      {searchresults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchresults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
