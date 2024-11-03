class ContentResizer {
  constructor() {
    this.sizes = {
      small: {
        text: '14px',
        heading: '24px',
        container: '90%'
      },
      medium: {
        text: '16px',
        heading: '28px',
        container: '95%'
      },
      large: {
        text: '18px',
        heading: '32px',
        container: '100%'
      }
    };

    this.currentSize = 'medium';
    this.section = document.querySelector('.sekcia_zmena');
  }

  setSize(size) {
    if (this.sizes[size]) {
      this.currentSize = size;
      this.applySize();
      localStorage.setItem('preferredSize', size);


      const select = document.getElementById('sizeSelect');
      if (select) {
        select.value = size;
      }
    }
  }


  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {

      if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (e.key === '1' || e.key === '!') {
          e.preventDefault(); 
          this.setSize('small');
        } else if (e.key === '2' || e.key === '@') {
          e.preventDefault();
          this.setSize('medium');
        } else if (e.key === '3' || e.key === '#') {
          e.preventDefault();
          this.setSize('large');
        }
      }
    });
  }

  initSizeSelect() {
    const select = document.getElementById('sizeSelect');
    if (select) {
      const storedSize = localStorage.getItem('preferredSize');
      if (storedSize) {
        select.value = storedSize;
        this.setSize(storedSize);
      }

      select.addEventListener('change', (e) => {
        this.setSize(e.target.value);
      });
    }
  }

  applySize() {
    if (!this.section) return;

    const size = this.sizes[this.currentSize];

    this.section.style.fontSize = size.text;

    const headings = this.section.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      heading.style.fontSize = size.heading;
    });

    this.section.style.width = size.container;
    this.section.style.transition = 'all 0.3s ease';
  }

  init() {
    this.initKeyboardShortcuts();
    this.initSizeSelect();

    const storedSize = localStorage.getItem('preferredSize');
    if (storedSize) {
      this.setSize(storedSize);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.contentResizer = new ContentResizer();
  window.contentResizer.init();
});