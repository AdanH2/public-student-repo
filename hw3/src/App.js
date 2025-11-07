import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "./components/Home";
import List from "./components/List";
import Population from "./components/Population";
import Custom from "./components/PopulationPie";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/population" element={<Population />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
    </Router>
  );
}
