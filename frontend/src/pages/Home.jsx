import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
    Cpu,
    Gauge,
    Thermometer,
    Zap,
    DollarSign,
    ChevronRight,
    LineChart,
    Shield,
    Settings,
    Users
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

FeatureCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

const GpuCard = ({ gpu, onHover }) => {
    const { name, brand, specs, price, features } = gpu;

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl relative group"
            onMouseEnter={() => onHover(gpu)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />

            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <div className="text-gray-600 dark:text-gray-300 mb-4">{brand}</div>

            <div className="space-y-3 mb-4">
                {specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        {index === 0 && <Cpu className="h-4 w-4" />}
                        {index === 1 && <Gauge className="h-4 w-4" />}
                        {index === 2 && <Thermometer className="h-4 w-4" />}
                        {index === 3 && <Zap className="h-4 w-4" />}
                        <span>{spec}</span>
                    </div>
                ))}
                <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                    <DollarSign className="h-5 w-5" />
                    <span>{price}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {features.map((feature, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
                            text-xs px-2 py-1 rounded"
                    >
                        {feature}
                    </span>
                ))}
            </div>

            <div className="group-hover:opacity-100 opacity-0 transition-opacity absolute -right-4 top-1/2 
                transform -translate-y-1/2">
                <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <ChevronRight className="h-6 w-6" />
                </div>
            </div>

            <Link
                to="/compare"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
                    rounded transition-colors"
            >
                Compare
            </Link>
        </div>
    );
};

GpuCard.propTypes = {
    gpu: PropTypes.shape({
        name: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        specs: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        performance: PropTypes.object.isRequired
    }).isRequired,
    onHover: PropTypes.func.isRequired
};

const PerformancePreview = ({ gpu }) => {
    if (!gpu) return null;

    const performanceMetrics = [
        { label: '4K Gaming', value: gpu.performance.gaming4k },
        { label: '1440p Gaming', value: gpu.performance.gaming1440p },
        { label: 'Mining', value: gpu.performance.mining },
        { label: 'Rendering', value: gpu.performance.rendering }
    ];

    return (
        <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-80
            transform transition-all duration-300">
            <h4 className="text-lg font-bold mb-4">Performance Preview: {gpu.name}</h4>
            <div className="space-y-3">
                {performanceMetrics.map((metric, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{metric.label}</span>
                            <span>{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${metric.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

PerformancePreview.propTypes = {
    gpu: PropTypes.shape({
        name: PropTypes.string.isRequired,
        performance: PropTypes.shape({
            gaming4k: PropTypes.number.isRequired,
            gaming1440p: PropTypes.number.isRequired,
            mining: PropTypes.number.isRequired,
            rendering: PropTypes.number.isRequired
        }).isRequired
    })
};

const Home = () => {
    const [hoveredGpu, setHoveredGpu] = useState(null);

    const gpuData = [
        {
            name: "RTX 4090",
            brand: "NVIDIA GeForce",
            specs: [
                "24GB GDDR6X",
                "16384 CUDA Cores",
                "2.52 GHz Boost",
                "450W TDP"
            ],
            price: "1,599",
            features: ["DLSS 3", "Ray Tracing", "Tensor Cores", "PCIe 4.0"],
            performance: {
                gaming4k: 100,
                gaming1440p: 100,
                mining: 95,
                rendering: 100
            }
        },
        {
            name: "RX 7900 XTX",
            brand: "AMD Radeon",
            specs: [
                "24GB GDDR6",
                "6144 Stream Processors",
                "2.5 GHz Game Clock",
                "355W TDP"
            ],
            price: "999",
            features: ["FSR 3", "Ray Tracing", "Infinity Cache", "PCIe 4.0"],
            performance: {
                gaming4k: 90,
                gaming1440p: 95,
                mining: 85,
                rendering: 80
            }
        },
        {
            name: "Arc A770",
            brand: "Intel",
            specs: [
                "16GB GDDR6",
                "4096 Xe Cores",
                "2.1 GHz",
                "225W TDP"
            ],
            price: "349",
            features: ["XeSS", "Ray Tracing", "AV1 Encode", "PCIe 4.0"],
            performance: {
                gaming4k: 60,
                gaming1440p: 70,
                mining: 50,
                rendering: 65
            }
        }
    ];

    const features = [
        {
            icon: LineChart,
            title: "Performance Analytics",
            description: "Compare GPUs across multiple performance metrics with detailed benchmarks and real-world data"
        },
        {
            icon: Shield,
            title: "Security First",
            description: "Your data is protected with state-of-the-art security measures and GDPR compliance"
        },
        {
            icon: Settings,
            title: "Advanced Filtering",
            description: "Find exactly what you need with powerful sorting and filtering capabilities"
        },
        {
            icon: Users,
            title: "User Management",
            description: "Comprehensive user management system with full CRUD operations"
        }
    ];
    const navigate = useNavigate();

    const handleCompareClick = (e) => {
        e.preventDefault();
        navigate('/compare');
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate('/register');
    };;

    return (
        <div>
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">GPU Comparison Tool</h1>
                        <p className="text-xl mb-8">
                            Make informed decisions with our comprehensive GPU comparison platform.
                            Compare specifications, performance metrics, and user experiences all in one place.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleCompareClick}
                                type="button"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg 
                                    font-semibold transition-colors cursor-pointer"
                            >
                                Compare GPUs
                            </button>
                            <button
                                onClick={handleRegisterClick}
                                type="button"
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 
                                    px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-10" />
                    <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-10" />
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Graphics Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gpuData.map((gpu, index) => (
                            <GpuCard key={index} gpu={gpu} onHover={setHoveredGpu} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </section>
            </div>

            <PerformancePreview gpu={hoveredGpu} />
        </div>
    );
};

export default Home;