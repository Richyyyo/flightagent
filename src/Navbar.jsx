import { BsFillAirplaneEnginesFill } from "react-icons/bs";

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
      </div>
    </>
  );
}
