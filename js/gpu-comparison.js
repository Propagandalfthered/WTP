// Trieda GPUComparison (porovnanie GPU) - Vytvára triedu pre porovnanie rôznych GPU
class GPUComparison {
    // Konštruktor triedy, ktorý sa spustí pri vytváraní novej inštancie tejto triedy
    constructor() {
        // Inicializácia objektu s údajmi o GPU (kľúč: názov GPU, hodnota: špecifikácie a výkon)
        // Používame objekt, aby sme mohli uložiť rôzne špecifikácie a výkonové parametre pre jednotlivé modely GPU
        this.gpuData = {
            'NVIDIA RTX 4090': { // Názov GPU ako kľúč
                vram: '24GB GDDR6X', // VRAM (Video pamäť) GPU - veľkosť a typ pamäte
                coreClock: '2.52 GHz', // Základná frekvencia jadra - rýchlosť, s ktorou pracuje jadro GPU
                tdp: '450W', // TDP (Thermal Design Power) - spotreba energie GPU v wattoch
                cores: '16384 CUDA', // Počet jadier CUDA (paralelné výpočtové jadrá používané na spracovanie grafických úloh)
                rayTracing: 'Yes', // Podpora ray tracingu - technológia na realistické vykresľovanie svetla a tieňov
                price: '1599', // Cena GPU v USD
                performance: { // Výkon GPU v rôznych kategóriách
                    gaming4k: 100, // Výkon pri 4K hrách (hodnotenie od 0 do 100)
                    gaming1440p: 100, // Výkon pri 1440p hrách
                    mining: 95, // Výkon pri ťažení kryptomien
                    rendering: 100 // Výkon pri renderovaní (napríklad videí alebo grafiky)
                }
            },
            // Podobne sú definované ďalšie GPU vrátane modelov od NVIDIA, AMD a Intel
            // Každé GPU obsahuje rovnakú štruktúru informácií
            'NVIDIA RTX 4080': {
                vram: '16GB GDDR6X',
                coreClock: '2.51 GHz',
                tdp: '320W',
                cores: '9728 CUDA',
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
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
                rayTracing: 'Yes',
                price: '139',
                performance: {
                    gaming4k: 30,
                    gaming1440p: 40,
                    mining: 25,
                    rendering: 35
                }
            }
        };

     // Volanie inicializačnej funkcie init(), aby sa nastavili základné prvky po vytvorení inštancie
     this.init();
    }

    // Inicializačná funkcia - nastavuje HTML elementy a udalosti, ktoré budú neskôr používané
    init() {
        // Získa HTML elementy pre výber GPU pomocou ID (id je atribút v HTML, ktorý identifikuje konkrétny element)
        const select1 = document.getElementById('gpu1Select'); // HTML element pre výber prvého GPU
        const select2 = document.getElementById('gpu2Select'); // HTML element pre výber druhého GPU

        // Skontroluje, či obidva HTML elementy existujú na stránke
        if (select1 && select2) {
            // Naplní oba výbery dostupnými GPU možnosťami
            this.populateSelect(select1); // Naplní prvý výber
            this.populateSelect(select2); // Naplní druhý výber

            // Pridáva udalosti, ktoré sa majú vykonať, keď sa vyberie nové GPU v oboch výberoch
            // 'change' je názov udalosti, ktorá sa stane, keď sa zmení hodnota vo výbere
            select1.addEventListener('change', () => this.updateComparison()); // Aktualizuje porovnanie pri zmene výberu
            select2.addEventListener('change', () => this.updateComparison()); // Aktualizuje porovnanie pri zmene výberu

            // Nastaví predvolenú možnosť pre druhé GPU na druhý index (t.j. druhé GPU v zozname)
            select2.selectedIndex = 1;
            // Spustí aktualizáciu porovnania hneď po inicializácii, aby sa zobrazili údaje aj bez výberu používateľom
            this.updateComparison();
        }

        // Inicializácia grafov pre porovnanie výkonu medzi dvoma GPU
        this.initCharts();
    }

