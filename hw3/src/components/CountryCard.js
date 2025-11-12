export default function CountryCard({ country }) {
  const flagSrc = country.flags?.png || country.flags?.svg || "";
  const name = country.name?.common || "Unknown";

  return (
    <div
      className="border p-2 mb-2 rounded bg-white d-flex align-items-center"
      data-testid={`country-${name}`}
    >
      <img
        src={flagSrc}
        alt={`${name}'s flag`}
        width="50"
        height="30"
        style={{ marginRight: 12 }}
      />
      <div>
        <h2 className="m-0 fs-4">{name}</h2>
        <p className="mb-0">
          Population:{" "}
          {country.population ? country.population.toLocaleString() : "N/A"}
        </p>
        <p className="mb-0">
          Area:{" "}
          {country.area ? `${country.area.toLocaleString()} sq km` : "N/A"}
        </p>
      </div>
    </div>
  );
}
