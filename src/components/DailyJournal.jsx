import React from "react";
import "./DailyJournal.css";

function DailyJournal() {
  return (
    <div className="daily-journal">
      <div className="journal_main">
        <div className="journal_intro">
          <div className="journal_intro_img">
            <img
              src="/Images/me.jpg"
              alt="John Alex"
              className="journal_intro_img"
            />
          </div>
          <div className="journal_intro_text">
            <h2>Daily Journal</h2>
            <p>Daily and weekly updates on what I'm learning.</p>
          </div>
        </div>
        <div className="journal_text">
          <h3 className="underline">3/28</h3>
          <p>
            With two weeks left at Content Cucumber, I've been making daily
            progress on both The Odin Project and Scrimba. Then, each night I
            take what I learned there and translate it to this site.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyJournal;
