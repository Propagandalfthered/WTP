// Клас GPUComparison (порівняння GPU) - Створює клас для порівняння різних GPU
class GPUComparison {
    // Конструктор класу, який виконується при створенні нового екземпляра цього класу
    constructor() {
        // Ініціалізація об'єкта з даними про GPU (ключ: назва GPU, значення: специфікації та продуктивність)
        // Використовуємо об'єкт, щоб зберегти різні специфікації та параметри продуктивності для окремих моделей GPU
        this.gpuData = {
            'NVIDIA RTX 4090': { // Назва GPU як ключ
                vram: '24GB GDDR6X', // VRAM (відеопам'ять) GPU - обсяг і тип пам'яті
                coreClock: '2.52 GHz', // Основна частота ядра - швидкість, з якою працює ядро GPU
                tdp: '450W', // TDP (Тепловий дизайн потужності) - споживання енергії GPU у ватах
                cores: '16384 CUDA', // Кількість ядер CUDA (паралельні обчислювальні ядра, що використовуються для обробки графічних задач)
                rayTracing: 'Так', // Підтримка Ray Tracing - технологія для реалістичного рендерингу світла і тіней
                price: '1599', // Ціна GPU в USD
                performance: { // Продуктивність GPU в різних категоріях
                    gaming4k: 100, // Продуктивність у 4K іграх (оцінка від 0 до 100)
                    gaming1440p: 100, // Продуктивність у 1440p іграх
                    mining: 95, // Продуктивність при майнінгу криптовалют
                    rendering: 100 // Продуктивність при рендерингу (наприклад, відео або графіки)
                }
            },
            // Аналогічно визначені інші GPU, включаючи моделі від NVIDIA, AMD та Intel
            // Кожне GPU містить однакову структуру інформації
            'NVIDIA RTX 4080': {
                vram: '16GB GDDR6X',
                coreClock: '2.51 GHz',
                tdp: '320W',
                cores: '9728 CUDA',
                rayTracing: 'Так',
                price: '1199',
                performance: {
                    gaming4k: 85,
                    gaming1440p: 90,
                    mining: 80,
                    rendering: 85
                }
            },
            'NVIDIA RTX 4070 Ti': {
                vram: '12GB GDDR6X',
                coreClock: '2.61 GHz',
                tdp: '285W',
                cores: '7680 CUDA',
                rayTracing: 'Так',
                price: '799',
                performance: {
                    gaming4k: 75,
                    gaming1440p: 85,
                    mining: 70,
                    rendering: 75
                }
            },
            'NVIDIA RTX 4070': {
                vram: '12GB GDDR6X',
                coreClock: '2.48 GHz',
                tdp: '200W',
                cores: '5888 CUDA',
                rayTracing: 'Так',
                price: '599',
                performance: {
                    gaming4k: 65,
                    gaming1440p: 80,
                    mining: 60,
                    rendering: 70
                }
            },
            'NVIDIA RTX 3090 Ti': {
                vram: '24GB GDDR6X',
                coreClock: '1.86 GHz',
                tdp: '450W',
                cores: '10752 CUDA',
                rayTracing: 'Так',
                price: '999',
                performance: {
                    gaming4k: 80,
                    gaming1440p: 90,
                    mining: 90,
                    rendering: 95
                }
            },
            'NVIDIA RTX 3080 Ti': {
                vram: '12GB GDDR6X',
                coreClock: '1.67 GHz',
                tdp: '350W',
                cores: '10240 CUDA',
                rayTracing: 'Так',
                price: '799',
                performance: {
                    gaming4k: 75,
                    gaming1440p: 85,
                    mining: 85,
                    rendering: 85
                }
            },
            'AMD RX 7900 XTX': {
                vram: '24GB GDDR6',
                coreClock: '2.5 GHz',
                tdp: '355W',
                cores: '6144 Stream',
                rayTracing: 'Так',
                price: '999',
                performance: {
                    gaming4k: 90,
                    gaming1440p: 95,
                    mining: 85,
                    rendering: 80
                }
            },
            'AMD RX 7900 XT': {
                vram: '20GB GDDR6',
                coreClock: '2.4 GHz',
                tdp: '315W',
                cores: '5376 Stream',
                rayTracing: 'Так',
                price: '899',
                performance: {
                    gaming4k: 80,
                    gaming1440p: 85,
                    mining: 75,
                    rendering: 75
                }
            },
            'AMD RX 7800 XT': {
                vram: '16GB GDDR6',
                coreClock: '2.32 GHz',
                tdp: '263W',
                cores: '3840 Stream',
                rayTracing: 'Так',
                price: '499',
                performance: {
                    gaming4k: 70,
                    gaming1440p: 80,
                    mining: 65,
                    rendering: 70
                }
            },
            'AMD RX 6950 XT': {
                vram: '16GB GDDR6',
                coreClock: '2.31 GHz',
                tdp: '335W',
                cores: '5120 Stream',
                rayTracing: 'Так',
                price: '699',
                performance: {
                    gaming4k: 75,
                    gaming1440p: 85,
                    mining: 80,
                    rendering: 75
                }
            },
            'AMD RX 6800 XT': {
                vram: '16GB GDDR6',
                coreClock: '2.25 GHz',
                tdp: '300W',
                cores: '4608 Stream',
                rayTracing: 'Так',
                price: '579',
                performance: {
                    gaming4k: 70,
                    gaming1440p: 80,
                    mining: 75,
                    rendering: 70
                }
            },
            'Intel Arc A770': {
                vram: '16GB GDDR6',
                coreClock: '2.1 GHz',
                tdp: '225W',
                cores: '4096 Xe',
                rayTracing: 'Так',
                price: '349',
                performance: {
                    gaming4k: 60,
                    gaming1440p: 70,
                    mining: 50,
                    rendering: 65
                }
            },
            'Intel Arc A750': {
                vram: '8GB GDDR6',
                coreClock: '2.05 GHz',
                tdp: '225W',
                cores: '3584 Xe',
                rayTracing: 'Так',
                price: '289',
                performance: {
                    gaming4k: 55,
                    gaming1440p: 65,
                    mining: 45,
                    rendering: 60
                }
            },
            'Intel Arc A380': {
                vram: '6GB GDDR6',
                coreClock: '2.0 GHz',
                tdp: '75W',
                cores: '1024 Xe',
                rayTracing: 'Так',
                price: '139',
                performance: {
                    gaming4k: 30,
                    gaming1440p: 40,
                    mining: 25,
                    rendering: 35
                }
            }
        };

     // Виклик ініціалізаційної функції init(), щоб налаштувати базові елементи після створення екземпляра
     this.init();
    }

