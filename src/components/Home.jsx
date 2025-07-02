import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="header">
        <div className="header-title">
          <h1 className="center text-4xl font-bold text-blue-900 mb-4">
            John Alex Rusyniak
          </h1>
          <p className="center text-lg text-gray-700 mb-2">
            I build mobile apps, websites, and make music
          </p>
          <p className="center text-gray-600 mb-1">
            johnalex@rusyniak.dev for mobile development
          </p>
          <p className="center text-gray-600 mb-1">sixftblonde.com for music</p>
          <p className="center">
            <a
              href="https://github.com/johnalexrusyniak"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