    // Funkcia na naplnenie HTML elementu typu select možnosťami GPU z gpuData
    populateSelect(select) {
        // Nastaví základnú možnosť v select (výber), ktorá používateľovi povie, aby si vybral GPU
        select.innerHTML = '<option value="">Select GPU</option>'; // Nastaví HTML obsahu výberového elementu predvolenú hodnotu
        // Prechádza všetky kľúče v objekte gpuData (každý kľúč je názov GPU)
        Object.keys(this.gpuData).forEach(gpu => {
            // Pridáva každé GPU ako možnosť do výberu s názvom GPU ako textom
            select.innerHTML += `<option value="${gpu}">${gpu}</option>`; // `option` element v HTML predstavuje jednotlivú možnosť vo výbere
        });
    }

    // Funkcia na aktualizáciu porovnania medzi dvoma vybranými GPU
    updateComparison() {
        // Získa názvy vybraných GPU z HTML select elementov
        const gpu1Name = document.getElementById('gpu1Select').value; // Hodnota prvého vybraného GPU
        const gpu2Name = document.getElementById('gpu2Select').value; // Hodnota druhého vybraného GPU

        // Ak nie sú obe GPU vybrané, tak funkcia ukončí svoju činnosť
        if (!gpu1Name || !gpu2Name) return; // Ak je jedno z GPU nevybrané, funkcia sa neprevedie ďalej

        // Získa údaje (špecifikácie) o oboch vybraných GPU z objektu gpuData
        const gpu1 = this.gpuData[gpu1Name]; // Dáta pre prvé GPU
        const gpu2 = this.gpuData[gpu2Name]; // Dáta pre druhé GPU

        // Aktualizuje tabuľku špecifikácií a grafy na základe vybraných GPU
        this.updateSpecsTable(gpu1, gpu2); // Aktualizuje tabuľku
        this.updateCharts(gpu1, gpu2); // Aktualizuje grafy
    }

    // Funkcia na aktualizáciu tabuľky so špecifikáciami pre obe GPU
    updateSpecsTable(gpu1, gpu2) {
        // Polia, ktoré budú porovnávané, napr. VRAM, frekvencia jadra, spotreba atď.
        const fields = ['vram', 'coreClock', 'tdp', 'cores', 'rayTracing', 'price'];
        const displayNames = { // Mapa medzi internými názvami a zobrazenými názvami na obrazovke
            vram: 'VRAM',
            coreClock: 'Core Clock',
            tdp: 'TDP',
            cores: 'Cores',
            rayTracing: 'Ray Tracing',
            price: 'Price (USD)'
        };

        // Prechádza cez každé pole a aktualizuje hodnoty v tabuľke HTML pre obe GPU
        fields.forEach(field => {
            // Nastaví hodnotu v tabuľke pre prvé GPU
            document.getElementById(`${field}1`).textContent = gpu1[field]; // Nájde HTML element pre pole prvého GPU a nastaví jeho hodnotu
            // Nastaví hodnotu v tabuľke pre druhé GPU
            document.getElementById(`${field}2`).textContent = gpu2[field]; // Nájde HTML element pre pole druhého GPU a nastaví jeho hodnotu

            const diff = document.getElementById(`${field}Diff`); // Nájde HTML element, ktorý zobrazuje rozdiel medzi dvoma hodnotami
            if (field === 'price' || field === 'tdp') { // Ak je pole cena alebo spotreba (TDP), vypočíta rozdiel
                const val1 = parseInt(gpu1[field]); // Prevedie hodnotu prvého GPU na celé číslo
                const val2 = parseInt(gpu2[field]); // Prevedie hodnotu druhého GPU na celé číslo
                const difference = val2 - val1; // Vypočíta rozdiel medzi hodnotami
                diff.textContent = difference > 0 ? `+${difference}` : difference; // Ak je rozdiel kladný, pridá znak plus pred hodnotu
                diff.className = difference > 0 ? 'text-danger' : 'text-success'; // Nastaví triedu pre štýl: kladné rozdiely červené, záporné zelené
            } else {
                diff.textContent = '-'; // Ak sa rozdiel nepočíta (napr. pre textové hodnoty), nastaví pomlčku
            }
        });
    }

