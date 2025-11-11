// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillShieldFill, BsSearch } from "react-icons/bs";
import { LuBadgeCheck, LuStar } from "react-icons/lu";
import { AiFillSetting } from "react-icons/ai";
import FlightHolder from "../Flight.jsx";

const today = new Date().toISOString().split("T")[0];

/* -------------------------------------------------
   Quick-search bar (read-only, shows current route)
   ------------------------------------------------- */
function Search({ form, loading, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="find-deals">
      <div className="input-wrapper">
        <BsSearch className="search-logo" />
        <input
          className="deals-input"
          type="text"
          placeholder="NYC to LAX"
          value={`${form.origin || ""} to ${form.destination || ""}`.trim()}
          readOnly
        />
      </div>
      <button type="submit" className="find-btn" disabled={loading}>
        {loading ? "Searching…" : "Find Deals"}
      </button>
    </form>
  );
}

/* -------------------------------------------------
   Full filter panel – dynamic layout per trip type
   ------------------------------------------------- */
function SearchFilter({
  form,
  setForm,
  airports,
  pickAirport,
  handleSubmit,
  loading,
  error,
}) {
  return (
    <form onSubmit={handleSubmit} className="search-filter-container">
      <div className="filter-heading">
        <AiFillSetting className="settings-icon" />
        <h2>Fine-tune Filters</h2>
      </div>

      {/* Trip type */}
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={form.tripType === "oneway"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tripType: e.target.value,
                returnDate: "",
              }))
            }
          />
          One Way
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={form.tripType === "roundtrip"}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tripType: e.target.value }))
            }
          />
          Round Trip
        </label>
      </div>

      {/* ------------------- ORIGIN + DESTINATION (same line) ------------------- */}
      <div className="input-group-row">
        <div className="input-group flex-1">
          <label>From</label>
          <input
            className="from-input"
            type="text"
            placeholder="NYC"
            value={form.origin}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, origin: e.target.value }))
            }
            required
          />
          {airports.origin.length > 0 && (
            <ul className="suggestions">
              {airports.origin.map((airport) => (
                <li
                  key={airport.iata_code}
                  onClick={() => pickAirport("origin", airport)}
                >
                  {airport.airport_name} ({airport.iata_code}) – {airport.city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-group flex-1">
          <label>To</label>
          <input
            className="to-input"
            type="text"
            placeholder="HTX"
            value={form.destination}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, destination: e.target.value }))
            }
            required
          />
          {airports.destination.length > 0 && (
            <ul className="suggestions">
              {airports.destination.map((airport) => (
                <li
                  key={airport.iata_code}
                  onClick={() => pickAirport("destination", airport)}
                >
                  {airport.airport_name} ({airport.iata_code}) – {airport.city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ------------------- DATES + PASSENGERS (dynamic) ------------------- */}
      {form.tripType === "oneway" ? (
        /* ONE WAY: Depart + Passengers on same line */
        <div className="input-group-row">
          <div className="input-group flex-1">
            <label>Depart</label>
            <input
              className="depart-input"
              type="date"
              value={form.departureDate}
              min={today}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  departureDate: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="input-group flex-1">
            <label>Passengers</label>
            <select
              value={form.passengers}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  passengers: Number(e.target.value),
                }))
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Adult" : "Adults"}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        /* ROUND TRIP: Dates on one line, Passengers below */
        <>
          <div className="input-group-row">
            <div className="input-group flex-1">
              <label>Depart</label>
              <input
                className="depart-input"
                type="date"
                value={form.departureDate}
                min={today}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    departureDate: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="input-group flex-1">
              <label>Return</label>
              <input
                className="return-input"
                type="date"
                value={form.returnDate}
                min={form.departureDate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    returnDate: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          {/* Passengers below dates */}
          <div className="input-group">
            <label>Passengers</label>
            <select
              value={form.passengers}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  passengers: Number(e.target.value),
                }))
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Adult" : "Adults"}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {error && <p className="filter-error">{error}</p>}

      <button type="submit" className="filter-btn" disabled={loading}>
        <BsSearch />
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

/* -------------------------------------------------
   Hero – only the headline + quick-search
   ------------------------------------------------- */
function Hero({ form, loading, handleSubmit }) {
  return (
    <div className="hero">
      <h2>
        Smart Flight Tracking <br />
        <span>Effortless Booking</span>
      </h2>
      <p>
        Get SMS alerts when price drops. Book instantly with a simple reply. No
        Apps, No Hassle!!!
      </p>
      <Search form={form} loading={loading} handleSubmit={handleSubmit} />
    </div>
  );
}

/* -------------------------------------------------
   Info cards – unchanged
   ------------------------------------------------- */
function Info({ icon: Icon, heading, subtext }) {
  return (
    <div className="info">
      <Icon className="icon" />
      <div className="info-text">
        <h3>{heading}</h3>
        <p>{subtext}</p>
      </div>
    </div>
  );
}

function InfoHolder() {
  return (
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
  );
}

/* -------------------------------------------------
   MOCK API – replace with real endpoints later
   ------------------------------------------------- */
const searchAirports = async (query) => {
  await new Promise((r) => setTimeout(r, 300));
  const mock = [
    { iata_code: "JFK", airport_name: "John F. Kennedy", city: "New York" },
    { iata_code: "LGA", airport_name: "LaGuardia", city: "New York" },
    { iata_code: "EWR", airport_name: "Newark Liberty", city: "Newark" },
    { iata_code: "LAX", airport_name: "Los Angeles Intl", city: "Los Angeles" },
    { iata_code: "HTX", airport_name: "Houston Hobby", city: "Houston" },
  ];
  return mock
    .filter(
      (a) =>
        a.iata_code.toLowerCase().includes(query.toLowerCase()) ||
        a.city.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);
};

const searchFlights = async (payload) => {
  await new Promise((r) => setTimeout(r, 1000));
  return [
    {
      id: 1,
      price: 299,
      airline: "Delta",
      departure: payload.origin,
      arrival: payload.destination,
      departTime: "2025-12-01T08:00:00",
      arriveTime: "2025-12-01T11:30:00",
    },
  ];
};

/* -------------------------------------------------
   MAIN COMPONENT
   ------------------------------------------------- */
export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    origin: "",
    destination: "",
    departureDate: today,
    returnDate: "",
    passengers: 1,
    tripType: "oneway",
  });

  const [airports, setAirports] = useState({
    origin: [],
    destination: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ----- Autocomplete ----- */
  useEffect(() => {
    if (form.origin.length > 1) {
      searchAirports(form.origin).then((data) =>
        setAirports((prev) => ({ ...prev, origin: data }))
      );
    } else {
      setAirports((prev) => ({ ...prev, origin: [] }));
    }

    if (form.destination.length > 1) {
      searchAirports(form.destination).then((data) =>
        setAirports((prev) => ({ ...prev, destination: data }))
      );
    } else {
      setAirports((prev) => ({ ...prev, destination: [] }));
    }
  }, [form.origin, form.destination]);

  /* ----- Submit handler (used by both forms) ----- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        origin: form.origin,
        destination: form.destination,
        departureDate: form.departureDate,
        returnDate: form.tripType === "roundtrip" ? form.returnDate : null,
        passengers: form.passengers,
      };

      const results = await searchFlights(payload);
      navigate("/deals", { state: { results, searchParams: form } });
    } catch (err) {
      setError(err.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const pickAirport = (field, airport) => {
    setForm((prev) => ({ ...prev, [field]: airport.iata_code }));
    setAirports((prev) => ({ ...prev, [field]: [] }));
  };

  return (
    <>
      {/* Hero + quick search */}
      <Hero form={form} loading={loading} handleSubmit={handleSubmit} />

      {/* Full filter panel */}
      <SearchFilter
        form={form}
        setForm={setForm}
        airports={airports}
        pickAirport={pickAirport}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      {/* Featured flights */}
      <FlightHolder />

      {/* Info cards */}
      <InfoHolder />
    </>
  );
}
