import { NavLink, Link } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";

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
              <li>
                <LoginButton />
              </li>
              <li>
                <SignupButton />
              </li>
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
          <LoginButton />
          <SignupButton />
        </div>
        <MobileHamburger />
      </div>
    </>
  );
}
