function Search() {
  return (
    <>
      <div className="find-deals">
        <input type="text" placeholder="NYC to LAX" />
        <button>Find Deals</button>
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
          Apps, No Hassle!
        </p>
      </div>
      <Search />
    </>
  );
}
