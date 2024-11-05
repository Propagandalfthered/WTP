// Клас ThemeManager (Менеджер Теми)
class ThemeManager {
    // Конструктор класу, який запускається при створенні нової інстанції
    constructor() {
        this.init(); // Ініціалізує налаштування при створенні інстанції класу
    }

    // Функція для перемикання теми між світлою і темною
    toggleTheme() {
        // Перемикає клас 'dark' на елементі <html> (document.documentElement)
        document.documentElement.classList.toggle('dark');

        // Перевіряє, чи елемент <html> містить клас 'dark' (темний режим)
        const isDark = document.documentElement.classList.contains('dark');
        // Зберігає поточну тему в localStorage (або 'dark', або 'light')
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Знаходить кнопку для перемикання теми за ID 'theme-switcher'
        const toggle = document.getElementById('theme-switcher');
        if (toggle) { // Якщо кнопка існує
            // Встановлює атрибут 'aria-label' на кнопці, щоб повідомляти поточну тему для користувачів з читачами екрану
            toggle.setAttribute('aria-label',
                isDark ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'
            );
        }
    }

    // Ініціалізаційна функція для налаштування теми та подій
    init() {
        // Перевіряє, чи збережена тема в localStorage, і якщо це 'dark', додає клас 'dark' до <html>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        }

        // Знаходить кнопку для перемикання теми за ID 'theme-switcher'
        const toggle = document.getElementById('theme-switcher');
        if (toggle) { // Якщо кнопка існує
            // Додає обробник події 'click' на кнопку, який викликає функцію toggleTheme() при натисканні
            toggle.addEventListener('click', () => this.toggleTheme());
        }

        // Налаштовує автоматичне перемикання теми залежно від уподобань пристрою користувача (наприклад, темний режим системи)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); // Визначає, чи користувач віддає перевагу темному режиму
        prefersDark.addEventListener('change', e => { // Якщо уподобання змінюються
            // Якщо в localStorage немає збереженої теми (тобто користувач не обрав тему вручну)
            if (!localStorage.getItem('theme')) {
                // Перемикає клас 'dark' на елементі <html> залежно від того, чи темний режим є бажаним
                document.documentElement.classList.toggle('dark', e.matches);
            }
        });
    }
}

// Виконується після завантаження всієї сторінки (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // Створює новий екземпляр класу ThemeManager і ініціалізує його
    window.themeManager = new ThemeManager();
});
