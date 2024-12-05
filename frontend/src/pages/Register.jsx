import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Info,
    Shield,
    AlertCircle,
    CheckCircle2,
    Lock,
    Mail,
    User,
    Calendar,
    Globe,
    Phone,
    FileText,
    Eye,
    EyeOff
} from 'lucide-react';
import PropTypes from 'prop-types';

const InputField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    icon: Icon,
    required = false,
    placeholder,
    autoComplete
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors
                    ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <input
                    type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`w-full pl-10 pr-${isPasswordField ? '12' : '4'} py-2 rounded-lg border transition-colors
                        focus:outline-none focus:ring-2 focus:ring-opacity-50
                        ${error
                            ? 'border-red-500 focus:ring-red-200'
                            : isFocused
                                ? 'border-blue-500 focus:ring-blue-200'
                                : 'border-gray-300 dark:border-gray-600'
                        }
                        ${error ? 'bg-red-50' : 'bg-white dark:bg-gray-800'}`}
                    required={required}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                            hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string
};

const PasswordStrength = ({ password }) => {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const strength = Object.values(checks).filter(Boolean).length;
    const getStrengthText = () => {
        if (strength <= 2) return { text: 'Weak', color: 'text-red-500' };
        if (strength <= 3) return { text: 'Moderate', color: 'text-yellow-500' };
        if (strength <= 4) return { text: 'Strong', color: 'text-green-500' };
        return { text: 'Very Strong', color: 'text-emerald-500' };
    };

    const strengthInfo = getStrengthText();

    return (
        <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Password Strength:</span>
                <span className={`text-sm font-medium ${strengthInfo.color}`}>
                    {strengthInfo.text}
                </span>
            </div>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${i < strength
                                ? getStrengthText().color.replace('text', 'bg')
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    />
                ))}
            </div>
            <ul className="space-y-1 mt-2">
                {Object.entries(checks).map(([key, passed]) => (
                    <li
                        key={key}
                        className={`text-sm flex items-center gap-2 
                            ${passed ? 'text-green-500' : 'text-gray-500'}`}
                    >
                        {passed ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        {key === 'length' && 'At least 8 characters'}
                        {key === 'uppercase' && 'One uppercase letter'}
                        {key === 'lowercase' && 'One lowercase letter'}
                        {key === 'number' && 'One number'}
                        {key === 'special' && 'One special character'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

PasswordStrength.propTypes = {
    password: PropTypes.string.isRequired
};

const GDPRConsent = ({ checked, onChange }) => (
    <div className="mb-6">
        <div className="flex items-start gap-3">
            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                        focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                />
            </div>
            <div>
                <label className="text-sm font-medium">
                    I consent to the processing of my personal data
                </label>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Data stored securely and protected
                    </li>
                    <li className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-500" />
                        Access and deletion rights preserved
                    </li>
                    <li className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-green-500" />
                        Used only for user management
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

GDPRConsent.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        birth_year: '',
        country: '',
        email: '',
        password: '',
        phone: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});
    const [gdprConsent, setGdprConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateField = (name, value) => {
        if (name === 'name') {
            return !/^[A-Za-z\s]{2,100}$/.test(value)
                ? 'Name should contain only letters and spaces (2-100 characters)'
                : '';
        }

        if (name === 'birth_year') {
            const year = parseInt(value);
            const currentYear = new Date().getFullYear();
            return !year || year < 1900 || year > currentYear
                ? `Please enter a valid year between 1900 and ${currentYear}`
                : '';
        }

        if (name === 'country') {
            return !/^[A-Za-z\s]{2,100}$/.test(value)
                ? 'Country should contain only letters and spaces'
                : '';
        }

        if (name === 'email') {
            return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? 'Please enter a valid email address'
                : '';
        }

        if (name === 'password') {
            if (value.length < 8) return 'Password must be at least 8 characters long';
            if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
            if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
            if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
            return '';
        }

        if (name === 'phone' && value) {
            return !/^\+?[\d\s-]{10,}$/.test(value)
                ? 'Please enter a valid phone number'
                : '';
        }

        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!gdprConsent) {
            setSubmitStatus({
                type: 'error',
                message: 'Please accept the GDPR consent to continue'
            });
            return;
        }

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key === 'phone' || key === 'notes') return; // Skip optional fields
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Registration successful! You can now log in.'
                });
                // Reset form
                setFormData({
                    name: '',
                    birth_year: '',
                    country: '',
                    email: '',
                    password: '',
                    phone: '',
                    notes: ''
                });
                setGdprConsent(false);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'An error occurred. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Create Account</h1>
                    <p className="text-lg">Join our community and get access to all features</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence>
                        {submitStatus && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`p-4 mb-6 rounded-lg flex items-center gap-3
                                    ${submitStatus.type === 'success'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    }`}
                            >
                                {submitStatus.type === 'success'
                                    ? <CheckCircle2 className="h-5 w-5" />
                                    : <AlertCircle className="h-5 w-5" />
                                }
                                {submitStatus.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
                            <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-200">
                                <Info className="h-5 w-5" />
                                <h2 className="font-semibold">Registration Information</h2>
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                Fields marked with * are required. Please ensure all information is accurate.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                icon={User}
                                required
                                placeholder="John Doe"
                                autoComplete="name"
                            />

                            <InputField
                                label="Year of Birth"
                                name="birth_year"
                                type="number"
                                value={formData.birth_year}
                                onChange={handleChange}
                                error={errors.birth_year}
                                icon={Calendar}
                                required
                                placeholder="1990"
                            />

                            <InputField
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                error={errors.country}
                                icon={Globe}
                                required
                                placeholder="United States"
                                autoComplete="country"
                            />

                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                icon={Mail}
                                required
                                placeholder="john@example.com"
                                autoComplete="email"
                            />

                            <div>
                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    icon={Lock}
                                    required
                                    autoComplete="new-password"
                                />
                                {formData.password && <PasswordStrength password={formData.password} />}
                            </div>

                            <InputField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                icon={Phone}
                                placeholder="+1 234 567 8900"
                                autoComplete="tel"
                            />

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                                            dark:border-gray-600 focus:ring-2 focus:ring-blue-200 
                                            focus:border-blue-500 dark:bg-gray-800"
                                        rows="4"
                                        placeholder="Add any additional information..."
                                    />
                                </div>
                            </div>

                            <GDPRConsent
                                checked={gdprConsent}
                                onChange={(e) => setGdprConsent(e.target.checked)}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                                    transition-all duration-200 ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;