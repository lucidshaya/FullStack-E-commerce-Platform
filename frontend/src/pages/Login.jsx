import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       
    

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Login successful!");
            navigate('/');
        } catch (error) {
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm'>
                <div className='flex justify-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>LOGIN</h2>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                    
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
                            />
                            <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                                Remember me
                            </label>
                        </div>
                        
                        <div className='text-sm'>
                            <a href='/forgot-password' className='font-medium text-black hover:text-gray-600'>
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
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
                                Or continue with
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
                        Don't have an account?{' '}
                        <a href='/signup' className='font-medium text-black hover:text-gray-600 transition-colors'>
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;