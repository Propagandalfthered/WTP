function changeContentSize(size) {
    const section = document.querySelector('.sekcia_zmena');
    if (size === 'small') {
      section.style.fontSize = '14px';
    } else if (size === 'large') {
      section.style.fontSize = '20px';
    } else {
      section.style.fontSize = '';
    }
  }
  
  function setupEventListeners() {
    // Activation Method 1: Button Click
    document.getElementById('resizeButton').addEventListener('click', () => {
      changeContentSize('large');
    });
  
    // Activation Method 2: Checkbox Toggle
    document.getElementById('resizeCheckbox').addEventListener('change', (e) => {
      changeContentSize(e.target.checked ? 'large' : 'small');
    });
  
    // Activation Method 3: Dropdown Selection
    document.getElementById('resizeSelect').addEventListener('change', (e) => {
      changeContentSize(e.target.value);
    });
  }
  
  document.addEventListener('DOMContentLoaded', setupEventListeners);