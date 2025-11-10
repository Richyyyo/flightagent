import { Link } from "react-router-dom";
import { BsFillShieldFill, BsSearch } from "react-icons/bs";
import { LuBadgeCheck, LuStar } from "react-icons/lu";
import { AiFillSetting } from "react-icons/ai";
import FlightHolder from "../Flight.jsx";

function Search() {
  return (
    <>
      <div className="find-deals">
        <div className="input-wrapper">
          <BsSearch className="search-logo" />
          <input className="deals-input" type="text" placeholder="NYC to LAX" />
        </div>
        <button className="find-btn">
          <Link to="/deals"> Find Deals</Link>
        </button>
      </div>
    </>
  );
}

function SearchFilter() {
  return (
    <>
      <div className="search-filter-container">
        <div className="filter-heading">
          <AiFillSetting className="settings-icon" />
          <h2>Fine-tune Filters</h2>
        </div>
        <div className="filter-location-container">
          <div className="input-group">
            <label htmlFor="">From</label> <br />
            <input className="from-input" type="text" placeholder="NYC" />
          </div>
          <div className="input-group">
            <label htmlFor="">To</label> <br />
            <input className="to-input" type="text" placeholder="HTX" />
          </div>
        </div>

        <div className="filter-date-container">
          <div className="input-group">
            <label htmlFor="">Depart</label> <br />
            <input className="depart-input" type="date" name="" id="" />
          </div>
          <div className="input-group">
            <label htmlFor="">Return</label> <br />
            <input className="return-input" type="date" name="" id="" />
          </div>
        </div>
        <button className="filter-btn">
          <Link to="/">
            {" "}
            <BsSearch />
            Search
          </Link>
        </button>
      </div>
    </>
  );
}

function Hero() {
  return (
    <>
      <div className="hero">
        <h2>
          Smart Flight Tracking <br />
          <span>Effortless Booking</span>
        </h2>
        <p>
          Get Sms alerts when price drop. Book instantly with a simple reply. No
          Apps, No Hassle!!!
        </p>
      </div>
      <Search />
      <SearchFilter />
    </>
  );
}

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
function InfoHolder() {
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

export default function Home() {
  return (
    <>
      <Hero />
      <FlightHolder />
      <InfoHolder />
    </>
  );
}
