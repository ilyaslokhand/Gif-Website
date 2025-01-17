import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-context";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import Gif from "../components/Gif";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const Singlegif = () => {
  const { type, slug } = useParams();

  const [gif, setGif] = useState({});
  const [relatedgif, setrelatedgif] = useState([]);
  const [readmore, setreadmore] = useState(false);

  const { Gf, favorites, setfavorites, addtofavorites } = GifState();

  useEffect(() => {
    if (!contentType.includes(type.trim())) {
      throw new Error("Invalid Content Type");
    }

    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await Gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await Gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setGif(data);
      setrelatedgif(related);
    };
    fetchGif();
  }, []);

  const shareGif = () => {
    const giflink = gif?.url;

    if (navigator.share) {
      navigator.share({
        title: gif.title || "Check out this GIF!",
        text: `here's  a cool GIF: ${gif.title}`,
        url: giflink,
      });
    }
  };

  const embedGif = () => {
    const embedcode = `<iframe src="${gif?.embed_url}" width="480" height="270" frameBorder="0" allowFullScreen></iframe>`;
    navigator.clipboard
      .writeText(embedcode)
      .then(() => {
        alert("Embed code copied to clipboard!");
      })
      .catch((error) => {
        alert("Failed to copy embed code. Please try again.");
      });
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setreadmore(!readmore)}
                >
                  {readmore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read More <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif?.source} target="_blank" className="truncate">
                {gif?.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              className="flex gap-5 items-center font-bold text-lg"
              onClick={() => addtofavorites(gif.id)}
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>

            <button
              className="flex gap-6 items-center font-bold text-lg"
              onClick={shareGif}
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              className="flex gap-5 items-center font-bold text-lg"
              onClick={embedGif}
            >
              {" "}
              <IoCodeSharp size={30} /> Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related Gif</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedgif.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlegif;
