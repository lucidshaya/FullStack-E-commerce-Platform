// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Account created successfully!");
            navigate('/');
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm'>
                <div className='flex justify-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>CREATE ACCOUNT</h2>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1.5'>
                                First Name
                            </label>
                            <input
                                id='firstName'
                                name='firstName'
                                type='text'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='John'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1.5'>
                                Last Name
                            </label>
                            <input
                                id='lastName'
                                name='lastName'
                                type='text'
                                value={formData.lastName}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='Doe'
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='••••••••'
                                required
                                minLength={6}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <p className='mt-1 text-xs text-gray-500'>Minimum 6 characters</p>
                    </div>
                    
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Confirm Password
                        </label>
                        <input
                            id='confirmPassword'
                            name='confirmPassword'
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            placeholder='••••••••'
                            required
                        />
                    </div>
                    
                    <div className='flex items-center'>
                        <input
                            id='terms'
                            name='terms'
                            type='checkbox'
                            className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
                            required
                        />
                        <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                            I agree to the <a href='/terms' className='font-medium text-black hover:text-gray-600 transition-colors'>Terms</a> and <a href='/privacy' className='font-medium text-black hover:text-gray-600 transition-colors'>Privacy Policy</a>
                        </label>
                    </div>
                    
                    <div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>
                                Or sign up with
                            </span>
                        </div>
                    </div>
                    
                    <div className='mt-6 grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Google
                        </button>
                        <button
                            type='button'
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Facebook
                        </button>
                    </div>
                </div>
                
                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Already have an account?{' '}
                        <a href='/Login' className='font-medium text-black hover:text-gray-600 transition-colors'>
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;