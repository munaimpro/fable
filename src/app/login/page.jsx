'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Sparkles, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Sample credentials for quick testing
    const sampleAccounts = [
        { label: 'Admin (System)', email: 'admin@fable.com', password: 'Admin@123', role: 'admin' },
        { label: 'Writer (Author)', email: 'writer@fable.com', password: 'Writer@123', role: 'writer' },
        { label: 'Reader (Buyer)', email: 'reader@fable.com', password: 'Reader@123', role: 'user' },
    ];

    const handlePreFill = (acc) => {
        setEmail(acc.email);
        setPassword(acc.password);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (!email || !password) {
            toast.error('Please specify both email and password.');
            return;
        }

        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries());

        

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            rememberMe: false,
        })

        if (data) {
            // Reset form
            form.reset();
            router.push('/');
        }
    
        if (error) {
            toast.error(error.message || 'Login failed.');
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google',
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
            <main className="flex-grow flex items-center justify-center p-4 py-16 relative overflow-hidden" id="login-space">
                <div className="absolute inset-0 radial-blur z-0" />

                <div className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-2xl shadow-xl p-6 sm:p-10 space-y-6">

                    <div className="space-y-2 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                            <BookOpen className="h-5.5 w-5.5 text-zinc-950 stroke-[2.5]" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
                            Sign In to Fable
                        </h2>
                        <p className="text-xs text-zinc-500">
                            Access your personalized digital library, publishing dashboard, or admin ledger.
                        </p>
                    </div>

                    {/* Preset Buttons for Quick Testing */}
                    <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 space-y-3 animate-fade-in">
                        <div className="flex items-center gap-1.5 text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold justify-center sm:justify-start">
                            <Sparkles className="w-4 h-4" />
                            <span>Quick Test Account Profiles</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                            {sampleAccounts.map((acc, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handlePreFill(acc)}
                                    className="cursor-pointer flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-850 text-center hover:border-amber-500/30 transition duration-200"
                                >
                                    <span className="text-[10.5px] font-bold text-zinc-200">{acc.label}</span>
                                    <span className="text-[9px] text-amber-500 font-mono font-semibold uppercase tracking-wider mt-0.5">{acc.role}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs text-left">
                            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value); setError(''); }}
                                placeholder="admin@fable.com"
                                required
                                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-1.5 relative">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value); setError(''); }}
                                    placeholder="******"
                                    required
                                    className="w-full rounded-lg bg-zinc-900 border border-zinc-800 pl-3.5 pr-10 py-2 text-sm text-zinc-100 placeholder:text-zinc-650 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-semibold text-zinc-950 shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5"
                        >
                            {loading ? (
                                <div className="h-4.5 w-4.5 animate-spin rounded-full border-t-2 border-r-2 border-zinc-950 border-solid" />
                            ) : (
                                <>
                                    <span>Sign In Securely</span>
                                    <ArrowRight className="w-4 h-4 text-zinc-950" />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-zinc-850" />
                        <span className="flex-shrink mx-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Or Continue with</span>
                        <div className="flex-grow border-t border-zinc-850" />
                    </div>

                    {/* Mock Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="cursor-pointer w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-sm font-semibold text-zinc-200 transition flex items-center justify-center gap-2"
                    >
                        <svg className="h-4 w-4 bg-transparent fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.71 0 3.27.614 4.5 1.636l2.455-2.455C17.482 1.91 15.014 1 12.24 1 6.586 1 2 5.586 2 11.24s4.586 10.24 10.24 10.24c5.905 0 9.818-4.145 9.818-10 0-.6-.055-1.186-.164-1.745H12.24z" />
                        </svg>
                        <span>Google Authentic Sign In</span>
                    </button>

                    {/* Direct register */}
                    <div className="text-center pt-2">
                        <span className="text-xs text-zinc-500">New here? </span>
                        <Link href="/register" className="text-xs font-semibold text-amber-500 hover:underline">
                            Create a free account
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default LoginPage;