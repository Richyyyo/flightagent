import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
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
          <h2>Flight Agent</h2>
        </div>
        <div className="action-btn">
          <button>Sign In</button>
          <button>Create Account</button>
        </div>
        <MobileHamburger />
      </div>
    </>
  );
}
