import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadQuestion from "./components/AdminDashboard/UploadQuestion";
import ViewQuestions from "./components/AdminDashboard/ViewQuestions";
import AllQuestions from "./components/AdminDashboard/AllQuestions";
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
            element={              <div className="admin-dashboard">
                <div className="dashboard-header-section">
                  <div className="somapp-logo">
                    <img
                      src={logo}
                      alt="Project Logo"
                      className="logo"
                      style={{ transform: "scale(2.2)" }}
                    />
                  </div>
                  <div className="admin-header">
                    <h1>Welcome to Admin Dashboard</h1>
                  </div>
                </div>
                
                <div className="button-container">
                  <Link to="/upload-question" className="admin-button">
                    Upload Question
                  </Link>
                  <Link to="/view-questions" className="admin-button">
                    View Questions
                  </Link>
                  <Link to="/all-questions" className="admin-button">
                    View All Questions
                  </Link>
                </div>
              </div>
            }
          />          <Route path="/upload-question" element={<UploadQuestion />} />
          <Route path="/view-questions" element={<ViewQuestions />} />
          <Route path="/all-questions" element={<AllQuestions />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
