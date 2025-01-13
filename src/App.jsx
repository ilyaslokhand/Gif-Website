import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./layouts/App-layout";
import Home from "./pages/Home";
import Category from "./Pages/Category";
import Search from "./Pages/Search";
import Favorites from "./Pages/favorites";
import Singlegif from "./Pages/single-gif";
import Gifprovider from "./context/Gif-context";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:catagory",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <Singlegif />,
      },
      {
        path: "/Favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <Gifprovider>
        <RouterProvider router={router} />
      </Gifprovider>
    </div>
  );
};

export default App;
