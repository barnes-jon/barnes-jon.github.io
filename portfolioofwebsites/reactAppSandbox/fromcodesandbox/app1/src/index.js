import React from "react";
import ReactDOM from "react-dom";
import "style.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
//import App from "./App";
//import Users from "./users";
//import Contact from "./contact";
//import Notfound from "./notfound";
import Header from "./header";
import Footer from "./footer";
import App from "./App";

const routing = (
  <Router>
    <div>
      <Header />
      <hr />
      <App />
      <Footer />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
