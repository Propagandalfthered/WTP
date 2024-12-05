import { useState, useEffect } from 'react';

const Changes = () => {
    const [fontSize, setFontSize] = useState('medium');
    const [showSizeMenu, setShowSizeMenu] = useState(false);
    const [method, setMethod] = useState('buttons');

    const sizes = {
        small: {
            text: '14px',
            heading: '24px',
            container: '90%'
        },
        medium: {
            text: '16px',
            heading: '28px',
            container: '95%'
        },
        large: {
            text: '18px',
            heading: '32px',
            container: '100%'
        }
    };

    useEffect(() => {
        // Загружаем сохраненный размер при монтировании
        const savedSize = localStorage.getItem('preferredSize');
        if (savedSize) {
            setFontSize(savedSize);
            applySize(savedSize);
        }

        // Настраиваем обработчик клавиатуры
        function handleKeyPress(e) {
            if (method === 'keyboard' && e.shiftKey) {
                // Convert key code to string to handle both numpad and regular numbers
                const key = e.key;
                console.log('Key pressed:', key); // Для отладки

                switch (key) {
                    case '1':
                    case '!':
                        e.preventDefault();
                        handleSizeChange('small');
                        break;
                    case '2':
                    case '@':
                        e.preventDefault();
                        handleSizeChange('medium');
                        break;
                    case '3':
                    case '#':
                        e.preventDefault();
                        handleSizeChange('large');
                        break;
                }
            }
        }

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            // Очищаем стили и слушатель при размонтировании
            resetStyles();
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [method]);

    const applySize = (size) => {
        const sectionElement = document.querySelector('.section-changes');
        if (!sectionElement) return;

        const currentSize = sizes[size];
        sectionElement.style.fontSize = currentSize.text;

        const headings = sectionElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => h.style.fontSize = currentSize.heading);

        sectionElement.style.width = currentSize.container;
        sectionElement.style.transition = 'all 0.3s ease';
    };

    const resetStyles = () => {
        const sectionElement = document.querySelector('.section-changes');
        if (!sectionElement) return;

        sectionElement.style.fontSize = '';
        sectionElement.style.width = '';
        const headings = sectionElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => h.style.fontSize = '');
    };

    const handleSizeChange = (size) => {
        // Проверяем, что размер допустимый
        if (!sizes[size]) return;

        setFontSize(size);
        localStorage.setItem('preferredSize', size);
        applySize(size);

        // Для отладки
        console.log('Size changed to:', size);
    };

    const handleMethodChange = (newMethod) => {
        setMethod(newMethod);
        if (newMethod !== 'dropdown') {
            setShowSizeMenu(false);
        }
    };

    return (
        <div className="section-changes">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Changes and Accessibility Features</h1>
                    <p className="text-lg">Customize your viewing experience and learn about our improvements</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Content Size Controls */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Content Size Controls</h2>

                        {/* Method Selection */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Select Control Method:</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    className={`p-2 rounded ${method === 'buttons' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    onClick={() => handleMethodChange('buttons')}
                                >
                                    Buttons
                                </button>
                                <button
                                    className={`p-2 rounded ${method === 'dropdown' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    onClick={() => handleMethodChange('dropdown')}
                                >
                                    Dropdown
                                </button>
                                <button
                                    className={`p-2 rounded ${method === 'keyboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    onClick={() => handleMethodChange('keyboard')}
                                >
                                    Keyboard
                                </button>
                            </div>
                        </div>

                        {/* Size Controls */}
                        <div className="space-y-4">
                            {method === 'buttons' && (
                                <div>
                                    <h3 className="font-medium mb-2">Size Buttons</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleSizeChange('small')}
                                            className={`px-4 py-2 rounded ${fontSize === 'small' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                        >
                                            Small
                                        </button>
                                        <button
                                            onClick={() => handleSizeChange('medium')}
                                            className={`px-4 py-2 rounded ${fontSize === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                        >
                                            Medium
                                        </button>
                                        <button
                                            onClick={() => handleSizeChange('large')}
                                            className={`px-4 py-2 rounded ${fontSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                        >
                                            Large
                                        </button>
                                    </div>
                                </div>
                            )}

                            {method === 'dropdown' && (
                                <div>
                                    <h3 className="font-medium mb-2">Size Dropdown</h3>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSizeMenu(!showSizeMenu)}
                                            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded flex justify-between items-center"
                                        >
                                            <span>{fontSize.charAt(0).toUpperCase() + fontSize.slice(1)} Size</span>
                                            <svg
                                                className={`w-5 h-5 transform ${showSizeMenu ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {showSizeMenu && (
                                            <div className="absolute w-full mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow-lg">
                                                <button
                                                    onClick={() => {
                                                        handleSizeChange('small');
                                                        setShowSizeMenu(false);
                                                    }}
                                                    className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                                                >
                                                    Small
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleSizeChange('medium');
                                                        setShowSizeMenu(false);
                                                    }}
                                                    className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                                                >
                                                    Medium
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleSizeChange('large');
                                                        setShowSizeMenu(false);
                                                    }}
                                                    className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                                                >
                                                    Large
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {method === 'keyboard' && (
                                <div>
                                    <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center space-x-2">
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Shift</span>
                                            <span>+</span>
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">1</span>
                                            <span>: Small size</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Shift</span>
                                            <span>+</span>
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">2</span>
                                            <span>: Medium size</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Shift</span>
                                            <span>+</span>
                                            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">3</span>
                                            <span>: Large size</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Accessibility Features */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Accessibility Features</h2>
                        <ul className="space-y-2">
                            <li>Multiple text size control methods</li>
                            <li>Keyboard shortcuts</li>
                            <li>High contrast color options</li>
                            <li>Clear visual hierarchy</li>
                            <li>ARIA labels for screen readers</li>
                        </ul>
                    </div>

                    {/* Technical Enhancements */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Technical Enhancements</h2>
                        <ul className="space-y-2">
                            <li>Bootstrap 5 integration</li>
                            <li>Dynamic CSS loading</li>
                            <li>Chart.js for data visualization</li>
                            <li>Local storage for preferences</li>
                            <li>Optimized performance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Changes;