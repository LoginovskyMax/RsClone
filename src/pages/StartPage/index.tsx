import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Vite + React </h1>
      <button onClick={() => navigate("/")}> Login </button>
      <button onClick={() => navigate("/main")}> Main</button>
    </>
  );
};

export default StartPage;