    // Ініціалізаційна функція - налаштовує HTML елементи та події, які будуть використовуватись пізніше
    init() {
        // Отримує HTML елементи для вибору GPU за допомогою ID (id - це атрибут в HTML, що ідентифікує конкретний елемент)
        const select1 = document.getElementById('gpu1Select'); // HTML елемент для вибору першого GPU
        const select2 = document.getElementById('gpu2Select'); // HTML елемент для вибору другого GPU

        // Перевіряє, чи обидва HTML елементи існують на сторінці
        if (select1 && select2) {
            // Заповнює обидва випадаючих списки доступними GPU
            this.populateSelect(select1); // Заповнює перший вибір
            this.populateSelect(select2); // Заповнює другий вибір

            // Додає події, які мають виконуватись при зміні вибору GPU в обох списках
            // 'change' - це назва події, що відбувається при зміні значення у випадаючому списку
            select1.addEventListener('change', () => this.updateComparison()); // Оновлює порівняння при зміні вибору
            select2.addEventListener('change', () => this.updateComparison()); // Оновлює порівняння при зміні вибору

            // Встановлює стандартний вибір для другого GPU на другий індекс (тобто друге GPU у списку)
            select2.selectedIndex = 1;
            // Запускає оновлення порівняння відразу після ініціалізації, щоб відобразити дані навіть без вибору користувача
            this.updateComparison();
        }

        // Ініціалізація графіків для порівняння продуктивності між двома GPU
        this.initCharts();
    }

