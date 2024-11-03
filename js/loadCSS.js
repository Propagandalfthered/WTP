function loadCSSForResolution() {
  const existingLink = document.getElementById('main-css');

  if (!existingLink) {
    const linkElement = document.createElement('link');
    linkElement.id = 'main-css';
    linkElement.rel = 'stylesheet';
    linkElement.href = 'css/style.css';

    linkElement.onerror = () => {
      console.error('Failed to load CSS file');
    };

    linkElement.onload = () => {
      console.log('CSS file loaded successfully');
    };

    document.head.appendChild(linkElement);
  }
}

window.addEventListener('load', loadCSSForResolution);