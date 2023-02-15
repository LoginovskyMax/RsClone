import { useNavigate } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-bg">
          <div />
          <div />
          <div />
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <button className="button" onClick={() => navigate(`/`)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
