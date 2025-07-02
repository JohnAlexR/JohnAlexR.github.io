import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import MenuContent from "./MenuContent";
import { menuItems, defaultContent, stateContent } from "../config/menuContent";
import idleImage from "../../Images/Idle.png";
import jumping1Image from "../../Images/jumping_1.png";
import jumping2Image from "../../Images/jumping_2.png";
import jumping3Image from "../../Images/jumping_3.png";
import landingImage from "../../Images/landing.png";
import walking1Image from "../../Images/walking_1.png";
import walking2Image from "../../Images/walking_2.png";
import walking3Image from "../../Images/walking_3.png";
import walking4Image from "../../Images/walking_4.png";
import walking5Image from "../../Images/walking_5.png";

function Home() {
  const [characterPosition, setCharacterPosition] = useState(35); // Position below waving image
  const [isJumping, setIsJumping] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0); // 0-3 for the 4 jump frames
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // Start with no selection
  const [hasStarted, setHasStarted] = useState(false); // Track if user has started moving
  const [isFalling, setIsFalling] = useState(false); // Track falling animation state
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0); // 0-4 for the 5 walk frames
  const [isCharacterHidden, setIsCharacterHidden] = useState(false);

  // Physics state
  const velocity = useRef(0);
  const targetVelocity = useRef(0);
  const isMovingLeft = useRef(false);
  const isMovingRight = useRef(false);
  const lastDirection = useRef("right"); // Track last movement direction
  const hasStartedRef = useRef(false); // Track started state with ref
  const walkIntervalRef = useRef(null); // Track walking animation interval

  // Physics constants
  const ACCELERATION = 0.8; // How fast the character accelerates
  const FRICTION = 0.85; // How much the character slows down (0-1)
  const MAX_SPEED = 0.6; // Maximum movement speed
  const JUMP_VELOCITY = -2.5; // Initial upward velocity for jump
  const GRAVITY = 0.15; // How fast the character falls

  const lastMoveTime = useRef(0);
  const moveCooldown = 100; // 100ms cooldown between moves

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
    walking4Image, // Frame 3: Step 4
    walking5Image, // Frame 4: Step 5
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
    // Find the full menu item object from configuration
    const fullMenuItem = menuItems.find((item) => item.id === menuItem.id);
    setSelectedMenuItem(fullMenuItem);
    console.log(`Selected: ${fullMenuItem.name}`);
    // Add your navigation logic here
  };

  const handleMouseMenuItemSelect = (menuItem) => {
    // Find the full menu item object from configuration
    const fullMenuItem = menuItems.find((item) => item.id === menuItem.id);
    setSelectedMenuItem(fullMenuItem);
    console.log(`Selected via mouse: ${fullMenuItem.name}`);

    // If selecting from initial state, skip falling and set hasStarted
    if (!hasStarted && !isFalling) {
      console.log("Skipping falling animation, setting hasStarted to true");
      setHasStarted(true);
      hasStartedRef.current = true;
    }

    // Hide character when selected via mouse
    setIsCharacterHidden(true);
    setIsWalking(false);
    setIsJumping(false);
    setIsLanding(false);
    setWalkFrame(0);
    setJumpFrame(0);
  };

  // Jump animation sequence
  const startJumpAnimation = () => {
    console.log("Starting jump animation");
    setJumpFrame(0);

    // Stop walking animation during jump
    setIsWalking(false);

    // Frame 1: Initial jump (0-150ms)
    setTimeout(() => setJumpFrame(1), 150);

    // Frame 2: Mid-air (150-300ms)
    setTimeout(() => setJumpFrame(2), 300);

    // End jump animation (300-450ms)
    setTimeout(() => {
      // Show landing frame with more pronounced effect
      setJumpFrame(3);
      setIsLanding(true);

      // Check for movement during landing and transition faster if moving
      const checkMovementDuringLanding = () => {
        if (isMovingLeft.current || isMovingRight.current) {
          console.log(
            "Movement detected during landing, transitioning to walking"
          );
          setIsJumping(false);
          setIsLanding(false);
          setJumpFrame(0); // Return to idle
          setIsWalking(true);
        } else {
          // No movement, complete full landing animation
          setTimeout(() => {
            console.log("Jump animation complete");
            setIsJumping(false);
            setIsLanding(false);
            setJumpFrame(0); // Return to idle
          }, 1000); // Show landing for 1000ms - shorter landing effect
        }
      };

      // Check for movement after a short delay (300ms instead of 1000ms)
      setTimeout(checkMovementDuringLanding, 300);
    }, 450);
  };

  // Falling animation from waving to menu
  const startFallingAnimation = () => {
    console.log("Starting falling animation");
    setIsFalling(true);
    setIsLanding(false); // Ensure landing is cleared
    setJumpFrame(2); // Start with jumping_2 frame

    // After 1000ms, land on menu and set hasStarted to true
    setTimeout(() => {
      console.log("Falling animation complete, setting hasStarted to true");
      setIsFalling(false);
      setIsLanding(false); // Ensure landing is cleared
      setHasStarted(true);
      hasStartedRef.current = true; // Set ref as well
      setJumpFrame(0); // Return to idle
    }, 1000);
  };

  // Walking animation sequence
  const startWalkingAnimation = () => {
    console.log("startWalkingAnimation called, isWalking:", isWalking);
    if (!isWalking) {
      console.log("Starting walking animation");
      setIsWalking(true);
      setWalkFrame(0);

      // Cycle through walking frames
      const walkInterval = setInterval(() => {
        console.log("Interval triggered, current walkFrame:", walkFrame);
        setWalkFrame((prev) => {
          const newFrame = (prev + 1) % 5;
          console.log("Walking frame updated from", prev, "to", newFrame);
          return newFrame;
        });
      }, 200); // Change frame every 200ms

      console.log("Interval created:", walkInterval);
      return walkInterval;
    }
    return null;
  };

  // Stop walking animation
  const stopWalkingAnimation = () => {
    if (isWalking) {
      console.log("Stopping walking animation");
      setIsWalking(false);
      setWalkFrame(0);
    }
  };

  // Physics update loop
  useEffect(() => {
    let animationId;

    const updatePhysics = () => {
      // Update horizontal movement
      if (isMovingLeft.current) {
        targetVelocity.current = -MAX_SPEED;
        // Start walking animation if not already walking
        if (!isWalking && hasStarted) {
          console.log("Starting walking (left)");
          setIsWalking(true);
        }
      } else if (isMovingRight.current) {
        targetVelocity.current = MAX_SPEED;
        // Start walking animation if not already walking
        if (!isWalking && hasStarted) {
          console.log("Starting walking (right)");
          setIsWalking(true);
        }
      } else {
        targetVelocity.current = 0;
        // Stop walking animation
        if (isWalking) {
          console.log("Stopping walking");
          setIsWalking(false);
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
    };
  }, [isWalking, hasStarted]);

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

        // Show character if it was hidden by mouse selection
        if (isCharacterHidden) {
          console.log("Showing character after movement key press");
          setIsCharacterHidden(false);
        }

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
            console.log("Jump key pressed, isJumping:", isJumping);
            if (!isJumping) {
              console.log("Starting jump");
              setIsJumping(true);
              startJumpAnimation();
            } else {
              console.log("Already jumping, ignoring jump key");
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
      currentMenuItem.id !== selectedMenuItem?.id &&
      !isCharacterHidden // Don't auto-select if character was hidden by mouse selection
    ) {
      handleMenuItemSelect(currentMenuItem);
    }
  }, [currentMenuItem, hasStarted, isCharacterHidden]);

  // Debug walkFrame changes
  useEffect(() => {
    console.log("walkFrame changed to:", walkFrame);
  }, [walkFrame]);

  // Separate walking animation effect
  useEffect(() => {
    let walkInterval = null;

    if (isWalking && hasStarted) {
      console.log("Walking effect triggered - starting interval");
      setWalkFrame(0);

      walkInterval = setInterval(() => {
        console.log("Walking interval triggered");
        setWalkFrame((prev) => {
          const newFrame = (prev + 1) % 5;
          console.log("Walking frame updated from", prev, "to", newFrame);
          return newFrame;
        });
      }, 200);
    } else if (!isWalking) {
      console.log("Walking effect triggered - clearing interval");
      clearInterval(walkInterval);
    }

    return () => {
      if (walkInterval) {
        console.log("Walking effect cleanup - clearing interval");
        clearInterval(walkInterval);
      }
    };
  }, [isWalking, hasStarted]);

  // Determine which image to show
  const getCharacterImage = () => {
    if (isFalling) {
      return jumping2Image; // Show jumping_2 during falling
    } else if (isJumping) {
      return jumpFrames[jumpFrame];
    } else if (isLanding) {
      return landingImage; // Show landing image during landing
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
        <MenuContent
          selectedMenuItem={selectedMenuItem}
          defaultContent={defaultContent}
          stateContent={stateContent}
          currentState={
            !hasStarted && !isFalling
              ? "initial"
              : isFalling
              ? "falling"
              : "default"
          }
        />
      </div>
      <div className="bottom-menu">
        {(hasStarted || isFalling) && !isCharacterHidden && (
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
              hasStarted &&
              currentMenuItem?.id === item.id &&
              !isCharacterHidden
                ? "highlighted"
                : ""
            } ${selectedMenuItem?.id === item.id ? "selected" : ""}`}
            onClick={() => {
              handleMouseMenuItemSelect(item);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
