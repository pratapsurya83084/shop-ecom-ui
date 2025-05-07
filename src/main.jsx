import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StateContext from "./components/context/StateContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StateContext>
    <GoogleOAuthProvider clientId="1088716956562-e5lspq26mt4a0vaodpq0v91ec8flo86i.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StateContext>
);