    // Inicializácia grafov pre porovnanie výkonu medzi dvoma GPU
    initCharts() {
        // Získa kontext (2D kresliaci priestor) pre grafy z HTML canvas prvkov
        const ctx4k = document.getElementById('chart4k').getContext('2d'); // Kontext pre graf 4K porovnania
        const ctx1440p = document.getElementById('chart1440p').getContext('2d'); // Kontext pre graf 1440p porovnania

        // Vytvára nový graf pomocou knižnice Chart.js pre 4K porovnanie
        this.chart4k = new Chart(ctx4k, {
            type: 'bar', // Typ grafu je stĺpcový (bar chart)
            data: {
                labels: ['Gaming', 'Mining', 'Rendering'], // Osy pre jednotlivé kategórie výkonu (Herný výkon, Ťažba, Renderovanie)
                datasets: [{
                    label: 'GPU 1', // Označenie pre prvé GPU
                    data: [0, 0, 0], // Počiatočné hodnoty dát (nuly, budú aktualizované neskôr)
                    backgroundColor: 'rgba(54, 162, 235, 0.5)' // Farba pruhov pre prvé GPU
                }, {
                    label: 'GPU 2', // Označenie pre druhé GPU
                    data: [0, 0, 0], // Počiatočné hodnoty dát (nuly, budú aktualizované neskôr)
                    backgroundColor: 'rgba(255, 99, 132, 0.5)' // Farba pruhov pre druhé GPU
                }]
            },
            options: {
                responsive: true, // Graf je responzívny, automaticky sa prispôsobuje veľkosti obrazovky
                plugins: {
                    title: {
                        display: true, // Zobrazí názov grafu
                        text: '4K Performance Comparison' // Text názvu grafu (porovnanie výkonu v 4K rozlíšení)
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // Y os začína na nule (minimum)
                        max: 100 // Maximálna hodnota Y osi je 100
                    }
                }
            }
        });

        // Vytvára nový graf pre 1440p porovnanie (veľmi podobné ako pre 4K graf)
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
                        text: '1440p Performance Comparison' // Text názvu grafu (porovnanie výkonu v 1440p rozlíšení)
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

    // Funkcia na aktualizáciu grafov podľa zvolených GPU
    updateCharts(gpu1, gpu2) {
        // Nastavuje popisky (label) pre grafy na základe aktuálne zvolených GPU
        this.chart4k.data.datasets[0].label = 'GPU 1'; // Označenie pre prvé GPU
        this.chart4k.data.datasets[1].label = 'GPU 2'; // Označenie pre druhé GPU

        // Nastavuje dáta pre 4K graf pre obe GPU (herné, ťažobné, a renderovacie hodnoty)
        this.chart4k.data.datasets[0].data = [
            gpu1.performance.gaming4k, // Hodnota herného výkonu pre GPU 1
            gpu1.performance.mining, // Hodnota ťažobného výkonu pre GPU 1
            gpu1.performance.rendering // Hodnota renderovacieho výkonu pre GPU 1
        ];

        this.chart4k.data.datasets[1].data = [
            gpu2.performance.gaming4k, // Hodnota herného výkonu pre GPU 2
            gpu2.performance.mining, // Hodnota ťažobného výkonu pre GPU 2
            gpu2.performance.rendering // Hodnota renderovacieho výkonu pre GPU 2
        ];

        // Nastavuje dáta pre 1440p graf pre obe GPU (rovnaké kategórie ako pre 4K)
        this.chart1440p.data.datasets[0].data = [
            gpu1.performance.gaming1440p, // Hodnota herného výkonu pre GPU 1 v rozlíšení 1440p
            gpu1.performance.mining, // Hodnota ťažobného výkonu pre GPU 1
            gpu1.performance.rendering // Hodnota renderovacieho výkonu pre GPU 1
        ];

        this.chart1440p.data.datasets[1].data = [
            gpu2.performance.gaming1440p, // Hodnota herného výkonu pre GPU 2 v rozlíšení 1440p
            gpu2.performance.mining, // Hodnota ťažobného výkonu pre GPU 2
            gpu2.performance.rendering // Hodnota renderovacieho výkonu pre GPU 2
        ];

        // Aktualizuje oba grafy, aby sa nové dáta zobrazili
        this.chart4k.update(); // Aktualizácia 4K grafu
        this.chart1440p.update(); // Aktualizácia 1440p grafu
    }
}

// Spustenie skriptu po načítaní celej stránky (DOMContentLoaded - keď sa HTML načíta)
document.addEventListener('DOMContentLoaded', () => {
    // Vytvorí novú inštanciu triedy GPUComparison a inicializuje ju
    const gpuComparison = new GPUComparison();
});
