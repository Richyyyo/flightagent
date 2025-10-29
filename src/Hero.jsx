import { BsSearch } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";

function Search() {
  return (
    <>
      <div className="find-deals">
        <div className="input-wrapper">
          <BsSearch className="search-logo" />
          <input className="deals-input" type="text" placeholder="NYC to LAX" />
        </div>

        <button className="find-btn">Find Deals</button>
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
          {" "}
          <BsSearch />
          Search
        </button>
      </div>
    </>
  );
}

export default function Hero() {
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
