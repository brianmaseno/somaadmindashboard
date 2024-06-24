// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadQuestion from "./components/AdminDashboard/UploadQuestion";
import ViewQuestions from "./components/AdminDashboard/ViewQuestions";
import "./App.css";
import logo from "./assets/logo.png";

const App = () => {
  return (
    <Router>
      <div className="App">
        <img src={logo} alt="Project Logo" className="logo" />
        <h1>Welcome to Admin Dashboard</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div className="button-container">
                <Link to="/upload-question" className="admin-button">
                  Upload Question
                </Link>
                <Link to="/view-questions" className="admin-button">
                  View Questions
                </Link>
              </div>
            }
          />
          <Route path="/upload-question" element={<UploadQuestion />} />
          <Route path="/view-questions" element={<ViewQuestions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
