# John Alex Portfolio

A React-based portfolio website for John Alex Rusyniak, showcasing mobile app development and music projects.

## Features

- **Home Page**: Introduction and contact information
- **About Page**: Personal information about music, outdoors activities, and relationships
- **Projects Page**: Showcase of mobile app development projects (coming soon)
- **Daily Journal**: Learning updates and progress tracking
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with responsive design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd john-alex-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.jsx        # Home page component
│   ├── About.jsx       # About page component
│   ├── Projects.jsx    # Projects page component
│   ├── DailyJournal.jsx # Daily journal component
│   └── Navigation.jsx  # Navigation component
├── App.jsx             # Main App component
├── main.jsx            # React entry point
└── index.css           # Global styles
```

## Customization

- Update content in the component files to modify the website content
- Modify CSS files to change styling
- Add new routes in `App.jsx` for additional pages
- Update images in the `Images/` directory

## Deployment

The site is configured for GitHub Pages deployment. The build output will be in the `dist` directory, which can be deployed to any static hosting service.
