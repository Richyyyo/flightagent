import { BsFillShieldFill } from "react-icons/bs";
import { LuBadgeCheck } from "react-icons/lu";
import { LuStar } from "react-icons/lu";

function Info({ icon: Icon, heading, subtext }) {
  return (
    <>
      <div className="info">
        <Icon className="icon" />
        <div className="info-text">
          <h3>{heading}</h3>
          <p>{subtext}</p>
        </div>
      </div>
    </>
  );
}
export default function InfoHolder() {
  return (
    <>
      <div className="info-container">
        <Info
          icon={BsFillShieldFill}
          heading="Payment Safety"
          subtext="Cards stored via Stripe. We only charge if you reply YES."
        />
        <Info
          icon={LuBadgeCheck}
          heading="Clear Consent"
          subtext="SMS opt-in with STOP/HELP. Quiet hours supported."
        />
        <Info
          icon={LuStar}
          heading="Transparency"
          subtext="Simple 'Why this price?' with a confidence range."
        />
      </div>
    </>
  );
}
