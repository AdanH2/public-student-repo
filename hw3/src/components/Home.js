import NavBar from "./NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="container d-flex flex-column align-items-center p-3 w-50">
        <h1>Welcome to the Home Page</h1>
        <p>
          This is the main landing page of the application. In this app, you
          will find information about South American countries. The navigation
          bar above allows you to explore different sections, including a list
          of countries, population statistics, and a population breakdown.
        </p>
      </div>
    </div>
  );
}
