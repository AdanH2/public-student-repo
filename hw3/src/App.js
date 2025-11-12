import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "./components/Home";
import List from "./components/List";
import Population from "./components/Population";
import Custom from "./components/PopulationPie";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/bar-chart" element={<Population />} />
        <Route path="/pie-chart" element={<Custom />} />
      </Routes>
    </Router>
  );
}
