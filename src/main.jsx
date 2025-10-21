import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import InfoHolder from "./Info.jsx";
import Footer from "./Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <InfoHolder />
    <Footer />
  </StrictMode>
);
