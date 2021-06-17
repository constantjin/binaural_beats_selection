import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initTone } from "./utils/beats";

import RegisterPage from "./pages/RegisterPage";
import PreInstruction from "./pages/PreInstruction";
import PreSound from "./pages/PreSound";
import PreRating from "./pages/PreRating";
import BeatsSelector from "./pages/BeatsSelector";
import PostInstruction from "./pages/PostInstruction";
import PostSound from "./pages/PostSound";
import PostRating from "./pages/PostRating";
import End from "./pages/End";

export default function App() {
  const resize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log("resized");
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", () => resize());
    initTone();
  }, []);
  return (
    <div
      className="flex flex-col items-center text-center justify-center h-screen"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Router>
        <Switch>
          <Route path="/" exact component={RegisterPage} />
          <Route path="/pre_inst" exact component={PreInstruction} />
          <Route path="/pre_sound" exact component={PreSound} />
          <Route path="/pre_rating" exact component={PreRating} />
          <Route path="/beats" exact component={BeatsSelector} />
          <Route path="/post_inst" exact component={PostInstruction} />
          <Route path="/post_sound" exact component={PostSound} />
          <Route path="/post_rating" exact component={PostRating} />
          <Route path="/end" exact component={End} />
        </Switch>
      </Router>
    </div>
  );
}
