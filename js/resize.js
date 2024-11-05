// Trieda ContentResizer (Zmeniť veľkosť obsahu)
class ContentResizer {
  // Konštruktor triedy, ktorý sa spustí pri vytvorení novej inštancie tejto triedy
  constructor() {
      // Definícia rôznych veľkostí (malá, stredná, veľká) a ich príslušné hodnoty pre text, nadpisy a kontajner
      this.sizes = {
          small: { // Malá veľkosť
              text: '14px', // Veľkosť textu v pixeloch
              heading: '24px', // Veľkosť nadpisu v pixeloch
              container: '90%' // Šírka kontajnera ako percento
          },
          medium: { // Stredná veľkosť
              text: '16px',
              heading: '28px',
              container: '95%'
          },
          large: { // Veľká veľkosť
              text: '18px',
              heading: '32px',
              container: '100%'
          }
      };
      this.currentSize = 'medium'; // Predvolená veľkosť je stredná
      // Nájde HTML element s triedou 'sekcia_zmena', ktorý bude upravovaný podľa zvolených veľkostí
      this.section = document.querySelector('.sekcia_zmena');
  }

  // Funkcia na nastavenie veľkosti
  setSize(size) {
      // Ak veľkosť neexistuje v definovaných veľkostiach, ukončí funkciu
      if (!this.sizes[size]) return;

      // Nastaví aktuálnu veľkosť na zvolenú hodnotu
      this.currentSize = size;
      // Aplikuje veľkosť na HTML elementy (zmení štýly podľa aktuálnej veľkosti)
      this.applySize();
      // Uloží preferovanú veľkosť do localStorage (miesto na ukladanie údajov v prehliadači)
      localStorage.setItem('preferredSize', size);

      // Nastaví hodnotu v select elemente, ak existuje
      const select = document.getElementById('sizeSelect');
      if (select) select.value = size;
  }

  // Funkcia na inicializáciu klávesových skratiek
  initKeyboardShortcuts() {
      // Pridáva poslucháča udalosti pre stlačenie klávesu
      document.addEventListener('keydown', (e) => {
          // Skontroluje, či je stlačený len Shift a nie Ctrl, Alt alebo Meta
          if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;

          // Zmení veľkosť na 'small', 'medium' alebo 'large' podľa stlačeného klávesu ('1', '2', '3')
          if (e.key === '1' || e.key === '!') {
              e.preventDefault(); // Zabráni predvolenému správaniu (napr. znemožní vloženie znaku)
              this.setSize('small'); // Nastaví veľkosť na 'small'
          } else if (e.key === '2' || e.key === '@') {
              e.preventDefault();
              this.setSize('medium'); // Nastaví veľkosť na 'medium'
          } else if (e.key === '3' || e.key === '#') {
              e.preventDefault();
              this.setSize('large'); // Nastaví veľkosť na 'large'
          }
      });
  }

  // Funkcia na inicializáciu výberu veľkosti z HTML select elementu
  initSizeSelect() {
      const select = document.getElementById('sizeSelect'); // Získa element s ID 'sizeSelect'
      if (!select) return; // Ak neexistuje, ukončí funkciu

      // Skontroluje, či je uložená preferovaná veľkosť v localStorage a nastaví ju
      const savedSize = localStorage.getItem('preferredSize');
      if (savedSize) {
          select.value = savedSize; // Nastaví hodnotu selectu na uloženú veľkosť
          this.setSize(savedSize); // Aplikuje uloženú veľkosť
      }

      // Pridáva poslucháča udalosti pre zmenu veľkosti cez výber v select elemente
      select.addEventListener('change', e => this.setSize(e.target.value));
  }

  // Funkcia na aplikovanie aktuálnej veľkosti na HTML elementy
  applySize() {
      if (!this.section) return; // Ak neexistuje sekcia na úpravu, ukončí funkciu

      const size = this.sizes[this.currentSize]; // Získa aktuálnu veľkosť z definovaných veľkostí
      this.section.style.fontSize = size.text; // Nastaví veľkosť textu pre sekciu

      // Nájde všetky nadpisy (h1 až h6) v sekcii a zmení ich veľkosť
      const headings = this.section.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(h => h.style.fontSize = size.heading); // Prejde cez každý nadpis a nastaví jeho veľkosť

      this.section.style.width = size.container; // Nastaví šírku kontajnera podľa aktuálnej veľkosti
      this.section.style.transition = 'all 0.3s ease'; // Nastaví animáciu pre zmenu veľkosti
  }

  // Inicializačná funkcia, ktorá spustí všetky potrebné funkcie pre správne fungovanie
  init() {
      this.initKeyboardShortcuts(); // Inicializuje klávesové skratky
      this.initSizeSelect(); // Inicializuje výber veľkosti

      // Skontroluje, či je uložená preferovaná veľkosť a nastaví ju
      const savedSize = localStorage.getItem('preferredSize');
      if (savedSize) this.setSize(savedSize);
  }
}

// Spustí sa, keď je celá stránka načítaná (DOMContentLoaded - HTML, CSS, atď.)
window.addEventListener('DOMContentLoaded', () => {
  // Vytvorí novú inštanciu triedy ContentResizer a inicializuje ju
  window.contentResizer = new ContentResizer();
  window.contentResizer.init();
});
