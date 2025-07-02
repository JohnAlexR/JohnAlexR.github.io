import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import idleImage from "../../Images/Idle.png";

function Home() {
  const [characterPosition, setCharacterPosition] = useState(50); // 50% is center
  const [isJumping, setIsJumping] = useState(false);
  const [movementDirection, setMovementDirection] = useState(0); // -1 for left, 0 for none, 1 for right
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const lastMoveTime = useRef(0);
  const moveCooldown = 100; // 100ms cooldown between moves

  const menuItems = [
    { id: "websites", name: "Websites" },
    { id: "mobile-apps", name: "Mobile Apps" },
    { id: "marketing", name: "Marketing" },
    { id: "music", name: "Music" },
  ];

  const canMove = () => {
    const now = Date.now();
    if (now - lastMoveTime.current >= moveCooldown) {
      lastMoveTime.current = now;
      return true;
    }
    return false;
  };

  // Calculate which menu item the character is standing on
  const getCurrentMenuItem = () => {
    const menuWidth = 100; // Total width is 100%
    const itemWidth = menuWidth / menuItems.length; // Each item takes equal width

    for (let i = 0; i < menuItems.length; i++) {
      const itemStart = i * itemWidth;
      const itemEnd = (i + 1) * itemWidth;

      if (characterPosition >= itemStart && characterPosition < itemEnd) {
        return menuItems[i];
      }
    }
    return null;
  };

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
    console.log(`Selected: ${menuItem.name}`);
    // Add your navigation logic here
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "a":
        case "arrowleft":
          if (canMove()) {
            setMovementDirection(-1);
            setCharacterPosition((prev) => Math.max(0, prev - 4)); // Move left, minimum 0%
          }
          break;
        case "d":
        case "arrowright":
          if (canMove()) {
            setMovementDirection(1);
            setCharacterPosition((prev) => Math.min(100, prev + 4)); // Move right, maximum 100%
          }
          break;
        case "w":
        case "arrowup":
          if (!isJumping) {
            setIsJumping(true);
            setTimeout(() => {
              setIsJumping(false);
              // Reset movement direction to prevent sudden movement after landing
              setTimeout(() => setMovementDirection(0), 50);
            }, 600); // Jump duration
          }
          break;
        case " ":
        case "enter":
          const currentItem = getCurrentMenuItem();
          if (currentItem) {
            handleMenuItemSelect(currentItem);
          }
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case "a":
        case "arrowleft":
          if (movementDirection === -1) {
            setMovementDirection(0);
          }
          break;
        case "d":
        case "arrowright":
          if (movementDirection === 1) {
            setMovementDirection(0);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping, movementDirection]);

  // Continue movement during jump
  useEffect(() => {
    let jumpInterval;
    if (isJumping && movementDirection !== 0) {
      jumpInterval = setInterval(() => {
        setCharacterPosition((prev) => {
          if (movementDirection === -1) {
            return Math.max(0, prev - 1.5); // Consistent movement during jump
          } else if (movementDirection === 1) {
            return Math.min(100, prev + 1.5); // Consistent movement during jump
          }
          return prev;
        });
      }, 25); // Update more frequently for smoother movement
    }

    return () => {
      if (jumpInterval) {
        clearInterval(jumpInterval);
      }
    };
  }, [isJumping, movementDirection]);

  const currentMenuItem = getCurrentMenuItem();

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
        <div
          className={`menu-character ${isJumping ? "jumping" : ""}`}
          style={{ left: `${characterPosition}%` }}
        >
          <img src={idleImage} alt="Character" className="character-image" />
        </div>
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`menu-item ${
              currentMenuItem?.id === item.id ? "highlighted" : ""
            } ${selectedMenuItem?.id === item.id ? "selected" : ""}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
