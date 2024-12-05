# 🎮 GPU Comparison Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2.0-green.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)

Interaktívny systém na porovnávanie grafických procesorov vytvorený v rámci zadania Webových Technológií 2024. Projekt kombinuje moderné technológie frontendového a backendového vývoja s dôrazom na používateľskú prívetivosť a prístupnosť.

## 🎯 Hlavné Funkcie

### 🔄 Porovnávanie GPU
- Detailné porovnanie špecifikácií
- Interaktívne výkonnostné grafy
- Cenové porovnanie
- Vizualizácia pomeru výkon/cena
- Radarové diagramy výkonu

### 👥 Správa Používateľov
- Bezpečná registrácia
- GDPR kompatibilita
- Správa používateľských dát
- Pokročilé filtrovanie

### 🎨 Moderné UI
- Prepínanie Svetlej/Tmavej témy
- Responzívny dizajn
- Prispôsobiteľná veľkosť obsahu
- Podpora viacerých zariadení

### ♿ Prístupnosť
- WCAG 2.1 štandardy
- Klávesové skratky
- Podpora čítačiek obrazovky
- Nastaviteľné veľkosti písma

## 🛠️ Technológie

### Frontend
- React 18.3
- Vite
- Tailwind CSS
- React Router
- Recharts
- Framer Motion
- Lucide React

### Backend
- PHP 7.4
- MySQL
- REST API
- BCrypt
- PDO

## ⚙️ Inštalácia

### Požiadavky
```bash
Node.js 16+
PHP 7.4+
MySQL 5.7+
XAMPP/WAMP/LAMP
```

### Frontend
```bash
# Klonovanie repozitára
git clone https://github.com/yourusername/gpu-comparison.git

# Inštalácia závislostí
cd gpu-comparison/frontend
npm install

# Spustenie vývojového servera
npm run dev
```

### Backend
1. Nainštalujte XAMPP/WAMP/LAMP
2. Skopírujte `/backend` do `/htdocs/wtp/backend`
3. Vytvorte databázu `registracia`
4. Importujte schému
5. Upravte konfiguráciu v `db_config.php`

## 📂 Štruktúra Projektu

```
gpu-comparison/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UserManager.jsx
│   │   │   ├── GpuComparison.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Compare.jsx
│   │   │   └── ...
│   │   └── assets/
│   ├── public/
│   └── package.json
├── backend/
│   ├── register.php
│   ├── manager.php
│   └── db_config.php
└── dokumentacia/
    └── documentation.md
```

## 🔧 Konfigurácia

### Frontend
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost/wtp/backend'
    }
  }
})
```

### Backend
```php
// db_config.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registracia";
```

## 📱 Responzívny Dizajn

### Podporované Rozlíšenia
- **Mobilné**: do 550px
- **Tablet**: do 850px
- **Desktop**: do 1250px
- **Large**: do 1400px

### Klávesové Skratky
- `Shift + 1`: Malá veľkosť
- `Shift + 2`: Stredná veľkosť
- `Shift + 3`: Veľká veľkosť

## 🔒 Bezpečnosť
- SQL Injection ochrana
- XSS prevencia
- CSRF ochrana
- Hashovanie hesiel
- Input validácia
- Bezpečné sessions

## 👥 Autori
- Daniel Sisák
- Hryshyn Mykyta
- Samuel Furda
- Viktor Olšavský

## 📄 API Dokumentácia

### Registrácia
```http
POST /api/register.php
Content-Type: application/json

{
  "name": "string",
  "birth_year": "number",
  "country": "string",
  "email": "string",
  "password": "string",
  "phone": "string?",
  "notes": "string?"
}
```

### Správa Používateľov
```http
GET /api/manager.php
GET /api/manager.php?delete={id}
```

## 🤝 Prispievanie

1. Forkujte repozitár
2. Vytvorte feature branch (`git checkout -b feature/amazing-feature`)
3. Commitnite zmeny (`git commit -m 'Add amazing feature'`)
4. Pushnite branch (`git push origin feature/amazing-feature`)
5. Otvorte Pull Request

## 📋 Požiadavky Projektu
Projekt spĺňa požiadavky zadania WT 2024:
1. Implementácia React.js
2. Responzívny dizajn
3. Správa používateľov
4. Bezpečnostné prvky
5. GDPR kompatibilita
6. Dokumentácia

## 📝 Licencia
Tento projekt je akademickou prácou a je chránený autorskými právami.

## 🙏 Poďakovanie
- React tímu
- Tailwind CSS tímu
- Všetkým prispievateľom

---
Vytvorené pre predmet Webové Technológie 2024 ❤️