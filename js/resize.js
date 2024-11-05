// Клас ContentResizer (Зміна розміру контенту)
class ContentResizer {
    // Конструктор класу, який виконується при створенні нового екземпляра цього класу
    constructor() {
        // Визначення різних розмірів (малий, середній, великий) та їхні відповідні значення для тексту, заголовків і контейнера
        this.sizes = {
            small: { // Малий розмір
                text: '14px', // Розмір тексту в пікселях
                heading: '24px', // Розмір заголовку в пікселях
                container: '90%' // Ширина контейнера у відсотках
            },
            medium: { // Середній розмір
                text: '16px',
                heading: '28px',
                container: '95%'
            },
            large: { // Великий розмір
                text: '18px',
                heading: '32px',
                container: '100%'
            }
        };
        this.currentSize = 'medium'; // За замовчуванням використовується середній розмір
        // Знаходить HTML елемент з класом 'sekcia_zmena', який буде змінюватися в залежності від обраного розміру
        this.section = document.querySelector('.sekcia_zmena');
    }
  
    // Функція для встановлення розміру
    setSize(size) {
        // Якщо розмір не існує у визначених розмірах, функція завершується
        if (!this.sizes[size]) return;
  
        // Встановлює поточний розмір на обране значення
        this.currentSize = size;
        // Застосовує розмір до HTML елементів (змінює стилі згідно з обраним розміром)
        this.applySize();
        // Зберігає обраний розмір у localStorage (місце для зберігання даних у браузері)
        localStorage.setItem('preferredSize', size);
  
        // Встановлює значення у select елементі, якщо він існує
        const select = document.getElementById('sizeSelect');
        if (select) select.value = size;
    }
  
    // Функція для ініціалізації гарячих клавіш
    initKeyboardShortcuts() {
        // Додає слухача події для натискання клавіші
        document.addEventListener('keydown', (e) => {
            // Перевіряє, чи натиснуто лише Shift, і не Ctrl, Alt чи Meta
            if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
  
            // Змінює розмір на 'small', 'medium' або 'large' згідно з натиснутою клавішею ('1', '2', '3')
            if (e.key === '1' || e.key === '!') {
                e.preventDefault(); // Запобігає стандартній поведінці (наприклад, вставці символу)
                this.setSize('small'); // Встановлює розмір 'small'
            } else if (e.key === '2' || e.key === '@') {
                e.preventDefault();
                this.setSize('medium'); // Встановлює розмір 'medium'
            } else if (e.key === '3' || e.key === '#') {
                e.preventDefault();
                this.setSize('large'); // Встановлює розмір 'large'
            }
        });
    }
  
    // Функція для ініціалізації вибору розміру з HTML select елемента
    initSizeSelect() {
        const select = document.getElementById('sizeSelect'); // Отримує елемент з ID 'sizeSelect'
        if (!select) return; // Якщо елемент не існує, завершує функцію
  
        // Перевіряє, чи збережений обраний розмір у localStorage, і встановлює його
        const savedSize = localStorage.getItem('preferredSize');
        if (savedSize) {
            select.value = savedSize; // Встановлює значення select на збережений розмір
            this.setSize(savedSize); // Застосовує збережений розмір
        }
  
        // Додає слухача події для зміни розміру через вибір у select елементі
        select.addEventListener('change', e => this.setSize(e.target.value));
    }
  
    // Функція для застосування поточного розміру до HTML елементів
    applySize() {
        if (!this.section) return; // Якщо секція для зміни не існує, функція завершується
  
        const size = this.sizes[this.currentSize]; // Отримує поточний розмір з визначених розмірів
        this.section.style.fontSize = size.text; // Встановлює розмір тексту для секції
  
        // Знаходить усі заголовки (h1 до h6) у секції та змінює їхній розмір
        const headings = this.section.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => h.style.fontSize = size.heading); // Проходить через кожен заголовок і встановлює його розмір
  
        this.section.style.width = size.container; // Встановлює ширину контейнера згідно з поточним розміром
        this.section.style.transition = 'all 0.3s ease'; // Встановлює анімацію для зміни розміру
    }
  
    // Ініціалізаційна функція, що запускає всі необхідні функції для правильного функціонування
    init() {
        this.initKeyboardShortcuts(); // Ініціалізує гарячі клавіші
        this.initSizeSelect(); // Ініціалізує вибір розміру
  
        // Перевіряє, чи збережений обраний розмір, і встановлює його
        const savedSize = localStorage.getItem('preferredSize');
        if (savedSize) this.setSize(savedSize);
    }
  }
  
  // Запускається, коли вся сторінка завантажена (DOMContentLoaded - HTML, CSS тощо)
  window.addEventListener('DOMContentLoaded', () => {
    // Створює новий екземпляр класу ContentResizer та ініціалізує його
    window.contentResizer = new ContentResizer();
    window.contentResizer.init();
  });
  