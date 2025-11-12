import { useEffect, useState } from "react";
import { API, SOUTH_AMERICAN_COUNTRIES } from "../constants/constants";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PopulationPie() {
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

  const PALETTE = [
    "#3366CC",
    "#DC3912",
    "#FF9900",
    "#109618",
    "#990099",
    "#3B3EAC",
    "#0099C6",
    "#DD4477",
    "#66AA00",
    "#B82E2E",
    "#316395",
    "#994499",
  ];

  const sorted = [...countries].sort(
    (a, b) => (b.population || 0) - (a.population || 0)
  );
  const numOther = Math.min(6, sorted.length);
  const topCount = Math.max(sorted.length - numOther, 0);

  const top = sorted.slice(0, topCount);
  const other = sorted.slice(topCount);

  const labels = top.map((c) => c.name?.common || "");
  const dataValues = top.map((c) => c.population || 0);

  if (other.length > 0) {
    const otherSum = other.reduce((s, c) => s + (c.population || 0), 0);
    labels.push("Other");
    dataValues.push(otherSum);
  }

  const backgroundColor = labels.map((_, idx) => {
    // Use palette for top slices, and a gray for the "Other" slice (last)
    if (idx < PALETTE.length) return PALETTE[idx];
    return "#888888";
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Population",
        data: dataValues,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Population Share — South America" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `${context.label}: ${new Intl.NumberFormat().format(value)}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="p-3 w-75 mx-auto rounded">
        <h1 className="text-center mb-4">Population Pie Chart</h1>

        {loading && <p>Loading data...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {!loading && !error && countries.length > 0 && (
          <div style={{ height: 500 }}>
            <Pie data={data} options={options} />
          </div>
        )}

        {!loading && !error && countries.length === 0 && (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
