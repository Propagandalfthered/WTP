class ThemeManager {
    constructor() {
        this.init()
    }

    toggleTheme() {
        document.documentElement.classList.toggle('dark')

        const isDark = document.documentElement.classList.contains('dark')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')

        const toggle = document.getElementById('theme-switcher')
        if (toggle) {
            toggle.setAttribute('aria-label',
                isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'
            )
        }
    }

    init() {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark')
        }

        const toggle = document.getElementById('theme-switcher')
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme())
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        prefersDark.addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.classList.toggle('dark', e.matches)
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager()
})