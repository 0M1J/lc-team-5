import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import ResidentsDashboard from "./components/resident/ResidentsDashboard";
import Home from "./components/Home";
import CaretakerDashboard from "./components/caretaker/CaretakerDashboard";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resident-dashboard" element={<ResidentsDashboard />} />
          <Route path="/caretaker-dashboard" element={<CaretakerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
