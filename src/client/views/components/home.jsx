import { Link } from 'react-router-dom';
import "./home.css"

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="logo-container">
          <div className="logo-text keep">Keep</div>
          <div className="logo-text time">Time</div>
        </div>
        <div className="home-buttons">
          <Link to="/login" className="home-button">
            Login
          </Link>
          <Link to="/register" className="home-button">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;