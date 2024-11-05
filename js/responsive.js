// Trieda ThemeManager (Správca témy)
class ThemeManager {
    // Konštruktor triedy, ktorý sa spustí pri vytvorení novej inštancie
    constructor() {
        this.init(); // Inicializuje nastavenia pri vytvorení triedy
    }

    // Funkcia na prepínanie témy medzi svetlou a tmavou
    toggleTheme() {
        // Prepína triedu 'dark' na elemente <html> (document.documentElement)
        document.documentElement.classList.toggle('dark');

        // Kontroluje, či element <html> obsahuje triedu 'dark' (tmavý režim)
        const isDark = document.documentElement.classList.contains('dark');
        // Ukladá aktuálnu tému do localStorage (buď 'dark' alebo 'light')
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Nájde tlačidlo na prepínanie témy podľa ID 'theme-switcher'
        const toggle = document.getElementById('theme-switcher');
        if (toggle) { // Ak tlačidlo existuje
            // Nastaví atribút 'aria-label' na tlačidle, aby oznamovalo aktuálnu tému pre používateľov s čítačkou obrazovky
            toggle.setAttribute('aria-label',
                isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'
            );
        }
    }

    // Inicializačná funkcia na nastavenie témy a udalostí
    init() {
        // Skontroluje, či je uložená téma v localStorage, a ak áno a je to 'dark', pridá triedu 'dark' na <html>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        }

        // Nájde tlačidlo na prepínanie témy podľa ID 'theme-switcher'
        const toggle = document.getElementById('theme-switcher');
        if (toggle) { // Ak tlačidlo existuje
            // Pridá poslucháča udalosti 'click' na tlačidlo, ktorý spustí funkciu toggleTheme() pri kliknutí
            toggle.addEventListener('click', () => this.toggleTheme());
        }

        // Nastaví automatické prepínanie témy podľa preferencií používateľovho zariadenia (napr. tmavý režim systému)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); // Zistí, či používateľ preferuje tmavý režim
        prefersDark.addEventListener('change', e => { // Ak sa preferencie zmenia
            // Ak v localStorage nie je uložená téma (teda používateľ manuálne nevybral tému)
            if (!localStorage.getItem('theme')) {
                // Prepne triedu 'dark' na elemente <html> podľa toho, či je tmavý režim preferovaný
                document.documentElement.classList.toggle('dark', e.matches);
            }
        });
    }
}

// Spustí sa po načítaní celej stránky (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // Vytvorí novú inštanciu triedy ThemeManager a inicializuje ju
    window.themeManager = new ThemeManager();
});