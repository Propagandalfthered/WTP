function loadCSSForResolution() {
  let existingLink = document.getElementById('main-css')
  if (existingLink) return

  const link = document.createElement('link')
  link.id = 'main-css'
  link.rel = 'stylesheet'
  link.href = 'css/style.css'

  link.onerror = () => console.error('Failed to load CSS')
  link.onload = () => console.log('CSS loaded')

  document.head.appendChild(link)
}

window.addEventListener('load', loadCSSForResolution)