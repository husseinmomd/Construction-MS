import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./main.css";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-center" />
  </React.StrictMode>
);
