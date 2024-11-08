# UI/UX Documentation - GPU Comparison Website

## Project Overview
The GPU Comparison Website is designed to help users compare different graphics cards and make informed decisions. The site features a modern, responsive design with accessibility features and dynamic theming support.

## Site Structure
```
├── Home Page (index.html)
│   ├── Hero Section
│   ├── GPU Cards Grid
│   └── Features Section
├── GPU Comparison (sub.html)
│   ├── Comparison Cards
│   ├── Specifications Table
│   └── Performance Charts
└── Changes & Accessibility (changes.html)
    ├── Content Size Controls
    ├── Accessibility Features
    └── Technical Improvements
```

## Design Components

### Navigation & Theme
- Consistent navigation bar across all pages
- Dynamic theme switcher (light/dark modes)
- Responsive menu with active state indicators
- Unified branding with GPU Comparison logo

### Typography & Colors
**Color Scheme:**
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --accent-color: #3498db;
  --text-color: #2c3e50;
  --background-color: #ecf0f1;
}

:root.dark {
  --primary-color: #1b1b1b;
  --secondary-color: #333333;
  --accent-color: #3498db;
  --text-color: #f5f5f5;
  --background-color: #121212;
}
```

### Responsive Design
Enhanced breakpoints beyond requirements for smoother transitions:
1. Mobile (≤550px)
   - Single column layout
   - Condensed navigation
   - Font size: 14px

2. Small Tablets (551px-700px)
   - Two column grid
   - Font size: 14.5px

3. Tablets (701px-850px)
   - Enhanced grid layout
   - Font size: 15px

4. Large Tablets (851px-900px)
   - Optimized spacing
   - Font size: 15.5px

5. Small Desktops (901px-1250px)
   - Three column grid
   - Font size: 16px

6. Medium Desktops (1251px-1300px)
   - Enhanced readability
   - Font size: 16.5px

7. Large Desktops (1301px-1400px)
   - Optimized large screen layout
   - Font size: 17px

8. Extra Large (≥1401px)
   - Maximum width container
   - Font size: 18px

## Features Implementation

### GPU Cards (Home Page)
- Card-based design with hover effects
- Key specifications preview
- Direct comparison links
- Shadow and transform animations

### Comparison Tools
```javascript
// Performance metrics displayed using Chart.js
{
    gaming4k: 100,
    gaming1440p: 100,
    mining: 95,
    rendering: 100
}
```

### Accessibility Features
1. Content Size Controls (changes.html):
   - Button controls
   - Keyboard shortcuts (Shift + 1/2/3)
   - Size dropdown menu
   ```javascript
   const sizes = {
     small: { text: '14px', heading: '24px' },
     medium: { text: '16px', heading: '28px' },
     large: { text: '18px', heading: '32px' }
   }
   ```

2. Theme Support:
   - Light/Dark mode toggle
   - High contrast options
   - System preference detection
   ```javascript
   window.matchMedia('(prefers-color-scheme: dark)')
   ```

## Framework Implementation
- Bootstrap 5 components in changes.html
- Custom Flexbox/Grid implementation in index.html and sub.html

## Technical Features
1. Dynamic CSS Loading:
   ```javascript
   loadCSSForResolution()
   ```

2. Local Storage for User Preferences:
   ```javascript
   localStorage.setItem('theme', isDark ? 'dark' : 'light')
   localStorage.setItem('preferredSize', size)
   ```

3. Performance Optimizations:
   - Lazy loading for charts
   - CSS transitions for smooth animations
   - Optimized media queries

## UI Components

### Cards
```css
.card {
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
```

### Interactive Elements
- Hover states for all clickable elements
- Smooth transitions (0.3s ease)
- Visual feedback for actions

### Data Visualization
- Bar charts for performance comparison
- Color-coded metrics
- Responsive sizing

## Optimizations
1. UX Improvements:
   - Clear visual hierarchy
   - Consistent spacing
   - Intuitive navigation
   - Responsive feedback

2. Performance:
   - Optimized CSS delivery
   - Minimal JavaScript overhead
   - Efficient DOM updates

3. Accessibility:
   - ARIA labels
   - Keyboard navigation
   - Screen reader compatibility
   - High contrast support

## Mobile Considerations
- Touch-friendly interface
- Optimized tap targets
- Simplified navigation
- Responsive images and charts

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- CSS fallbacks for broader compatibility