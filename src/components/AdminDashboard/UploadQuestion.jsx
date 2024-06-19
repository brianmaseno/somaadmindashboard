// src/components/AdminDashboard/UploadQuestion.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/UploadQuestion.css";

const UploadQuestion = () => {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSelectionSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({
      grade,
      subject,
      topic,
      questionText,
      options,
      correctAnswer,
      image,
    });
    alert("Question uploaded successfully");
    // Clear the form
    setGrade("");
    setSubject("");
    setTopic("");
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setImage(null);
    navigate("/");
  };

  return (
    <div className="upload-question-container">
      {step === 1 && (
        <div className="upload-selection">
          <h2>Select Details</h2>
          <form
            onSubmit={handleSelectionSubmit}
            className="upload-selection-form"
          >
            <div className="form-group">
              <label htmlFor="grade">Grade:</label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <option value="">Select Grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
                <option value="computer">Computer Science</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <button type="submit">Next</button>
            <Link to="/" className="back-button">
              Back
            </Link>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="upload-question">
          <h2>
            Upload Question for {subject} - {topic} ({grade})
          </h2>
          <form onSubmit={handleUploadSubmit} className="upload-question-form">
            <div className="form-group">
              <label htmlFor="questionText">Question Text:</label>
              <textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image (optional):</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label>Options:</label>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </div>
            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer:</label>
              <input
                type="text"
                id="correctAnswer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                required
              />
            </div>
            <button type="submit">Upload Question</button>
            <button
              type="button"
              className="back-button"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadQuestion;
