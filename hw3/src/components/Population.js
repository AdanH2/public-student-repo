import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { API, SOUTH_AMERICAN_COUNTRIES } from "../constants/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Population() {
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
          // sort by population descending for better visualization
          filtered.sort((a, b) => (b.population || 0) - (a.population || 0));
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

  const labels = countries.map((c) => c.name?.common || "");
  const data = {
    labels,
    datasets: [
      {
        label: "Population",
        data: countries.map((c) => c.population || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Population of South American Countries" },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <NavBar />
      <div className="p-3 w-75 mx-auto rounded">
        <h2 className="text-center mb-4">
          Population by Country (South America)
        </h2>

        {loading && <p>Loading population data...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {!loading && !error && countries.length > 0 && (
          <div style={{ height: 500 }}>
            <Bar options={options} data={data} />
          </div>
        )}

        {!loading && !error && countries.length === 0 && (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
