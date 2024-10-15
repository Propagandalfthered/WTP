function loadCSSForResolution() {
    const width = window.innerWidth;
    let cssFile = 'css/style.css'; // default
  
    if (width <= 700) {
      cssFile = 'css/style-700px.css';
    } else if (width <= 900) {
      cssFile = 'css/style-900px.css';
    } else if (width <= 1300) {
      cssFile = 'css/style-1300px.css';
    } else if (width <= 1600) {
      cssFile = 'css/style-1600px.css';
    }
  
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssFile;
    document.head.appendChild(linkElement);
  }
  
  window.addEventListener('load', loadCSSForResolution);
  window.addEventListener('resize', loadCSSForResolution);