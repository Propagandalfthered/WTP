// responsive.js

// Responsive CSS Loader and Theme Toggle
class ResponsiveCSSLoader {
    constructor() {
        this.breakpoints = {
            mobile: 700,
            tablet: 900,
            desktop: 1300,
            large: 1600
        };

        this.cssFiles = {
            mobile: 'css/style-700px.css',
            tablet: 'css/style-900px.css',
            desktop: 'css/style-1300px.css',
            large: 'css/style-1600px.css'
        };

        this.currentBreakpoint = null;
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;

        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        if (width <= this.breakpoints.desktop) return 'desktop';
        return 'large';
    }

    loadCSS() {
        const breakpoint = this.getCurrentBreakpoint();

        if (breakpoint === this.currentBreakpoint) return;

        this.currentBreakpoint = breakpoint;

        const cssLink = document.getElementById('responsive-css');
        if (cssLink) {
            cssLink.href = this.cssFiles[breakpoint];
        } else {
            const link = document.createElement('link');
            link.id = 'responsive-css';
            link.rel = 'stylesheet';
            link.href = this.cssFiles[breakpoint];
            document.head.appendChild(link);
        }

        window.dispatchEvent(new CustomEvent('breakpointChanged', {
            detail: { breakpoint }
        }));
    }

    init() {
        this.loadCSS();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.loadCSS();
            }, 250);
        });

        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.loadCSS();
            }, 100);
        });
    }
}

// Dark Theme Toggle Functionality
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    // Set the initial theme based on saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Add event listener to theme toggle button
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }
});
