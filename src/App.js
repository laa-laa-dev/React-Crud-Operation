import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./components/dashboard/dashboard";
import "./components/headers/header";
import "./components/footer/footer";
import { Button } from "react-bootstrap";
import Dashboard from "./components/dashboard/dashboard";
import Header from "./components/headers/header";
import Footer from "./components/footer/footer";
function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/header">header</Link>
          </li>
          <li>
            <Link to="/footer">footer</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
