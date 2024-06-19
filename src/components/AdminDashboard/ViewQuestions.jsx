import { useState } from "react";
import axios from "axios";
import "../../css/ViewQuestions.css"; // Adjust the path as necessary

const ViewQuestions = () => {
  // State variables
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  // Mock data for subjects and topics based on grade
  const subjectsByGrade = {
    "Grade 1": ["Mathematics", "Science"],
    "Grade 2": ["Mathematics", "English"],
    "Grade 3": ["Science", "History"],
    // Define subjects for other grades as needed
  };

  const topicsBySubject = {
    Mathematics: ["Algebra", "Geometry", "Arithmetic"],
    Science: ["Biology", "Chemistry", "Physics"],
    English: ["Grammar", "Literature", "Writing"],
    History: ["World History", "Ancient History", "Modern History"],
    // Define topics for other subjects as needed
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate fetching questions from an API endpoint
      const response = await axios.get("/api/questions", {
        params: { grade, subject, topic },
      });
      setQuestions(response.data);
      setShowQuestions(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Handle error state or display error message
    }
  };

  // Function to handle going back to the selection form
  const handleBack = () => {
    setShowQuestions(false);
    setQuestions([]);
  };

  return (
    <div className="view-questions-container">
      <h1>View Questions</h1>
      {!showQuestions ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Grade:</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 8 }, (_, index) => (
                <option key={`grade-${index + 1}`} value={`Grade ${index + 1}`}>
                  Grade {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              {subjectsByGrade[grade]?.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Topic:</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            >
              <option value="">Select Topic</option>
              {topicsBySubject[subject]?.map((tpc) => (
                <option key={tpc} value={tpc}>
                  {tpc}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">View Questions</button>
        </form>
      ) : (
        <div className="question-list">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <ul>
            {questions.map((question) => (
              <li key={question.id} className="question-item">
                <strong>Question:</strong> {question.question}
                <br />
                <strong>Answer:</strong> {question.answer}
                <br />
                <strong>Grade:</strong> {question.grade}
                <br />
                <strong>Subject:</strong> {question.subject}
                <br />
                <strong>Topic:</strong> {question.topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewQuestions;
