import React from "react";
// import "./Navigation.css";
import githubLogo from "../../Images/github-logo.png";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="nav-name">JOHN ALEX</div>
          <div className="nav-domain">
            RUSYNIAK.DEV
            <a
              href="https://github.com/JohnAlexR"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <img src={githubLogo} alt="GitHub" className="github-logo" />
            </a>
          </div>
        </div>
        <a href="mailto:johnalex@rusyniak.dev" className="contact-button">
          CONTACT
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
