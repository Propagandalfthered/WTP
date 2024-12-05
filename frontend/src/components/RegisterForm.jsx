import { useState } from 'react';
import PropTypes from 'prop-types';
import { Mail, Lock, User, Calendar, Globe, Phone, AlertCircle, CheckCircle2, Info, Shield, Eye, EyeOff, FileText } from 'lucide-react';

const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    icon: Icon,
    required = false,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon className="h-5 w-5" />
                </div>
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 
                        focus:outline-none transition-colors
                        ${error
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 dark:border-gray-600'
                        } 
                        ${isPassword ? 'pr-12' : 'pr-4'}
                        dark:bg-gray-800`}
                    required={required}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                            hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
            </div>
            {error && (
                <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string
};

const PasswordStrength = ({ password }) => {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };

    const strength = Object.values(checks).filter(Boolean).length;

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i < strength
                                ? 'bg-blue-500'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    />
                ))}
            </div>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {Object.entries(checks).map(([key, passed]) => (
                    <li key={key} className="flex items-center gap-2">
                        {passed
                            ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                            : <AlertCircle className="h-4 w-4 text-gray-400" />
                        }
                        {key === 'length' && 'At least 8 characters'}
                        {key === 'uppercase' && 'One uppercase letter'}
                        {key === 'lowercase' && 'One lowercase letter'}
                        {key === 'number' && 'One number'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

PasswordStrength.propTypes = {
    password: PropTypes.string.isRequired
};

const TextArea = ({ value, onChange }) => (
    <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Notes (optional)</label>
        <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
                <FileText className="h-5 w-5" />
            </div>
            <textarea
                name="notes"
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 min-h-[100px] border border-gray-300 
                    dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-200 
                    focus:outline-none dark:bg-gray-800"
                placeholder="Add any additional information..."
            />
        </div>
    </div>
);

TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const GDPRConsent = ({ checked, onChange }) => (
    <div className="mb-6">
        <div className="flex items-start gap-3">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded
                    focus:ring-blue-500"
            />
            <div>
                <p className="text-sm font-medium">
                    I consent to the processing of my personal data
                </p>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Data stored securely
                    </li>
                    <li className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-green-500" />
                        Access and deletion rights preserved
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

const RegisterForm = ({ onSubmit, errors }) => {
    const [formData, setFormData] = useState({
        name: '',
        birth_year: '',
        country: '',
        email: '',
        password: '',
        phone: '',
        notes: ''
    });

    const [gdprConsent, setGdprConsent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gdprConsent) {
            return;
        }
        onSubmit({ ...formData, gdprConsent });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <FormInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors?.name}
                icon={User}
                required
                placeholder="John Doe"
            />

            <FormInput
                label="Year of Birth"
                name="birth_year"
                type="number"
                value={formData.birth_year}
                onChange={handleChange}
                error={errors?.birth_year}
                icon={Calendar}
                required
                placeholder="1990"
            />

            <FormInput
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors?.country}
                icon={Globe}
                required
                placeholder="United States"
            />

            <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors?.email}
                icon={Mail}
                required
                placeholder="john@example.com"
            />

            <div>
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors?.password}
                    icon={Lock}
                    required
                />
                {formData.password && <PasswordStrength password={formData.password} />}
            </div>

            <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors?.phone}
                icon={Phone}
                placeholder="+1 234 567 8900"
            />

            <TextArea
                value={formData.notes}
                onChange={handleChange}
            />

            <GDPRConsent
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
                    hover:bg-blue-700 focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50
                    disabled:cursor-not-allowed transition-colors"
                disabled={!gdprConsent}
            >
                Register
            </button>
        </form>
    );
};

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default RegisterForm;