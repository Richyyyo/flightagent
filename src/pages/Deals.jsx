import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const mockup_results = [
  {
    image:
      "https://logos-world.net/wp-content/uploads/2021/02/British-Airways-Symbol.png",
    alt: "British Airways Logo",
    time: "7:50 AM - 7:45 PM",
    airline: "British Airway",
    flightduration: "6 hr 55 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$508",
  },
  {
    image:
      "https://images.seeklogo.com/logo-png/19/2/american-airlines-logo-png_seeklogo-194099.png",
    alt: "American Airline Logo",
    time: "6:10 PM - 6:20 AM",
    airline: "American Airline",
    flightduration: "7 hr 10 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$508",
  },
  {
    image: "https://flydoha.qa/img_airlines/Z0.png",
    alt: "Norse Atlantic UK Logo",
    time: "6:20 PM - 6:20 AM",
    airline: "Norse Atlantic UK",
    flightduration: "7 hr",
    location: "JFK - LGW",
    stops: "Nonstop",
    price: "$535",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/virgin-1.svg",
    alt: "Virgin Atlantic Logo",
    time: "11:00 PM - 11:10 AM",
    airline: "Virgin Atlantic",
    flightduration: "7 hr 10 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$560",
  },
];

function ResultText() {
  return (
    <>
      <div className="result-text"></div>
      <h2>Here's your result</h2>
      <p>Top Departing Flights</p>
      <p>Ranked based on price and convenience</p>
    </>
  );
}

function FlightBox({
  image,
  time,
  airline,
  flightduration,
  location,
  stops,
  layoverhours,
  price,
  alt,
}) {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => setDropDown(!dropDown);
  return (
    <>
      <div className="flight-box-wrapper">
        {" "}
        {/* New wrapper for clean dropdown */}
        <div className="result-container">
          <img src={image} alt={alt} className="airline-logo" />

          <ul className="result-details">
            <li>
              <div className="time">{time}</div>
              <div className="airline">{airline}</div>
            </li>
            <li>
              <div>{flightduration}</div>
              <div>{location}</div>
            </li>
            <li>
              <div>{stops}</div>
              {layoverhours && <div>{layoverhours}</div>}
            </li>
            <li className="price">{price}</li>
          </ul>

          <button onClick={toggleDropDown} className="dropdown-btn">
            {dropDown ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
          </button>
        </div>
        {/* Dropdown Content - appears BELOW the main bar */}
        {dropDown && (
          <div className="dropdown-content">
            <div className="dropdown-inner">
              {/* Put your detailed flight info here */}
              <p>Flight details, baggage info, seat selection, etc.</p>
              <ul>
                <li>Direct flight • Economy</li>
                <li>Baggage: 1 personal item + 1 carry-on</li>
                <li>Wi-Fi available • Power outlets</li>
              </ul>
              <button className="select-btn">Select this flight</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default function DealsResult() {
  return (
    <>
      <ResultText />
      {mockup_results.map((result, i) => (
        <FlightBox
          key={i}
          image={result.image}
          alt={result.alt}
          time={result.time}
          airline={result.airline}
          flightduration={result.flightduration}
          location={result.location}
          stops={result.stops}
          layoverhours={result.layoverhours}
          price={result.price}
        />
      ))}
    </>
  );
}
