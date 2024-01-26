import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WelcomeMessage from "./pages/menu/WelcomeMessage";
import LevelSelect from "./pages/menu/LevelSelect";
import Landingpage from "./pages/landingpage/Landingpage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Landingpage></Landingpage>} />
      <Route
        exact
        path="welcome"
        element={<WelcomeMessage></WelcomeMessage>}
      ></Route>
      <Route exact path="level" element={<LevelSelect></LevelSelect>}></Route>
      <Route exact path="/play/:level" element={<App></App>} />
    </Routes>
  </Router>
);
