import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
    Cpu,
    Thermometer,
    Zap,
    DollarSign,
    MemoryStick,
    RefreshCcw,
    Info
} from 'lucide-react';

const GpuSelect = ({ value, onChange, gpuList, side }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 
                    rounded-lg shadow-lg border-2 transition-colors hover:border-blue-500
                    ${value ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'}`}
            >
                <span className="font-medium">
                    {value ? value : `Select ${side} GPU`}
                </span>
                <RefreshCcw
                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                    border border-gray-200 dark:border-gray-700">
                    {gpuList.map((gpu) => (
                        <button
                            key={gpu.name}
                            onClick={() => {
                                onChange(gpu.name);
                                setIsOpen(false);
                            }}
                            className={`w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 
                                transition-colors first:rounded-t-lg last:rounded-b-lg
                                ${value === gpu.name ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                        >
                            <div className="font-medium mb-1">{gpu.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{gpu.vram}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

GpuSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    gpuList: PropTypes.array.isRequired,
    side: PropTypes.string.isRequired
};

const SpecRow = ({ label, value1, value2, icon: Icon }) => {
    const getDifference = () => {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        if (isNaN(num1) || isNaN(num2)) return null;

        const diff = ((num1 - num2) / num2 * 100).toFixed(1);
        return diff > 0 ? `+${diff}%` : `${diff}%`;
    };

    const difference = getDifference();

    return (
        <div className="grid grid-cols-7 gap-4 py-3 items-center border-b dark:border-gray-700 
            hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="col-span-3 flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{label}</span>
            </div>
            <div className="col-span-2 text-center">{value1 || '-'}</div>
            <div className="col-span-2 text-center flex items-center justify-center gap-2">
                <span>{value2 || '-'}</span>
                {difference && (
                    <span className={`text-sm ${parseFloat(difference) > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {difference}
                    </span>
                )}
            </div>
        </div>
    );
};

SpecRow.propTypes = {
    label: PropTypes.string.isRequired,
    value1: PropTypes.string,
    value2: PropTypes.string,
    icon: PropTypes.elementType.isRequired
};

const Compare = () => {
    const [gpu1, setGpu1] = useState('');
    const [gpu2, setGpu2] = useState('');
    const [activeChart, setActiveChart] = useState('line');
    const [gpuData] = useState([
        {
            name: "RTX 4090",
            vram: "24GB GDDR6X",
            coreClock: "2.52 GHz",
            tdp: "450W",
            cores: "16384 CUDA",
            rayTracing: "Yes",
            price: "1599",
            memoryBandwidth: "1008 GB/s",
            processNode: "5nm",
            releaseDate: "2022",
            performance: {
                gaming4k: 100,
                gaming1440p: 100,
                mining: 95,
                rendering: 100,
                rayTracing: 100,
                powerEfficiency: 85
            }
        },
        {
            name: "RX 7900 XTX",
            vram: "24GB GDDR6",
            coreClock: "2.5 GHz",
            tdp: "355W",
            cores: "6144 Stream",
            rayTracing: "Yes",
            price: "999",
            memoryBandwidth: "960 GB/s",
            processNode: "5nm",
            releaseDate: "2022",
            performance: {
                gaming4k: 90,
                gaming1440p: 95,
                mining: 85,
                rendering: 80,
                rayTracing: 75,
                powerEfficiency: 90
            }
        },
        {
            name: "Arc A770",
            vram: "16GB GDDR6",
            coreClock: "2.1 GHz",
            tdp: "225W",
            cores: "4096 Xe",
            rayTracing: "Yes",
            price: "349",
            memoryBandwidth: "560 GB/s",
            processNode: "6nm",
            releaseDate: "2022",
            performance: {
                gaming4k: 60,
                gaming1440p: 70,
                mining: 50,
                rendering: 65,
                rayTracing: 60,
                powerEfficiency: 95
            }
        }
    ]);

    const selectedGpu1 = gpuData.find(gpu => gpu.name === gpu1);
    const selectedGpu2 = gpuData.find(gpu => gpu.name === gpu2);

    const generateLineChartData = () => {
        const metrics = ['gaming4k', 'gaming1440p', 'mining', 'rendering'];
        return metrics.map(metric => ({
            name: metric.replace(/([A-Z])/g, ' $1').toLowerCase(),
            GPU1: selectedGpu1?.performance[metric] || 0,
            GPU2: selectedGpu2?.performance[metric] || 0,
        }));
    };

    const generateRadarChartData = () => {
        if (!selectedGpu1 || !selectedGpu2) return [];

        return Object.entries(selectedGpu1.performance).map(([key, value]) => ({
            subject: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
            GPU1: value,
            GPU2: selectedGpu2.performance[key],
            fullMark: 100,
        }));
    };

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Compare GPUs</h1>
                    <p className="text-lg">Select two graphics cards to compare their specifications and performance</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <GpuSelect
                        value={gpu1}
                        onChange={setGpu1}
                        gpuList={gpuData}
                        side="first"
                    />
                    <GpuSelect
                        value={gpu2}
                        onChange={setGpu2}
                        gpuList={gpuData}
                        side="second"
                    />
                </div>

                {selectedGpu1 && selectedGpu2 ? (
                    <>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-xl font-bold mb-6">Specifications Comparison</h2>
                            <div className="grid grid-cols-7 gap-4 py-3 border-b dark:border-gray-700 text-sm font-medium">
                                <div className="col-span-3">Specification</div>
                                <div className="col-span-2 text-center">{selectedGpu1.name}</div>
                                <div className="col-span-2 text-center">{selectedGpu2.name}</div>
                            </div>
                            <SpecRow
                                label="VRAM"
                                value1={selectedGpu1.vram}
                                value2={selectedGpu2.vram}
                                icon={MemoryStick}
                            />
                            <SpecRow
                                label="Core Clock"
                                value1={selectedGpu1.coreClock}
                                value2={selectedGpu2.coreClock}
                                icon={Cpu}
                            />
                            <SpecRow
                                label="TDP"
                                value1={selectedGpu1.tdp}
                                value2={selectedGpu2.tdp}
                                icon={Thermometer}
                            />
                            <SpecRow
                                label="Memory Bandwidth"
                                value1={selectedGpu1.memoryBandwidth}
                                value2={selectedGpu2.memoryBandwidth}
                                icon={Zap}
                            />
                            <SpecRow
                                label="Price"
                                value1={`$${selectedGpu1.price}`}
                                value2={`$${selectedGpu2.price}`}
                                icon={DollarSign}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Performance Comparison</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveChart('line')}
                                        className={`px-4 py-2 rounded-lg transition-colors ${activeChart === 'line'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700'
                                            }`}
                                    >
                                        Line Chart
                                    </button>
                                    <button
                                        onClick={() => setActiveChart('radar')}
                                        className={`px-4 py-2 rounded-lg transition-colors ${activeChart === 'radar'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700'
                                            }`}
                                    >
                                        Radar Chart
                                    </button>
                                </div>
                            </div>

                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    {activeChart === 'line' ? (
                                        <LineChart data={generateLineChartData()}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="GPU1"
                                                stroke="#3B82F6"
                                                name={selectedGpu1.name}
                                                strokeWidth={2}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="GPU2"
                                                stroke="#EF4444"
                                                name={selectedGpu2.name}
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    ) : (
                                        <RadarChart data={generateRadarChartData()}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                            <Radar
                                                name={selectedGpu1.name}
                                                dataKey="GPU1"
                                                stroke="#3B82F6"
                                                fill="#3B82F6"
                                                fillOpacity={0.6}
                                            />
                                            <Radar
                                                name={selectedGpu2.name}
                                                dataKey="GPU2"
                                                stroke="#EF4444"
                                                fill="#EF4444"
                                                fillOpacity={0.6}
                                            />
                                            <Legend />
                                        </RadarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg flex items-center gap-4">
                        <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <p>Please select two GPUs to see their comparison</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compare;