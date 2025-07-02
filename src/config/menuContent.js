// Menu content configuration
// This file makes it easy to customize the content for each menu item

export const menuItems = [
  {
    id: "websites",
    name: "Websites",
    title: "Web Development",
    description: "Custom websites and web applications",
    details: [
      "React Development",
      "Web Design",
      "SEO",
      "Shopify & Squarespace",
      "Wix, Wordpress, Webflow",
    ],
    // image: "/Images/websites-icon.png", // Optional: add custom images
    // link: "/websites", // Optional: add navigation links
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications",
    details: [
      "Custom React Native Builds",
      "iOS & Android Apps",
      "App Store Optimization",
    ],
    // image: "/Images/mobile-icon.png",
    // link: "/mobile-apps",
  },
  {
    id: "marketing",
    name: "Marketing",
    title: "Digital Marketing",
    description: "Custom marketing",
    details: [
      "Facebook Ads",
      "SEO and Content Strategy",
      "Email Campaigns and Copywriting",
      "Analytics and Reporting",
      "Playlisting",
    ],
    // image: "/Images/marketing-icon.png",
    // link: "/marketing",
  },
  {
    id: "music",
    name: "Music",
    title: "Music Production",
    description: "Touring Keys/Saxophone, producer, and sound designer",
    details: [
      "Songwriting",
      "Session Work",
      "Production",
      "Film & Game Music",
      "Touring",
    ],
    // image: "/Images/music-icon.png",
    // link: "/music",
  },
];

// Default content for when no menu item is selected
export const defaultContent = {
  tagline: "FREELANCE DEVELOPMENT",
  subtitle: "Web • Mobile • Marketing • Music",
  description:
    "Full-stack development and creative services for modern businesses.",
  controls: "WASD ← → OR CLICK TO SELECT",
};

// Content for different states
export const stateContent = {
  initial: {
    tagline: "FREELANCE DEVELOPER AND MUSICIAN",
    controls: "WASD OR ← → OR CLICK TO SELECT",
  },
  falling: {
    tagline: "FALLING TO MENU...",
    controls: "PLEASE WAIT",
  },
};

// Helper function to get menu item by ID
export const getMenuItemById = (id) => {
  return menuItems.find((item) => item.id === id);
};

// Helper function to get all menu items
export const getAllMenuItems = () => {
  return menuItems;
};
