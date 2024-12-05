import PropTypes from 'prop-types';
import { Search, ArrowUpDown } from 'lucide-react';

const UserManager = ({ users, onDelete, onSort, onFilter, sortConfig, loading, error }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilter({ [name]: value });
    };

    const FilterInput = ({ name, label }) => (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    onChange={handleFilterChange}
                    className="w-full p-2 pr-8 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder={`Filter by ${label.toLowerCase()}...`}
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
        </div>
    );

    FilterInput.propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    };

    const SortableHeader = ({ column, children }) => {
        const isActive = sortConfig?.column === column;

        return (
            <th
                onClick={() => onSort(column)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 
          uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            >
                <div className="flex items-center space-x-1">
                    <span>{children}</span>
                    <ArrowUpDown
                        className={`h-4 w-4 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
                    />
                </div>
            </th>
        );
    };

    SortableHeader.propTypes = {
        column: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative
          dark:bg-red-900 dark:text-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FilterInput name="name" label="Name" />
                    <FilterInput name="country" label="Country" />
                    <FilterInput name="email" label="Email" />
                    <FilterInput name="birth_year" label="Birth Year" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <SortableHeader column="id">ID</SortableHeader>
                                <SortableHeader column="name">Name</SortableHeader>
                                <SortableHeader column="birth_year">Year of Birth</SortableHeader>
                                <SortableHeader column="country">Country</SortableHeader>
                                <SortableHeader column="email">Email</SortableHeader>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Notes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.birth_year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.phone || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.notes || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => onDelete(user.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 
                        dark:hover:text-red-300 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

UserManager.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            birth_year: PropTypes.number.isRequired,
            country: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string,
            notes: PropTypes.string,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    sortConfig: PropTypes.shape({
        column: PropTypes.string.isRequired,
        direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
};

export default UserManager;