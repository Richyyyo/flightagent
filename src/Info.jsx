import { BsFillShieldFill } from "react-icons/bs";
import { LuBadgeCheck } from "react-icons/lu";
import { LuStar } from "react-icons/lu";

function Info({ icon: Icon, heading, subtext }) {
  return (
    <>
      <div className="info">
        <Icon />
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
          subtext="Card stored via Stripe, we only charge if you reply Yes"
        />
        <Info
          icon={LuBadgeCheck}
          heading="Payment Safety"
          subtext="Card stored via Stripe, we only charge if you reply Yes"
        />
        <Info
          icon={LuStar}
          heading="Payment Safety"
          subtext="Card stored via Stripe, we only charge if you reply Yes"
        />
      </div>
    </>
  );
}
