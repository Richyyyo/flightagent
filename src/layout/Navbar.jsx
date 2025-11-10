import { NavLink, Link } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function MobileHamburger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="mobile">
        <button onClick={toggleMenu} className="mobile-btn">
          {!isMenuOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
        </button>
        {isMenuOpen && (
          <div className="mobile-list">
            <ul>
              <li>Sign In</li>
              <li>Create Account</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default function Navbar() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <BsFillAirplaneEnginesFill className="airplane" />
          <Link to="/">
            <h2>Flight Agent</h2>
          </Link>
        </div>
        <div className="action-btn">
          <NavLink to="https://www.google.com">
            <button>Sign In</button>
          </NavLink>
          <NavLink to="">
            <button>Create Account</button>
          </NavLink>
        </div>
        <MobileHamburger />
      </div>
    </>
  );
}
