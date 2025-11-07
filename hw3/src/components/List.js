import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CountryCard from "./CountryCard";
import { API, SOUTH_AMERICAN_COUNTRIES } from "../constants/constants";

export default function List() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const promises = SOUTH_AMERICAN_COUNTRIES.map(async (name) => {
          const res = await fetch(`${API}${encodeURIComponent(name)}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch ${name}: ${res.status}`);
          }
          const data = await res.json();
          return data && data[0] ? data[0] : null;
        });

        const results = await Promise.all(promises);
        const filtered = results.filter(Boolean);

        if (mounted) {
          setCountries(filtered);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to fetch country data");
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div className="d-flex flex-column p-3 w-50 mx-auto rounded">
        <h1 className="text-center mb-4">South American Countries</h1>

        {loading && <p>Loading countries...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {!loading && !error && countries.length === 0 && (
          <p>No countries found.</p>
        )}

        {countries.map((country) => (
          <div key={country.cca3 || country.ccn3 || country.name?.common}>
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}
