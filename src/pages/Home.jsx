import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <Link to="/admin">Go to Admin Dashboard</Link>
    </div>
  );
};

export default Home;
