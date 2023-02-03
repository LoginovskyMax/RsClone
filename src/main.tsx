import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);
