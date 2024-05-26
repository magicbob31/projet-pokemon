import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListesCard from "./pages/ListesCard.jsx";
import "./index.css";
import "./reset.css";
import MaColec from "./pages/MaColec.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/listescard",
    element: <ListesCard />,
  },
  { path: "/macolec", element: <MaColec /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
