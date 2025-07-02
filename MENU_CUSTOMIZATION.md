# Menu Content Customization Guide

This guide explains how to easily customize the content for each menu item in your portfolio.

## Quick Start

All menu content is now managed in `src/config/menuContent.js`. This makes it easy to update content without touching the main component code.

## File Structure

```
src/
├── config/
│   └── menuContent.js          # Main configuration file
├── components/
│   ├── MenuContent.jsx         # Reusable content component
│   ├── MenuContent.css         # Content-specific styles
│   └── Home.jsx               # Main component (now simplified)
```

## Customizing Menu Items

### 1. Edit Menu Items

Open `src/config/menuContent.js` and modify the `menuItems` array:

```javascript
export const menuItems = [
  {
    id: "websites", // Unique identifier
    name: "Websites", // Menu button text
    title: "Web Development", // Page title
    description: "Custom websites...", // Main description
    details: [
      // Bullet points (optional)
      "React & Next.js Development",
      "Responsive Design",
      // Add more details...
    ],
    image: "/Images/websites-icon.png", // Custom image (optional)
    link: "/websites", // External link (optional)
  },
  // Add more menu items...
];
```

### 2. Available Properties

Each menu item can have these properties:

- **`id`** (required): Unique identifier for the menu item
- **`name`** (required): Text displayed on the menu button
- **`title`** (optional): Large title displayed when selected
- **`description`** (optional): Main description text
- **`details`** (optional): Array of bullet points
- **`image`** (optional): Path to a custom image
- **`link`** (optional): URL for "Learn More" button

### 3. Adding New Menu Items

To add a new menu item:

1. Add a new object to the `menuItems` array in `menuContent.js`
2. Include at least `id` and `name` properties
3. Optionally add `title`, `description`, `details`, `image`, and `link`

Example:

```javascript
{
  id: "blog",
  name: "Blog",
  title: "My Blog",
  description: "Thoughts on development and technology.",
  details: [
    "Technical Articles",
    "Tutorial Posts",
    "Industry Insights"
  ],
  link: "https://myblog.com"
}
```

### 4. Customizing Default Content

Modify the `defaultContent` object to change the content shown when no menu item is selected:

```javascript
export const defaultContent = {
  tagline: "FREELANCE DEVELOPMENT",
  subtitle: "Web • Mobile • Marketing • Music",
  description: "Full-stack development and creative services.",
  controls: "WASD ← → OR CLICK TO SELECT",
};
```

### 5. Customizing State Content

Modify the `stateContent` object to change content for different states:

```javascript
export const stateContent = {
  initial: {
    tagline: "Welcome to my portfolio",
    controls: "Use WASD to navigate",
  },
  falling: {
    tagline: "Loading menu...",
    controls: "Please wait",
  },
};
```

## Adding Custom Images

1. Place your images in the `Images/` directory
2. Reference them in the menu item configuration:
   ```javascript
   image: "/Images/your-image.png";
   ```

## Styling Customization

### Menu Content Styles

Edit `src/components/MenuContent.css` to customize:

- Text colors and fonts
- Layout and spacing
- Button styles
- Responsive behavior

### Menu Button Styles

Edit `src/components/Home.css` to customize:

- Menu button appearance
- Hover effects
- Selection states

## Benefits of This System

1. **Easy Updates**: Change content without touching component logic
2. **Consistent Structure**: All menu items follow the same format
3. **Reusable Components**: MenuContent component can be used elsewhere
4. **Maintainable**: Clear separation between content and presentation
5. **Extensible**: Easy to add new features like images, links, etc.

## Example: Complete Menu Item

```javascript
{
  id: "websites",
  name: "Websites",
  title: "Web Development Services",
  description: "I create modern, responsive websites and web applications using cutting-edge technologies.",
  details: [
    "React & Next.js Development",
    "Responsive Design & Mobile-First",
    "Performance Optimization",
    "SEO & Accessibility",
    "E-commerce Solutions",
    "API Development & Integration"
  ],
  image: "/Images/web-development.png",
  link: "https://example.com/websites"
}
```

This will display:

- "Websites" as the menu button
- A detailed page with title, description, bullet points
- An optional image
- A "Learn More →" button that links to the specified URL
