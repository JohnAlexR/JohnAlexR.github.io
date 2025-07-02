import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="main-about">
        <h1>About me</h1>
      </div>
      <div className="about-section">
        <div className="music-about">
          <div className="img-music-about hover1">
            <img src="/Images/band.jpeg" alt="Band" />
            <img src="/Images/clyde.jpg" alt="Clyde" />
          </div>
          <div className="text-about">
            <h2>Music!</h2>
            <div className="text-about-sub">
              <p>
                I'm in a retro pop and soul band based in Bloomington Indiana,
                called Six Foot Blonde. Check us out{" "}
                <a
                  href="https://open.spotify.com/artist/221FT80tDz6lzvz4U1ySSe?si=O1-uVPb7QdubE1u5JJ0s2g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="outdoors-about">
          <div className="img-outdoors-about hover1">
            <img src="/Images/Outdoors.jpg" alt="me snowboarding" />
          </div>
          <div className="text-about">
            <h2>Outdoors!</h2>
            <div className="text-about-sub">
              <p>I'm an avid climber, biker, and snowboarder.</p>
            </div>
          </div>
        </div>
        <div className="lucy-about">
          <div className="img-lucy-about hover1">
            <img src="/Images/Lucy.jpg" alt="Lucy" />
            <img src="/Images/lucytwo.jpeg" alt="Lucy two" />
          </div>
          <div className="text-about">
            <h2>Lucy!</h2>
            <div className="text-about-sub">
              <p>I also have a kickass girlfriend.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
