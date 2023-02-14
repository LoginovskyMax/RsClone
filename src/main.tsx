import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Loading from "./Components/Loading/Lodaing";
import PopupMessage from "./Components/Message/PopMessage";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Loading />
      <PopupMessage />
      <Header />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);
