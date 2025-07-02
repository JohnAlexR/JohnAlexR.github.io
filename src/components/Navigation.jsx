import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="nav-name">JOHN ALEX</div>
          <div className="nav-domain">RUSYNIAK.DEV</div>
        </div>
        <button className="contact-button">CONTACT</button>
      </div>
    </nav>
  );
}

export default Navigation;
