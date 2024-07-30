import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadQuestion from "./components/AdminDashboard/UploadQuestion";
import ViewQuestions from "./components/AdminDashboard/ViewQuestions";
import Test from "./components/Test";
import "./App.css";
import logo from "./assets/soma1.png";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="admin-dashboard">
                <div className="somapp-logo">
                  <img
                    src={logo}
                    alt="Project Logo"
                    className="logo"
                    style={{ transform: "scale(1.8)" }}
                  />
                </div>
                <div className="admin-header">
                  <h1>Welcome to Admin Dashboard</h1>
                </div>
                <div className="button-container">
                  <Link to="/upload-question" className="admin-button">
                    Upload Question
                  </Link>
                  <Link to="/view-questions" className="admin-button">
                    View Questions
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/upload-question" element={<UploadQuestion />} />
          <Route path="/view-questions" element={<ViewQuestions />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
