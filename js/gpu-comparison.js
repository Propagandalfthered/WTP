class GPUComparison {
    constructor() {
        this.gpuData = {
            'NVIDIA RTX 4090': {
                vram: '24GB GDDR6X',
                coreClock: '2.52 GHz',
                tdp: '450W',
                cores: '16384 CUDA',
                rayTracing: 'Yes',
                price: '1599',
                performance: {
                    gaming4k: 100,
                    gaming1440p: 100,
                    mining: 95,
                    rendering: 100
                }
            },
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
            }
        };

        this.init();
    }

    init() {

        const select1 = document.getElementById('gpu1Select');
        const select2 = document.getElementById('gpu2Select');

        if (select1 && select2) {

            this.populateSelect(select1);
            this.populateSelect(select2);

            select1.addEventListener('change', () => this.updateComparison());
            select2.addEventListener('change', () => this.updateComparison());

            select2.selectedIndex = 1;
            this.updateComparison();
        }

        this.initCharts();
    }

    populateSelect(select) {
        select.innerHTML = '<option value="">Select GPU</option>';
        Object.keys(this.gpuData).forEach(gpu => {
            select.innerHTML += `<option value="${gpu}">${gpu}</option>`;
        });
    }

    updateComparison() {
        const gpu1Name = document.getElementById('gpu1Select').value;
        const gpu2Name = document.getElementById('gpu2Select').value;

        if (!gpu1Name || !gpu2Name) return;

        const gpu1 = this.gpuData[gpu1Name];
        const gpu2 = this.gpuData[gpu2Name];

        this.updateSpecsTable(gpu1, gpu2);

        this.updateCharts(gpu1, gpu2);
    }

    updateSpecsTable(gpu1, gpu2) {
        const fields = ['vram', 'coreClock', 'tdp', 'cores', 'rayTracing', 'price'];
        const displayNames = {
            vram: 'VRAM',
            coreClock: 'Core Clock',
            tdp: 'TDP',
            cores: 'Cores',
            rayTracing: 'Ray Tracing',
            price: 'Price (USD)'
        };

        fields.forEach(field => {
            document.getElementById(`${field}1`).textContent = gpu1[field];
            document.getElementById(`${field}2`).textContent = gpu2[field];

            const diff = document.getElementById(`${field}Diff`);
            if (field === 'price' || field === 'tdp') {
                const val1 = parseInt(gpu1[field]);
                const val2 = parseInt(gpu2[field]);
                const difference = val2 - val1;
                diff.textContent = difference > 0 ? `+${difference}` : difference;
                diff.className = difference > 0 ? 'text-danger' : 'text-success';
            } else {
                diff.textContent = '-';
            }
        });
    }

    initCharts() {
        const ctx4k = document.getElementById('chart4k').getContext('2d');
        const ctx1440p = document.getElementById('chart1440p').getContext('2d');

        this.chart4k = new Chart(ctx4k, {
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
                        text: '4K Performance Comparison'
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
                        text: '1440p Performance Comparison'
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

    updateCharts(gpu1, gpu2) {
        this.chart4k.data.datasets[0].label = 'GPU 1';
        this.chart4k.data.datasets[1].label = 'GPU 2';

        this.chart4k.data.datasets[0].data = [
            gpu1.performance.gaming4k,
            gpu1.performance.mining,
            gpu1.performance.rendering
        ];

        this.chart4k.data.datasets[1].data = [
            gpu2.performance.gaming4k,
            gpu2.performance.mining,
            gpu2.performance.rendering
        ];

        this.chart1440p.data.datasets[0].data = [
            gpu1.performance.gaming1440p,
            gpu1.performance.mining,
            gpu1.performance.rendering
        ];

        this.chart1440p.data.datasets[1].data = [
            gpu2.performance.gaming1440p,
            gpu2.performance.mining,
            gpu2.performance.rendering
        ];

        this.chart4k.update();
        this.chart1440p.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gpuComparison = new GPUComparison();
});