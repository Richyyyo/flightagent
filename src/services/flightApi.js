export async function searchAirports(query) {
  if (!query || query.length < 2) return [];

  await new Promise((r) => setTimeout(r, 300)); // fake delay

  const mockAirports = [
    { iata_code: "JFK", airport_name: "John F. Kennedy", city: "New York" },
    { iata_code: "LAX", airport_name: "Los Angeles Intl", city: "Los Angeles" },
    { iata_code: "ORD", airport_name: "O'Hare International", city: "Chicago" },
    { iata_code: "MIA", airport_name: "Miami International", city: "Miami" },
    {
      iata_code: "SFO",
      airport_name: "San Francisco Intl",
      city: "San Francisco",
    },
  ];

  return mockAirports.filter(
    (a) =>
      a.iata_code.toLowerCase().includes(query.toLowerCase()) ||
      a.airport_name.toLowerCase().includes(query.toLowerCase())
  );
}

// Mock flight search
export async function searchFlights({ origin, destination, departureDate }) {
  await new Promise((r) => setTimeout(r, 800)); // fake delay

  return {
    outbound: [
      {
        airline: { name: "Delta" },
        flight: { iata: "DL123" },
        departure: { iata: origin, scheduled: `${departureDate}T10:00:00` },
        arrival: { iata: destination, scheduled: `${departureDate}T13:30:00` },
        price: 299,
      },
      {
        airline: { name: "American" },
        flight: { iata: "AA456" },
        departure: { iata: origin, scheduled: `${departureDate}T14:00:00` },
        arrival: { iata: destination, scheduled: `${departureDate}T17:45:00` },
        price: 325,
      },
    ],
    return: null,
  };
}
