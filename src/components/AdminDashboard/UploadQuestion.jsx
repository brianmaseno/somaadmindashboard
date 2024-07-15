import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/UploadQuestion.css";
import axios from "axios";

const UploadQuestion = () => {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

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
    formData.append("correct_answer", correctAnswer);
    if (imageUrl) {
      formData.append("image_url", imageUrl);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload_question`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      alert("Question uploaded successfully!");
      // Clear the form but remain on step 2
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setImageUrl(null);
    } catch (error) {
      console.error(error);
      alert("Failed to upload question. Please try again.");
    }
  };

  const handleRadioChange = (value) => {
    setCorrectAnswer(value);
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
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Computer Science">Computer Science</option>
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
                <div key={index} className="option-container">
                  <div className="option-radio">
                    <input
                      type="radio"
                      name="correct_answer"
                      id={`option-${index}`}
                      checked={correctAnswer === option}
                      onChange={() => handleRadioChange(option)}
                    />
                  </div>
                  <div className="answers">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                  </div>
                </div>
              ))}
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
