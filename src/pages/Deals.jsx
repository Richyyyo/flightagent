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
  return (
    <>
      <div className="result-container">
        <img src={image} alt={alt} />
        <ul className="result-details">
          <div>
            <li>{time}</li> <span>{airline}</span>
          </div>
          <div>
            <li>{flightduration}</li> <span>{location}</span>
          </div>
          <div>
            <li>{stops}</li> <span>{layoverhours}</span>
          </div>
          <div>
            <li>{price}</li>
          </div>
        </ul>
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
