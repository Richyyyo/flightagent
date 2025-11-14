import { NavLink, Link } from "react-router-dom";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import ProfileMenu from "../components/ProfileMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "../components/LogoutButton";

function MobileHamburger({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  // Only try to get token if authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getAccessTokenSilently().catch(() => {});
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

  const openAuth = (mode) => {
    navigate(`/auth?mode=${mode}`);
  };

  if (isLoading) {
    return <div className="header">Loading...</div>;
  }

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
        <LoginButton onClick={() => openAuth("login")} />
      </li>
      <li>
        <SignupButton onClick={() => openAuth("signup")} />
      </li>
    </>
  );

  return (
    <div className="header">
      <div className="logo">
        <BsFillAirplaneEnginesFill className="airplane" />
        <Link to="/">
          <h2>Flight Agent</h2>
        </Link>
      </div>

      <div className="action-btn">
        {isAuthenticated && user ? (
          <ProfileMenu />
        ) : (
          <>
            <LoginButton onClick={() => openAuth("login")} />
            <SignupButton onClick={() => openAuth("signup")} />
          </>
        )}
      </div>

      <MobileHamburger>{mobileAuthItems}</MobileHamburger>
    </div>
  );
}
