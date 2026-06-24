import LoginForm from '@/components/login/LoginForm';
import React from 'react';

export const metadata = {
    title: "Sign In | Fable"
};

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
            <main className="flex-grow flex items-center justify-center p-4 py-16 relative overflow-hidden" id="login-space">
                <div className="absolute inset-0 radial-blur z-0" />
                <LoginForm />
            </main>
        </div>
    );
};

export default LoginPage;