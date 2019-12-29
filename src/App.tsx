import React from "react";
import Map from "./screens/Map";
import Home from "./screens/Home";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <Router>
      <Home path="/" />
      <Map path="/map" />
    </Router>
  );
};

export default App;
