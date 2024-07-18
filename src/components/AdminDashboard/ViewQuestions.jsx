import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/ViewQuestions.css";
import "../../css/responsive.css";

const ViewQuestions = () => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    if (!grade) {
      setSubjects([]);
      return;
    }

    // Fetch subjects based on grade
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/subjects`, {
        params: { grade },
      })
      .then((response) => {
        console.log("Subjects Response:", response);
        setSubjects(response.data);
        // Reset subject and topic selections
        setSubject("");
        setTopic("");
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
        setSubjects([]);
      });
  }, [grade]);

  useEffect(() => {
    if (!subject) {
      setTopics([]);
      return;
    }

    // Fetch topics based on selected subject
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/topics/${subject}`, {
        params: { grade },
      })
      .then((topicsResponse) => {
        console.log("Topics Response:", topicsResponse);
        setTopics(topicsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setTopics([]);
      });
  }, [subject, grade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedSubject = subjects.find((s) => s.id === parseInt(subject));
      const selectedTopic = topics.find((tpc) => tpc.id === parseInt(topic));
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/upload_question`,
        {
          params: {
            grade,
            subject: selectedSubject?.name || "",
            topic: selectedTopic?.name,
          },
        }
      );
      setQuestions(response.data);
      setShowQuestions(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setShowQuestions(false);
    setQuestions([]);
  };

  const handleEdit = (questionId) => {
    setEditMode(questionId);
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/questions/${questionId}`
      );
      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = async (updatedQuestion) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/questions/${updatedQuestion.id}`,
        updatedQuestion
      );
      setQuestions(
        questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="view-questions-container">
      <h1>View Questions</h1>
      {!showQuestions ? (
        <form onSubmit={handleSubmit} className="view-questions-form">
          <div className="form-group">
            <label>Select Grade:</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 8 }, (_, index) => (
                <option key={`grade-${index + 1}`} value={index + 1}>
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
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
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
              {topics.map((tpc) => (
                <option key={tpc.id} value={tpc.id}>
                  {tpc.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="admin-button">
            View Questions
          </button>
          <Link to="/" className="back-button">
            Back
          </Link>
        </form>
      ) : (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="question-list">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <h2>
                Grade: {grade}, Subject:{" "}
                {subjects.find((s) => s.id === parseInt(subject))?.name || ""},
                Topic:{" "}
                {topics.find((tpc) => tpc.id === parseInt(topic))?.name || ""}
              </h2>
              <p>
                <strong>Number of Questions:</strong> {questions.length}
              </p>
              <ul>
                {questions.map((question) => (
                  <li key={question.id} className="question-item">
                    {editMode === question.id ? (
                      <EditQuestionForm
                        question={question}
                        onSave={handleUpdate}
                        onCancel={() => setEditMode(null)}
                      />
                    ) : (
                      <>
                        <div>
                          <strong>Question:</strong> {question.question}
                        </div>
                        <div>
                          <strong>Options:</strong>
                          <ul>
                            {question.options.map((option, index) => (
                              <li key={index} className="option-container">
                                <input
                                  type="radio"
                                  checked={question.correct_answer === option}
                                  readOnly
                                />
                                {option}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="actions">
                          <button
                            onClick={() => handleEdit(question.id)}
                            className="admin-button"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="back-button"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowQuestions(false)}
                className="back-button"
                style={{ backgroundColor: "#dc3545", marginTop: "10px" }}
              >
                Back to Admin Dashboard
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const EditQuestionForm = ({ question, onSave, onCancel }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState({ ...question });

  const handleOptionChange = (index, value) => {
    const newOptions = [...updatedQuestion.options];
    newOptions[index] = value;
    setUpdatedQuestion({ ...updatedQuestion, options: newOptions });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(updatedQuestion);
  };

  return (
    <form onSubmit={handleSave} className="edit-question-form">
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={updatedQuestion.question}
          onChange={(e) =>
            setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Options:</label>
        {updatedQuestion.options.map((option, index) => (
          <div key={index} className="option-container">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            <input
              type="radio"
              checked={updatedQuestion.correct_answer === index}
              onChange={() =>
                setUpdatedQuestion({
                  ...updatedQuestion,
                  correct_answer: index,
                })
              }
            />
          </div>
        ))}
      </div>
      <div className="actions">
        <button type="submit" className="admin-button">
          Save
        </button>
        <button type="button" onClick={onCancel} className="back-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

EditQuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ViewQuestions;
