import React from "react";
import "./services.css";
import CodingLogo from "../../assets/coding.svg";
import InterviewLogo from "../../assets/interview.svg";
import LearningLogo from "../../assets/learning.svg";
import ScripttipLogo from "../../assets/scripttip.svg";

function Services() {
  return (
    <div className="services">
      <div className="services__header">
        <h1>What we provide</h1>
        <hr className="services__hr" />
      </div>
      <div className="services__body">
        <div>
          <h2>Learning</h2>
          <img src={LearningLogo} className="services__logo" />
          <h3>JS ES6 E-Learning</h3>
          <p>From Fundamentals to Advanced</p>
        </div>
        <div>
          <h2>Documentation</h2>
          <img src={CodingLogo} className="services__logo" />
          <h3>Interactive Documentation</h3>
          <p>Documentation examples where the user test their code</p>
        </div>
        <div>
          <h2>Tips</h2>
          <img src={ScripttipLogo} className="services__logo" />
          <h3>The ScriptTip Room</h3>
          <p>Common Development problems with their solution</p>
        </div>
        <div>
          <h2>Interview Practice</h2>
          <img src={InterviewLogo} className="services__logo" />
          <h3>Technical Interview Practice</h3>
          <p>Technical Interview questions for everyone to practice on</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
