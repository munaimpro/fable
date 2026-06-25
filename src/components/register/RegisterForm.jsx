'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, ArrowRight, User, PenTool } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/utils/uploadImage';

const RegisterForm = () => {
    const router = useRouter();

    // Getting user data from session
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        setFormData({
            ...formData,
            image: file
        });
    };

    console.log(formData.role);

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setError('');
        // console.log(formData.role);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        // Upload image to imagebb
        const imageFile = formData.image;

        console.log(imageFile);

        const imageUrl = await uploadImage(imageFile);
        console.log(imageUrl);

        const { name, email, image, password, confirmPassword, role } = formData;

        console.log("Image: ", image);

        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill in all registration fields.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image: imageUrl,
            role,
            callbackURL: '/'
        });

        setLoading(false);

        console.log(data, error);

        if (data) {
            toast.success(`Account created as ${role}! Welcome to Fable.`);
            router.push('/');
        } else {
            toast.error(error?.message || 'Registration failed. Please check credentials.');
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await authClient.signIn.social({
            provider: 'google',
        });
    }

    return (
        <div className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-6">

            <div className="space-y-2 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                    <BookOpen className="h-5.5 w-5.5 text-zinc-950 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
                    Create your Fable Account
                </h2>
                <p className="text-xs text-zinc-500">
                    Sign up today and join a global community of original ebook collectors.
                </p>
            </div>

            {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs text-left">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">

                {/* Role Select cards */}
                <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Select Application Role</label>
                    <div className="grid grid-cols-2 gap-4">

                        {/* Reader Role Card */}
                        <button
                            type="button"
                            onClick={() => handleRoleSelect('user')}
                            className={`flex flex-col p-4 rounded-xl border text-left transition duration-200 ${formData.role === 'user'
                                ? 'bg-amber-500/10 border-amber-500/40 animate-pulse-once'
                                : 'bg-zinc-900/30 border-zinc-850 hover:bg-zinc-900/60'
                                }`}
                        >
                            <User className={`w-5 h-5 mb-2 ${formData.role === 'writer' ? 'text-amber-400' : 'text-zinc-500'}`} />
                            <span className="text-sm font-bold text-white">Reader</span>
                            <span className="text-[10.5px] text-zinc-400 leading-normal mt-1">Browse, buy, collect and read original books.</span>
                        </button>

                        {/* Writer Role Card */}
                        <button
                            type="button"
                            onClick={() => handleRoleSelect('writer')}
                            className={`flex flex-col p-4 rounded-xl border text-left transition duration-200 ${formData.role === 'writer'
                                ? 'bg-amber-500/10 border-amber-500/40 animate-pulse-once'
                                : 'bg-zinc-900/30 border-zinc-850 hover:bg-zinc-900/60'
                                }`}
                        >
                            <PenTool className={`w-5 h-5 mb-2 ${formData.role === 'writer' ? 'text-amber-400' : 'text-zinc-500'}`} />
                            <span className="text-sm font-bold text-white">Writer</span>
                            <span className="text-[10.5px] text-zinc-400 leading-normal mt-1">Publish books, track royalties, manage catalog.</span>
                        </button>

                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="reader@fable.com"
                        required
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                {/* Photo URL Field */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageUpload}
                        placeholder="https://i.ibb.co/..."
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="******"
                            required
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">Confirm</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="******"
                            required
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-semibold text-zinc-950 shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    {loading ? (
                        <div className="h-4.5 w-4.5 animate-spin rounded-full border-t-2 border-r-2 border-zinc-950 border-solid" />
                    ) : (
                        <>
                            <span>Create Account</span>
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
                className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-sm font-semibold text-zinc-200 transition flex items-center justify-center gap-2"
            >
                <svg className="h-4 w-4 bg-transparent fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.71 0 3.27.614 4.5 1.636l2.455-2.455C17.482 1.91 15.014 1 12.24 1 6.586 1 2 5.586 2 11.24s4.586 10.24 10.24 10.24c5.905 0 9.818-4.145 9.818-10 0-.6-.055-1.186-.164-1.745H12.24z" />
                </svg>
                <span>Google Authentic Sign Up</span>
            </button>

            {/* Direct login */}
            <div className="text-center pt-2">
                <span className="text-xs text-zinc-500">Already registered? </span>
                <Link href="/login" className="text-xs font-semibold text-amber-500 hover:underline">
                    Sign In Instead
                </Link>
            </div>

        </div>
    );
};

export default RegisterForm;