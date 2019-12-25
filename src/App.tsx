import React from "react";
import Home from "./screens/Home";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
};

export default App;
