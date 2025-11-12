import { NavLink, Link } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const openAuth = (mode) => {
    navigate(`/auth?mode=${mode}`);
  };

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
        <LoginButton onClick={() => openAuth("login")} isInModal={false} />
      </li>
      <li>
        <LoginButton onClick={() => openAuth("signup")} isInModal={false} />
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
              <LoginButton
                loading={false}
                onClick={() => openAuth("login")}
                isInModal={false}
              />
              <SignupButton
                loading={false}
                onClick={() => openAuth("signup")}
                isInModal={false}
              />
            </>
          )}
        </div>
        <MobileHamburger>{mobileAuthItems}</MobileHamburger>
      </div>
    </>
  );
}