    // Функція для заповнення HTML елементу select можливостями GPU з gpuData
    populateSelect(select) {
        // Встановлює основний варіант у випадаючому списку (select), який просить користувача вибрати GPU
        select.innerHTML = '<option value="">Виберіть GPU</option>'; // Встановлює HTML вміст вибіркового елементу на стандартне значення
        // Проходить через усі ключі в об'єкті gpuData (кожен ключ - це назва GPU)
        Object.keys(this.gpuData).forEach(gpu => {
            // Додає кожне GPU як можливість у випадаючий список з назвою GPU як текстом
            select.innerHTML += `<option value="${gpu}">${gpu}</option>`; // `option` елемент в HTML представляє окрему можливість у випадаючому списку
        });
    }

    // Функція для оновлення порівняння між двома обраними GPU
    updateComparison() {
        // Отримує назви обраних GPU з HTML елементів select
        const gpu1Name = document.getElementById('gpu1Select').value; // Значення першого обраного GPU
        const gpu2Name = document.getElementById('gpu2Select').value; // Значення другого обраного GPU

        // Якщо обидва GPU не обрані, функція припиняє свою роботу
        if (!gpu1Name || !gpu2Name) return; // Якщо один з GPU не обраний, функція далі не виконується

        // Отримує дані (специфікації) про обидва обрані GPU з об'єкта gpuData
        const gpu1 = this.gpuData[gpu1Name]; // Дані для першого GPU
        const gpu2 = this.gpuData[gpu2Name]; // Дані для другого GPU

        // Оновлює таблицю специфікацій та графіки на основі обраних GPU
        this.updateSpecsTable(gpu1, gpu2); // Оновлює таблицю специфікацій для обраних GPU
        this.updateCharts(gpu1, gpu2); // Оновлює графіки продуктивності для обраних GPU
    }

    // Функція для оновлення таблиці зі специфікаціями для обох GPU
    updateSpecsTable(gpu1, gpu2) {
        // Поля, які будуть порівнюватись, такі як VRAM, частота ядра, споживання тощо
        const fields = ['vram', 'coreClock', 'tdp', 'cores', 'rayTracing', 'price'];
        const displayNames = { // Мапа між внутрішніми назвами і відображеними назвами на екрані
            vram: 'VRAM',
            coreClock: 'Основна частота',
            tdp: 'TDP',
            cores: 'Ядра',
            rayTracing: 'Ray Tracing',
            price: 'Ціна (USD)'
        };

        // Проходить через кожне поле та оновлює значення в таблиці HTML для обох GPU
        fields.forEach(field => {
            // Встановлює значення у таблиці для першого GPU
            document.getElementById(`${field}1`).textContent = gpu1[field]; // Знаходить HTML елемент для поля першого GPU і встановлює його значення
            // Встановлює значення у таблиці для другого GPU
            document.getElementById(`${field}2`).textContent = gpu2[field]; // Знаходить HTML елемент для поля другого GPU і встановлює його значення

            const diff = document.getElementById(`${field}Diff`); // Знаходить HTML елемент, що відображає різницю між двома значеннями
            if (field === 'price' || field === 'tdp') { // Якщо поле - ціна або споживання (TDP), обчислює різницю
                const val1 = parseInt(gpu1[field]); // Перетворює значення першого GPU на ціле число
                const val2 = parseInt(gpu2[field]); // Перетворює значення другого GPU на ціле число
                const difference = val2 - val1; // Обчислює різницю між значеннями
                diff.textContent = difference > 0 ? `+${difference}` : difference; // Якщо різниця додатна, додає знак плюс перед значенням
                diff.className = difference > 0 ? 'text-danger' : 'text-success'; // Встановлює клас для стилю: додатні різниці червоні, від'ємні зелені
            } else {
                diff.textContent = '-'; // Якщо різниця не обчислюється (наприклад, для текстових значень), встановлює дефіс
            }
        });
    }

