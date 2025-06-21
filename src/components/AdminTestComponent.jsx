// Simple test script to verify the adminTest routes
import React, { useState, useEffect } from 'react';

export default function AdminTestComponent() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching questions...");
        const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
        const response = await fetch(`${BASE_URL}/admin-test/questions`);
        const data = await response.json();
        
        console.log("Response:", data);
        
        if (data.success) {
          setQuestions(data.data.questions);
        } else {
          setError("API returned error: " + (data.error || "Unknown error"));
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div>Loading questions from admin-test endpoint...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Admin Test Questions</h1>
      <p>Found {questions.length} questions</p>
      <ul>
        {questions.map(q => (
          <li key={q._id}>
            <strong>{q.question || "No question text"}</strong>
            <br />
            Options: {q.options?.join(", ") || "No options"}
            <br />
            Correct: {q.correct_answer !== undefined ? q.correct_answer : "Not specified"}
          </li>
        ))}
      </ul>
    </div>
  );
}
