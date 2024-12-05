import { useState, useEffect } from 'react';
import UserManager from '../components/UserManager';
import _ from 'lodash';

const GDPRNotice = () => (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">GDPR Compliance Notice</h3>
        <p className="text-sm">
            This application processes personal data in accordance with GDPR. By using this service, you acknowledge that:
            - We only collect necessary data for user registration and management
            - Your data is stored securely and protected against unauthorized access
            - You have the right to request data deletion at any time
            - We do not share your personal information with third parties
        </p>
    </div>
);

const Manage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sort, setSort] = useState({ column: 'id', direction: 'asc' });

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/manager.php');
            if (!response.ok) throw new Error('Failed to fetch users');

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Response was not JSON");
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
                setFilteredUsers(data);
                setError('');
            } else if (data.error) {
                throw new Error(data.error);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/manager.php?delete=${id}`);
            if (!response.ok) throw new Error('Failed to delete user');

            const data = await response.json();
            if (data.success) {
                await fetchUsers();
                setError('');
            } else {
                throw new Error(data.message || 'Failed to delete user');
            }
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete user. Please try again.');
        }
    };

    const handleSort = (column) => {
        const direction = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
        setSort({ column, direction });

        const sorted = _.orderBy(filteredUsers, [column], [direction]);
        setFilteredUsers(sorted);
    };

    const handleFilter = (filters) => {
        let result = users;

        if (filters.name) {
            result = result.filter(user =>
                user.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.country) {
            result = result.filter(user =>
                user.country.toLowerCase().includes(filters.country.toLowerCase())
            );
        }
        if (filters.email) {
            result = result.filter(user =>
                user.email.toLowerCase().includes(filters.email.toLowerCase())
            );
        }
        if (filters.birth_year) {
            result = result.filter(user =>
                user.birth_year.toString().includes(filters.birth_year)
            );
        }

        setFilteredUsers(result);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
                    <p className="text-lg">View, filter, sort, and manage registered users</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <GDPRNotice />

                <UserManager
                    users={filteredUsers}
                    onDelete={handleDelete}
                    onSort={handleSort}
                    onFilter={handleFilter}
                    sortConfig={sort}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Manage;