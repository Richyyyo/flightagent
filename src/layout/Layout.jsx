import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <>
      <div className="layout-container">
        <Navbar />
        <main className="layout-main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
