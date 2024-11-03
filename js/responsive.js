class ResponsiveCSSLoader {
    constructor() {
        this.breakpoints = {
            mobile: 550,
            tablet: 850,
            desktop: 1250,
            large: 1400
        };

        this.cssFiles = {
            mobile: 'css/style-550px.css',
            tablet: 'css/style-850px.css',
            desktop: 'css/style-1250px.css',
            large: 'css/style-1400px.css'
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

document.addEventListener('DOMContentLoaded', () => {
    const cssLoader = new ResponsiveCSSLoader();
    cssLoader.init();
});