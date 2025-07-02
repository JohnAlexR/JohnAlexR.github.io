import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="main-content">
        <div className="image-text-container">
          <div className="image-section">
            <img
              src="/Images/waving.png"
              alt="Waving"
              className="waving-image"
            />
          </div>
          <div className="text-section">
            <div className="tagline">TAGLINE PLACEHOLDER</div>
            <div className="controls">WASD &lt;- -&gt; OR CLICK TO SELECT</div>
          </div>
        </div>
      </div>
      <div className="bottom-menu">
        <div className="menu-item">Websites</div>
        <div className="menu-item">Mobile Apps</div>
        <div className="menu-item">Marketing</div>
        <div className="menu-item">Music</div>
      </div>
    </div>
  );
}

export default Home;
