import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(
            savedTheme === 'dark' ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 
        transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeSwitcher;