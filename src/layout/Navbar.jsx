import { NavLink, Link } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import ProfileMenu from "../components/ProfileMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "../components/LogoutButton";

function MobileHamburger({ children }) {
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
            <ul>{children}</ul>
          </div>
        )}
      </div>
    </>
  );
}

export default function Navbar() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) return null;

  const mobileAuthItems = isAuthenticated ? (
    <>
      <li className="profile-item">
        <div className="user-profile">
          <CgProfile />
          <span>{user?.name || user?.email}</span>
        </div>
      </li>
      <li>
        <LogoutButton />
      </li>
    </>
  ) : (
    <>
      <li>
        <LoginButton />
      </li>
      <li>
        <SignupButton />
      </li>
    </>
  );
  return (
    <>
      <div className="header">
        <div className="logo">
          <BsFillAirplaneEnginesFill className="airplane" />
          <Link to="/">
            <h2>Flight Agent</h2>
          </Link>
        </div>
        <div className="action-btn ">
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </div>
        <MobileHamburger>{mobileAuthItems}</MobileHamburger>
      </div>
    </>
  );
}
