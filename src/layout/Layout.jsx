import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">
        <Outlet /> {/* This renders <Home />, <Deals />, etc. */}
      </main>
      <Footer />
    </div>
  );
}
