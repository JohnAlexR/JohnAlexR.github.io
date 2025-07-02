import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import idleImage from "../../Images/Idle.png";
import jumping1Image from "../../Images/jumping_1.png";
import jumping2Image from "../../Images/jumping_2.png";
import jumping3Image from "../../Images/jumping_3.png";
import landingImage from "../../Images/landing.png";

function Home() {
  const [characterPosition, setCharacterPosition] = useState(50); // 50% is center
  const [isJumping, setIsJumping] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0); // 0-3 for the 4 jump frames
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // Physics state
  const velocity = useRef(0);
  const targetVelocity = useRef(0);
  const isMovingLeft = useRef(false);
  const isMovingRight = useRef(false);
  const lastDirection = useRef("right"); // Track last movement direction

  // Physics constants
  const ACCELERATION = 0.8; // How fast the character accelerates
  const FRICTION = 0.85; // How much the character slows down (0-1)
  const MAX_SPEED = 0.6; // Maximum movement speed
  const JUMP_VELOCITY = -2.5; // Initial upward velocity for jump
  const GRAVITY = 0.15; // How fast the character falls

  const lastMoveTime = useRef(0);
  const moveCooldown = 100; // 100ms cooldown between moves

  const menuItems = [
    { id: "websites", name: "Websites" },
    { id: "mobile-apps", name: "Mobile Apps" },
    { id: "marketing", name: "Marketing" },
    { id: "music", name: "Music" },
  ];

  // Jump animation frames
  const jumpFrames = [
    jumping1Image, // Frame 0: Initial jump
    jumping2Image, // Frame 1: Mid-air
    jumping3Image, // Frame 2: Peak of jump
    landingImage, // Frame 3: Landing
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

  // Jump animation sequence
  const startJumpAnimation = () => {
    setJumpFrame(0);

    // Frame 1: Initial jump (0-200ms)
    setTimeout(() => setJumpFrame(1), 200);

    // Frame 2: Mid-air (200-400ms)
    setTimeout(() => setJumpFrame(2), 400);

    // End jump animation (400-600ms)
    setTimeout(() => {
      // Show landing frame with more pronounced effect
      setJumpFrame(3);
      setIsLanding(true);
      setTimeout(() => {
        setIsJumping(false);
        setIsLanding(false);
        setJumpFrame(0); // Return to idle
      }, 1500); // Show landing for 1500ms - much longer landing effect
    }, 600);
  };

  // Physics update loop
  useEffect(() => {
    let animationId;

    const updatePhysics = () => {
      // Update horizontal movement
      if (isMovingLeft.current) {
        targetVelocity.current = -MAX_SPEED;
      } else if (isMovingRight.current) {
        targetVelocity.current = MAX_SPEED;
      } else {
        targetVelocity.current = 0;
      }

      // Apply acceleration towards target velocity
      const velocityDiff = targetVelocity.current - velocity.current;
      velocity.current += velocityDiff * ACCELERATION;

      // Apply friction when not actively moving
      if (!isMovingLeft.current && !isMovingRight.current) {
        velocity.current *= FRICTION;
      }

      // Update position
      setCharacterPosition((prev) => {
        const newPosition = prev + velocity.current;
        return Math.max(0, Math.min(100, newPosition));
      });

      // Stop very small movements
      if (Math.abs(velocity.current) < 0.01) {
        velocity.current = 0;
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "a":
        case "arrowleft":
          isMovingLeft.current = true;
          lastDirection.current = "left";
          break;
        case "d":
        case "arrowright":
          isMovingRight.current = true;
          lastDirection.current = "right";
          break;
        case "w":
        case "arrowup":
          if (!isJumping) {
            setIsJumping(true);
            startJumpAnimation();
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
          isMovingLeft.current = false;
          break;
        case "d":
        case "arrowright":
          isMovingRight.current = false;
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
  }, []);

  const currentMenuItem = getCurrentMenuItem();

  // Determine which image to show
  const getCharacterImage = () => {
    if (isJumping) {
      return jumpFrames[jumpFrame];
    }
    return idleImage;
  };

  // Determine if character should be flipped
  const shouldFlipCharacter = () => {
    return lastDirection.current === "left";
  };

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
          className={`menu-character ${isJumping ? "jumping" : ""} ${
            isLanding ? "landing" : ""
          }`}
          style={{ left: `${characterPosition}%` }}
        >
          <img
            src={getCharacterImage()}
            alt="Character"
            className="character-image"
            style={{
              transform: shouldFlipCharacter() ? "scaleX(-1)" : "scaleX(1)",
            }}
          />
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
