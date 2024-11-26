import { Metadata } from 'next';
import React from 'react';
import { Titillium_Web } from 'next/font/google';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthContextProvider } from '@/context/auth-context';

const titilliumWeb = Titillium_Web({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
    description:
        'Find blueprints for the video game Factorio. Share your designs. Search the tags for mining, smelting, and advanced production blueprints.'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <head></head>
            <body className={titilliumWeb.className}>
                <AuthContextProvider>
                    <Header />
                    <main className='px-4'>{children}</main>
                    <Footer />
                </AuthContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
