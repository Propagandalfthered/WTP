import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GpuComparison = ({ gpus, metrics }) => {
    const generateComparisonData = () => {
        return metrics.map(metric => ({
            name: metric.name,
            GPU1: gpus[0]?.performance[metric.key] || 0,
            GPU2: gpus[1]?.performance[metric.key] || 0,
        }));
    };

    if (!gpus || gpus.length < 2) {
        return (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                Please select two GPUs to compare
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Specifications Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="text-left py-2">Specification</th>
                                <th className="text-left py-2">{gpus[0].name}</th>
                                <th className="text-left py-2">{gpus[1].name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['vram', 'coreClock', 'tdp', 'cores', 'rayTracing', 'price'].map(spec => (
                                <tr key={spec} className="border-b dark:border-gray-700">
                                    <td className="py-2 capitalize">{spec.replace(/([A-Z])/g, ' $1').trim()}</td>
                                    <td className="py-2">{gpus[0][spec]}</td>
                                    <td className="py-2">{gpus[1][spec]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateComparisonData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="GPU1"
                                stroke="#3B82F6"
                                name={gpus[0].name}
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="GPU2"
                                stroke="#EF4444"
                                name={gpus[1].name}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

GpuComparison.propTypes = {
    gpus: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            vram: PropTypes.string.isRequired,
            coreClock: PropTypes.string.isRequired,
            tdp: PropTypes.string.isRequired,
            cores: PropTypes.string.isRequired,
            rayTracing: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            performance: PropTypes.object.isRequired,
        })
    ).isRequired,
    metrics: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default GpuComparison;