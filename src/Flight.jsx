const flights = [
  {
    heading: "Flight to",
    subtext: "United Kingdom",
    image:
      "https://media.istockphoto.com/id/874932992/photo/travel-to-london-by-flight.jpg?s=612x612&w=0&k=20&c=r6HIqkx9XfFmeZURTvvAlSS529xCiYIYpZbBFaH9h1k=",
    alt: "London, United Kingdom",
  },
  {
    heading: "Flight to",
    subtext: "France",
    image:
      "https://media.istockphoto.com/id/480201135/photo/travel-to-paris.jpg?s=612x612&w=0&k=20&c=okIrNZ4rP40EO3ME3y-2c7YKgsIVgR1sxq6ZK2R4BuM=",
    alt: "Paris, France",
  },
  {
    heading: "Flight to",
    subtext: "Spain",
    image:
      "https://media.istockphoto.com/id/697997080/photo/view-over-mallorca-beach-el-arenal-called-ballermann.jpg?s=612x612&w=0&k=20&c=Fh0NtN5oj-dAsl98_3UepssSDBpQTKTRxY-7As6EUqo=",
    alt: "Madrid, Spain",
  },
  {
    heading: "Flight to",
    subtext: "Italy",
    image:
      "https://media.istockphoto.com/id/489548345/photo/airplane-over-rome.jpg?s=612x612&w=0&k=20&c=tqT-PJL8jkWHwmsTM1B38U7zqRHd6wR0WzYIf3dA-4s=",
    alt: "Rome, Italy",
  },
  {
    heading: "Flight to",
    subtext: "Turkey",
    image:
      "https://media.istockphoto.com/id/1253730523/photo/istanbul-at-sunset-with-a-passenger-airplane.jpg?s=612x612&w=0&k=20&c=6_avt_hyJ3-F8ciW4oHVlW7HREFClrsl2GhZynn2irg=",
    alt: "Istanbul, Turkey",
  },
  {
    heading: "Flight to",
    subtext: "Mexico",
    image:
      "https://media.istockphoto.com/id/621821582/photo/airplanes-shadow-over-a-crowded-beach.jpg?s=612x612&w=0&k=20&c=ICPaq8BxT6Bp1hnbmjnmi3_gxmZ5L8jydCueviqsx1w=",
    alt: "Mexico City, Mexico",
  },
];

function FlightCard({ heading, subtext, image, alt }) {
  return (
    <>
      <div className="flight-card">
        <img src={image} alt={alt} />
        <div className="flight-text">
          <h3>{heading}</h3>
          <p>{subtext}</p>
        </div>
      </div>
    </>
  );
}

export default function FlightHolder() {
  return (
    <>
      <section className="flights-section">
        <div className="flights-grid">
          {flights.map((flight, i) => (
            <FlightCard
              key={i}
              heading={flight.heading}
              subtext={flight.subtext}
              image={flight.image}
              alt={flight.alt}
            />
          ))}
        </div>
      </section>
    </>
  );
}
