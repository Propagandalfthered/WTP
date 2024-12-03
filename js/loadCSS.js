// Funkcia na načítanie CSS na základe rozlíšenia obrazovky
function loadCSSForResolution() {
  // Nájde existujúci link element s ID 'main-css'
  let existingLink = document.getElementById('main-css');
  // Ak už link s týmto ID existuje, funkcia sa ukončí (neduplikujeme CSS)
  if (existingLink) return;

  // Vytvára nový link element (HTML tag pre externé CSS)
  const link = document.createElement('link');
  link.id = 'main-css'; // Nastaví ID nového link elementu na 'main-css'
  link.rel = 'stylesheet'; // Nastaví atribút 'rel', aby vedel prehliadač, že ide o CSS
  link.href = 'css/style.css'; // Nastaví cestu k CSS súboru, ktorý chceme načítať

  // Definuje, čo sa stane, ak sa CSS nepodarí načítať
  link.onerror = () => console.error('Failed to load CSS'); // Zobrazí chybu v konzole
  // Definuje, čo sa stane po úspešnom načítaní CSS
  link.onload = () => console.log('CSS loaded'); // Zobrazí správu o úspešnom načítaní

  // Pridá novovytvorený link element do hlavičky dokumentu (aby sa CSS aplikovalo na stránku)
  document.head.appendChild(link);
}

// Pridáva udalosť pre načítanie CSS, keď je celá stránka načítaná (vrátane obrázkov a CSS)
window.addEventListener('load', loadCSSForResolution);
