// Функція для завантаження CSS на основі роздільної здатності екрану
function loadCSSForResolution() {
    // Знаходить існуючий елемент link з ID 'main-css'
    let existingLink = document.getElementById('main-css');
    // Якщо link з таким ID вже існує, функція завершується (щоб не дублювати CSS)
    if (existingLink) return;
  
    // Створює новий елемент link (HTML тег для зовнішнього CSS)
    const link = document.createElement('link');
    link.id = 'main-css'; // Встановлює ID нового елемента link на 'main-css'
    link.rel = 'stylesheet'; // Встановлює атрибут 'rel', щоб браузер знав, що це CSS
    link.href = 'css/style.css'; // Встановлює шлях до CSS файлу, який потрібно завантажити
  
    // Визначає, що відбудеться, якщо CSS не вдасться завантажити
    link.onerror = () => console.error('Не вдалося завантажити CSS'); // Відображає помилку в консолі
    // Визначає, що відбудеться після успішного завантаження CSS
    link.onload = () => console.log('CSS завантажено'); // Відображає повідомлення про успішне завантаження
  
    // Додає новостворений елемент link в заголовок документу (щоб CSS застосувався до сторінки)
    document.head.appendChild(link);
  }
  
  // Додає подію для завантаження CSS, коли завантажена вся сторінка (включаючи зображення та CSS)
  window.addEventListener('load', loadCSSForResolution);