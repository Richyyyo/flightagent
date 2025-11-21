import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import {
  MdAirlineSeatLegroomNormal,
  MdOutlinePower,
  MdOndemandVideo,
  MdLuggage,
} from "react-icons/md";
import { FaWifi } from "react-icons/fa";

const mockup_results = [
  {
    image:
      "https://logos-world.net/wp-content/uploads/2021/02/British-Airways-Symbol.png",
    alt: "British Airways Logo",
    arrivaltime: "7:50 AM",
    departuretime: "7:45 PM",
    airline: "British Airway",
    flightduration: "6 hr 55 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$508",
    departureairport: "John F. Kennedy International Airport (JFK)",
    arrivalairport: "Heathrow Airport (LHR)",
  },
  {
    image:
      "https://images.seeklogo.com/logo-png/19/2/american-airlines-logo-png_seeklogo-194099.png",
    alt: "American Airline Logo",
    arrivaltime: "6:10 PM",
    departuretime: "6:20 AM",
    airline: "American Airline",
    flightduration: "7 hr 10 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$508",
    departureairport: "John F. Kennedy International Airport (JFK)",
    arrivalairport: "Heathrow Airport (LHR)",
  },
  {
    image: "https://flydoha.qa/img_airlines/Z0.png",
    alt: "Norse Atlantic UK Logo",
    arrivaltime: "6:20 PM",
    departuretime: "6:20 AM",
    airline: "Norse Atlantic UK",
    flightduration: "7 hr",
    location: "JFK - LGW",
    stops: "Nonstop",
    price: "$535",
    departureairport: "John F. Kennedy International Airport (JFK)",
    arrivalairport: "Heathrow Airport (LHR)",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/virgin-1.svg",
    alt: "Virgin Atlantic Logo",
    arrivaltime: "11:00 AM",
    departuretime: "11:10 PM",
    airline: "Virgin Atlantic",
    flightduration: "7 hr 10 min",
    location: "JFK - LHR",
    stops: "Nonstop",
    price: "$560",
    departureairport: "John F. Kennedy International Airport (JFK)",
    arrivalairport: "Heathrow Airport (LHR)",
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
  departuretime,
  arrivaltime,
  airline,
  flightduration,
  location,
  stops,
  price,
  alt,
  arrivalairport,
  departureairport,
}) {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => setDropDown(!dropDown);
  // Clean & accurate "+1 day" detection for transatlantic flights
  const shouldShowPlusOne = () => {
    const dep = departuretime.trim().toUpperCase();
    const arr = arrivaltime.trim().toUpperCase();

    const depHour12 = parseInt(dep.split(":")[0], 10);
    const depIsPM = dep.includes("PM");
    const depHour24 = depIsPM
      ? depHour12 === 12
        ? 12
        : depHour12 + 12
      : depHour12;

    const arrHour12 = parseInt(arr.split(":")[0], 10);

    return (
      depHour24 >= 17 || (depIsPM && arr.includes("AM") && arrHour12 <= 12)
    );
  };

  const displayedArrival = shouldShowPlusOne()
    ? `${arrivaltime} +1`
    : arrivaltime;

  return (
    <>
      <div className="flight-box-wrapper">
        {" "}
        {/* New wrapper for clean dropdown */}
        <div className="result-container">
          <img src={image} alt={alt} className="airline-logo" />

          <ul className="result-details">
            <li>
              <div className="time">
                {departuretime} → {displayedArrival}
              </div>
              <div className="airline">{airline}</div>
            </li>
            <li>
              <div className="flight-duration">{flightduration}</div>
              <div className="airport-name">{location}</div>
            </li>
            <li>
              <div className="stops">
                {stops === "Nonstop" ? "Nonstop" : stops}
              </div>
            </li>
          </ul>
          <p className="price">{price}</p>
          <button
            onClick={toggleDropDown}
            className="dropdown-btn"
            aria-label="Toggle details"
          >
            {dropDown ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
          </button>
        </div>
        {/* Dropdown Content - appears BELOW the main bar */}
        {dropDown && (
          <div className="dropdown-content">
            <div className="dropdown-inner">
              {/* Put your detailed flight info here */}
              <div className="flight-info">
                <p>Flight details</p>
                <p>
                  {departuretime} . {departureairport}
                </p>
                <p>
                  ✈️: {flightduration}{" "}
                  {shouldShowPlusOne() && ". Overnight Flight"}
                </p>
                <p>
                  {displayedArrival} . {arrivalairport}
                </p>
                <p>{stops === "Nonstop" ? "Direct flight" : stops} • Economy</p>
              </div>
              <div className="flight-perks">
                {" "}
                <ul className="perks">
                  <p>In-flight Amenities</p>
                  <li>
                    {" "}
                    <MdAirlineSeatLegroomNormal /> Average legroom (31 in)
                  </li>
                  <li>
                    <FaWifi />
                    Wi-Fi for a fee
                  </li>
                  <li>
                    {" "}
                    <MdOutlinePower />
                    In-seat power & USB Outlets
                  </li>
                  <li>
                    {" "}
                    <MdOndemandVideo />
                    On-demand Video
                  </li>
                  <li>
                    {" "}
                    <MdLuggage />
                    Baggage: 1 personal item + 1 carry-on
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown-action">
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
          arrivaltime={result.arrivaltime}
          departuretime={result.departuretime}
          airline={result.airline}
          flightduration={result.flightduration}
          location={result.location}
          stops={result.stops}
          layoverhours={result.layoverhours}
          price={result.price}
          arrivalairport={result.arrivalairport}
          departureairport={result.departureairport}
        />
      ))}
    </>
  );
}
