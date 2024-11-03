class ThemeManager {
    constructor() {
        this.init();
    }

    toggleTheme() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: isDark ? 'dark' : 'light' }
        }));

        const themeToggle = document.getElementById('theme-switcher');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
        }
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }

        const themeToggle = document.getElementById('theme-switcher');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());

            const isDark = document.documentElement.classList.contains('dark');
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.classList.toggle('dark', e.matches);

                const themeToggle = document.getElementById('theme-switcher');
                if (themeToggle) {
                    themeToggle.setAttribute('aria-label', e.matches ? 'Switch to Light Theme' : 'Switch to Dark Theme');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});