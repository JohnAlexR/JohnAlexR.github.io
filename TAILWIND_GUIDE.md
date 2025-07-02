# Tailwind CSS Setup Guide

## ✅ Installation Complete

Tailwind CSS has been successfully installed and configured in your React + Vite project!

## What's Been Set Up

1. **Dependencies installed:**

   - `tailwindcss` - The core framework (v4)
   - `@tailwindcss/postcss` - PostCSS plugin for Tailwind v4
   - `postcss` - CSS processing
   - `autoprefixer` - Vendor prefixing

2. **Configuration files created:**

   - `tailwind.config.js` - Tailwind configuration
   - `postcss.config.js` - PostCSS configuration

3. **CSS updated:**
   - Added Tailwind directives to `src/index.css`

## How to Use Tailwind CSS

### Basic Classes

You can now use Tailwind utility classes directly in your JSX:

```jsx
// Text styling
<h1 className="text-4xl font-bold text-blue-900">Large Blue Heading</h1>
<p className="text-lg text-gray-700">Medium gray paragraph</p>

// Spacing
<div className="p-4 m-2">Padding and margin</div>

// Layout
<div className="flex justify-center items-center">Centered flex container</div>

// Colors
<button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Blue Button
</button>
```

### Common Utility Classes

#### Spacing

- `p-4` - padding: 1rem
- `m-2` - margin: 0.5rem
- `px-4` - horizontal padding
- `py-2` - vertical padding

#### Typography

- `text-2xl` - large text
- `font-bold` - bold font weight
- `text-center` - center align text
- `text-blue-600` - blue text color

#### Layout

- `flex` - display: flex
- `grid` - display: grid
- `justify-center` - justify-content: center
- `items-center` - align-items: center

#### Colors

- `bg-blue-500` - blue background
- `text-white` - white text
- `border-gray-300` - gray border

#### Responsive Design

- `md:flex` - flex on medium screens and up
- `lg:text-2xl` - large text on large screens

### Mixing with Existing CSS

You can use Tailwind classes alongside your existing CSS classes:

```jsx
<div className="home-body bg-gradient-to-r from-blue-400 to-purple-500">
  <h1 className="header-title text-white">Your existing class + Tailwind</h1>
</div>
```

## Development Server

Run your development server to see Tailwind in action:

```bash
npm run dev
```

## Documentation

- [Tailwind CSS Official Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

## Customization

You can customize Tailwind by editing `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#020057",
      },
      fontFamily: {
        shanti: ["Shanti", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

Happy coding with Tailwind CSS! 🎨
