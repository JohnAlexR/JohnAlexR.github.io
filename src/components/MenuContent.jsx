import React from "react";
// import "./MenuContent.css";

const MenuContent = ({
  selectedMenuItem,
  defaultContent,
  stateContent,
  currentState,
}) => {
  // Render content based on current state
  if (currentState === "initial") {
    return (
      <div className="image-text-container">
        <div className="image-section">
          <img src="/Images/waving.png" alt="Waving" className="waving-image" />
        </div>
        <div className="text-section">
          <div className="tagline">{stateContent.initial.tagline}</div>
          <div className="controls mobile-hide">
            {stateContent.initial.controls}
          </div>
        </div>
      </div>
    );
  }

  if (currentState === "falling") {
    return (
      <div className="image-text-container">
        <div className="text-section">
          <div className="tagline">{stateContent.falling.tagline}</div>
          <div className="controls mobile-hide">
            {stateContent.falling.controls}
          </div>
        </div>
      </div>
    );
  }

  // Render selected menu item content
  if (selectedMenuItem) {
    return (
      <div className="selected-menu-content">
        <div className="menu-title">{selectedMenuItem.title}</div>
        <div className="menu-description">{selectedMenuItem.description}</div>

        {selectedMenuItem.details && selectedMenuItem.details.length > 0 && (
          <div className="menu-details">
            <ul className="details-list">
              {selectedMenuItem.details.map((detail, index) => (
                <li key={index} className="detail-item">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedMenuItem.image && (
          <div className="menu-image">
            <img
              src={selectedMenuItem.image}
              alt={selectedMenuItem.name}
              className="content-image"
            />
          </div>
        )}

        {selectedMenuItem.link && (
          <div className="menu-action">
            <a
              href={selectedMenuItem.link}
              className="menu-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          </div>
        )}
      </div>
    );
  }

  // Render default content when no menu item is selected
  return (
    <div className="image-text-container">
      <div className="image-section">
        <img src="/Images/waving.png" alt="Waving" className="waving-image" />
      </div>
      <div className="text-section">
        <div className="tagline">{defaultContent.tagline}</div>
        {defaultContent.subtitle && (
          <div className="subtitle">{defaultContent.subtitle}</div>
        )}
        {defaultContent.description && (
          <div className="description">{defaultContent.description}</div>
        )}
        <div className="controls mobile-hide">{defaultContent.controls}</div>
      </div>
    </div>
  );
};

export default MenuContent;
