import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import InfoHolder from "./Info.jsx";
import Footer from "./Footer.jsx";
import FlightHolder from "./Flight.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <FlightHolder />
    <InfoHolder />

    <Footer />
  </StrictMode>
);
