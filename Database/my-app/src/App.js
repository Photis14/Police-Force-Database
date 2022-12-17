import "./App.css";
import { Home } from "./Home";
import { Unit } from "./Unit";
import { Employee } from "./Employee";
import { Vehicle } from "./Vehicle";
import { Log } from "./Log";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          SUPD
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/unit">
                Units
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employees
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/vehicle">
                Vehicles
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/log">
                Logs
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/unit" element={<Unit />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
