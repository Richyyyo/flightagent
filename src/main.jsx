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

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
    onRedirectCallback={onRedirectCallback}
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
