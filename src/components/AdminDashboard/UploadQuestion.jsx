import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/UploadQuestion.css";
import axios from "axios";

const UploadQuestion = () => {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct_answer, setCorrectAnswer] = useState("");
  const [image_url, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSelectionSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("grade", grade);
    formData.append("subject", subject);
    formData.append("topic", topic);
    formData.append("question", question);
    formData.append("options", JSON.stringify(options));
    formData.append("correct_answer", correct_answer);
    if (image_url) {
        formData.append("file", image_url);
    }

    console.log({
        grade,
        subject,
        topic,
        question,
        options,
        correct_answer,
        image_url,
    });

    try {
        const response = await axios.post(
            "http://localhost:3000/upload_question",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(response);
        navigate("/");
    } catch (error) {
        console.error(error);
    }

    // Clear the form
    setGrade("");
    setSubject("");
    setTopic("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setImageUrl(null);
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
                <option value="math">Mathematics</option>
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
              <label htmlFor="question">Question Text:</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image_url">Image (optional):</label>
              <input
                type="file"
                id="image_url"
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
              <label htmlFor="correct_answer">Correct Answer:</label>
              <input
                type="text"
                id="correct_answer"
                value={correct_answer}
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
