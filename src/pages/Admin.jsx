import { useState } from "react";
``;
import UploadQuestion from "../components/AdminDashboard/UploadQuestion";
import ViewQuestions from "../components/AdminDashboard/ViewQuestions";
const Admin = () => {
  const [view, setView] = useState("upload");

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setView("upload")}>Upload Question</button>
      <button onClick={() => setView("view")}>View Questions</button>
      {view === "upload" ? <UploadQuestion /> : <ViewQuestions />}
    </div>
  );
};

export default Admin;
