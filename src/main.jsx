import { StrictMode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import "./index.css";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Deals from "./pages/Deals.jsx";
import AuthRoute from "./components/auth/AuthRoute.jsx";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-vuf2b652285d7xfr.us.auth0.com"
    clientId="KAZwWBdw7lHO5lFgTVX76fKhos6tmwOv"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="*" element={<h2>404 - Not Found</h2>} />
          </Route>
          <Route path="/auth" element={<AuthRoute />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Auth0Provider>
);
