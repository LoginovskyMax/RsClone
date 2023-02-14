import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Header />
    <App />
    <Footer />
  </Router>
);
