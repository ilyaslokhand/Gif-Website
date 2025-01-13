import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-context";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

const Category = () => {
  const [searchresult, setsearchresult] = useState([]);
  const { Gf } = GifState();

  const { catagory } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await Gf.gifs(catagory, catagory);
    setsearchresult(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [catagory]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-72 sm:w-72">
        {searchresult.length > 0 && <Gif gif={searchresult[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="divider" />
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {catagory.split("-").join(" & ")} Gifs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{catagory}
        </h2>
        {searchresult.length > 0 && (
          <div className="columns-2 md:columns-3 xl:columns-5 lg:columns-4 gap-2">
            {searchresult.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
