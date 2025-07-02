import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import idleImage from "../../Images/Idle.png";
import jumping1Image from "../../Images/jumping_1.png";
import jumping2Image from "../../Images/jumping_2.png";
import jumping3Image from "../../Images/jumping_3.png";
import landingImage from "../../Images/landing.png";
import walking1Image from "../../Images/walking_1.png";
import walking2Image from "../../Images/walking_2.png";
import walking3Image from "../../Images/walking_3.png";

function Home() {
  const [characterPosition, setCharacterPosition] = useState(35); // Position below waving image
  const [isJumping, setIsJumping] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0); // 0-3 for the 4 jump frames
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // Start with no selection
  const [hasStarted, setHasStarted] = useState(false); // Track if user has started moving
  const [isFalling, setIsFalling] = useState(false); // Track falling animation state
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0); // 0-2 for the 3 walk frames

  // Physics state
  const velocity = useRef(0);
  const targetVelocity = useRef(0);
  const isMovingLeft = useRef(false);
  const isMovingRight = useRef(false);
  const lastDirection = useRef("right"); // Track last movement direction
  const hasStartedRef = useRef(false); // Track started state with ref

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

  // Walking animation frames
  const walkFrames = [
    walking1Image, // Frame 0: Step 1
    walking2Image, // Frame 1: Step 2
    walking3Image, // Frame 2: Step 3
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

  // Falling animation from waving to menu
  const startFallingAnimation = () => {
    console.log("Starting falling animation");
    setIsFalling(true);
    setIsLanding(false); // Ensure landing is cleared
    setJumpFrame(2); // Start with jumping_2 frame

    // After 1500ms, land on menu and set hasStarted to true
    setTimeout(() => {
      console.log("Falling animation complete, setting hasStarted to true");
      setIsFalling(false);
      setIsLanding(false); // Ensure landing is cleared
      setHasStarted(true);
      hasStartedRef.current = true; // Set ref as well
      setJumpFrame(0); // Return to idle
    }, 1500);
  };

  // Walking animation sequence
  const startWalkingAnimation = () => {
    if (!isWalking) {
      setIsWalking(true);
      setWalkFrame(0);

      // Cycle through walking frames
      const walkInterval = setInterval(() => {
        setWalkFrame((prev) => (prev + 1) % 3);
      }, 200); // Change frame every 200ms

      // Store interval reference to clear it later
      return walkInterval;
    }
  };

  // Physics update loop
  useEffect(() => {
    let animationId;
    let walkInterval = null;

    const updatePhysics = () => {
      // Update horizontal movement
      if (isMovingLeft.current) {
        targetVelocity.current = -MAX_SPEED;
        // Start walking animation if not already walking
        if (!isWalking && hasStartedRef.current) {
          walkInterval = startWalkingAnimation();
        }
      } else if (isMovingRight.current) {
        targetVelocity.current = MAX_SPEED;
        // Start walking animation if not already walking
        if (!isWalking && hasStartedRef.current) {
          walkInterval = startWalkingAnimation();
        }
      } else {
        targetVelocity.current = 0;
        // Stop walking animation
        if (isWalking) {
          setIsWalking(false);
          if (walkInterval) {
            clearInterval(walkInterval);
            walkInterval = null;
          }
        }
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
      if (walkInterval) {
        clearInterval(walkInterval);
      }
    };
  }, [isWalking, hasStartedRef.current]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(
        "Key pressed:",
        event.key,
        "hasStarted:",
        hasStarted,
        "hasStartedRef:",
        hasStartedRef.current,
        "isFalling:",
        isFalling
      );

      // Start falling animation when any movement key is pressed for the first time
      if (
        !hasStartedRef.current &&
        !isFalling &&
        (event.key.toLowerCase() === "a" ||
          event.key.toLowerCase() === "d" ||
          event.key.toLowerCase() === "arrowleft" ||
          event.key.toLowerCase() === "arrowright")
      ) {
        console.log("Triggering falling animation");
        startFallingAnimation();
        return; // Don't process movement until falling is complete
      }

      // Don't allow falling if hasStarted is true
      if (hasStartedRef.current && !isFalling) {
        console.log("Processing normal movement");
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
          case "enter":
            const currentItem = getCurrentMenuItem();
            if (currentItem) {
              handleMenuItemSelect(currentItem);
            }
            break;
          default:
            break;
        }
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

  // Auto-select menu item when character stands on it
  useEffect(() => {
    if (
      hasStarted &&
      currentMenuItem &&
      currentMenuItem.id !== selectedMenuItem?.id
    ) {
      handleMenuItemSelect(currentMenuItem);
    }
  }, [currentMenuItem, hasStarted]);

  // Determine which image to show
  const getCharacterImage = () => {
    if (isFalling) {
      return jumping2Image; // Show jumping_2 during falling
    } else if (isJumping) {
      return jumpFrames[jumpFrame];
    } else if (isWalking) {
      return walkFrames[walkFrame];
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
        {!hasStarted && !isFalling ? (
          // Initial content before game starts
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
              <div className="controls">
                WASD &lt;- -&gt; OR CLICK TO SELECT
              </div>
            </div>
          </div>
        ) : isFalling ? (
          // Falling animation content
          <div className="image-text-container">
            <div className="text-section">
              <div className="tagline">FALLING TO MENU...</div>
              <div className="controls">PLEASE WAIT</div>
            </div>
          </div>
        ) : !selectedMenuItem ? (
          // Default content when no menu item is selected
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
              <div className="controls">
                WASD &lt;- -&gt; OR CLICK TO SELECT
              </div>
            </div>
          </div>
        ) : (
          // Content when a menu item is selected
          <div className="selected-menu-content">
            <div className="menu-title">{selectedMenuItem.name}</div>
            <div className="menu-description">
              Placeholder content for {selectedMenuItem.name.toLowerCase()}
            </div>
          </div>
        )}
      </div>
      <div className="bottom-menu">
        {(hasStarted || isFalling) && (
          <div
            className={`menu-character ${isJumping ? "jumping" : ""} ${
              isLanding ? "landing" : ""
            } ${isFalling ? "falling" : ""} ${isWalking ? "walking" : ""}`}
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
        )}
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`menu-item ${
              hasStarted && currentMenuItem?.id === item.id ? "highlighted" : ""
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
