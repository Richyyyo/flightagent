import { BsFillAirplaneEnginesFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

function MobileHamburger() {
  return (
    <>
      <div className="mobile">
        <AiOutlineMenu />
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