    // Ініціалізація графіків для порівняння продуктивності між двома GPU
    initCharts() {
        // Отримує контекст (2D простір для малювання) для графіків з HTML елементів canvas
        const ctx4k = document.getElementById('chart4k').getContext('2d'); // Контекст для графіку 4K порівняння
        const ctx1440p = document.getElementById('chart1440p').getContext('2d'); // Контекст для графіку 1440p порівняння

        // Створює новий графік за допомогою бібліотеки Chart.js для 4K порівняння
        this.chart4k = new Chart(ctx4k, {
            type: 'bar', // Тип графіку - стовпчиковий (bar chart)
            data: {
                labels: ['Gaming', 'Mining', 'Rendering'], // Вісі для окремих категорій продуктивності (Ігри, Майнінг, Рендеринг)
                datasets: [{
                    label: 'GPU 1', // Мітка для першого GPU
                    data: [0, 0, 0], // Початкові значення даних (нули, будуть оновлені пізніше)
                    backgroundColor: 'rgba(54, 162, 235, 0.5)' // Колір стовпців для першого GPU
                }, {
                    label: 'GPU 2', // Мітка для другого GPU
                    data: [0, 0, 0], // Початкові значення даних (нули, будуть оновлені пізніше)
                    backgroundColor: 'rgba(255, 99, 132, 0.5)' // Колір стовпців для другого GPU
                }]
            },
            options: {
                responsive: true, // Графік адаптивний, автоматично підлаштовується під розмір екрану
                plugins: {
                    title: {
                        display: true, // Відображає назву графіку
                        text: 'Порівняння продуктивності 4K' // Текст назви графіку (порівняння продуктивності в 4K)
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // Вісь Y починається з нуля (мінімум)
                        max: 100 // Максимальне значення осі Y - 100
                    }
                }
            }
        });

        // Створює новий графік для 1440p порівняння (дуже схоже на 4K графік)
        this.chart1440p = new Chart(ctx1440p, {
            type: 'bar',
            data: {
                labels: ['Gaming', 'Mining', 'Rendering'],
                datasets: [{
                    label: 'GPU 1',
                    data: [0, 0, 0],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }, {
                    label: 'GPU 2',
                    data: [0, 0, 0],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Порівняння продуктивності 1440p' // Текст назви графіку (порівняння продуктивності в 1440p)
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Функція для оновлення графіків згідно з вибраними GPU
    updateCharts(gpu1, gpu2) {
        // Встановлює мітки (label) для графіків на основі обраних GPU
        this.chart4k.data.datasets[0].label = 'GPU 1'; // Мітка для першого GPU
        this.chart4k.data.datasets[1].label = 'GPU 2'; // Мітка для другого GPU

        // Встановлює дані для 4K графіку для обох GPU (ігрові, майнінгові, та рендерингові значення)
        this.chart4k.data.datasets[0].data = [
            gpu1.performance.gaming4k, // Значення ігрової продуктивності для GPU 1
            gpu1.performance.mining, // Значення майнінгової продуктивності для GPU 1
            gpu1.performance.rendering // Значення рендерингової продуктивності для GPU 1
        ];

        this.chart4k.data.datasets[1].data = [
            gpu2.performance.gaming4k, // Значення ігрової продуктивності для GPU 2
            gpu2.performance.mining, // Значення майнінгової продуктивності для GPU 2
            gpu2.performance.rendering // Значення рендерингової продуктивності для GPU 2
        ];

        // Встановлює дані для 1440p графіку для обох GPU (такі ж категорії, як для 4K)
        this.chart1440p.data.datasets[0].data = [
            gpu1.performance.gaming1440p, // Значення ігрової продуктивності для GPU 1 у роздільній здатності 1440p
            gpu1.performance.mining, // Значення майнінгової продуктивності для GPU 1
            gpu1.performance.rendering // Значення рендерингової продуктивності для GPU 1
        ];

        this.chart1440p.data.datasets[1].data = [
            gpu2.performance.gaming1440p, // Значення ігрової продуктивності для GPU 2 у роздільній здатності 1440p
            gpu2.performance.mining, // Значення майнінгової продуктивності для GPU 2
            gpu2.performance.rendering // Значення рендерингової продуктивності для GPU 2
        ];

        // Оновлює обидва графіки, щоб відобразити нові дані
        this.chart4k.update(); // Оновлення графіку 4K
        this.chart1440p.update(); // Оновлення графіку 1440p
    }
}

// Запуск скрипту після завантаження всієї сторінки (DOMContentLoaded - коли HTML завантажено)
document.addEventListener('DOMContentLoaded', () => {
    // Створює новий екземпляр класу GPUComparison та ініціалізує його
    const gpuComparison = new GPUComparison();
});
