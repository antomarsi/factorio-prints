import { Metadata } from 'next';
import React from 'react';
import '@/styles/global.scss';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { AuthContextProvider } from '@/context/auth-context';
import { Titillium_Web } from 'next/font/google';

const titillium_web = Titillium_Web({
    variable: '--font-titillium-web',
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
    description:
        'Find blueprints for the video game Factorio. Share your designs. Search the tags for mining, smelting, and advanced production blueprints.'
};

export default function RootLayout ({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className={titillium_web.variable}>
            <body>
                <AuthContextProvider>
                    <Header />
                    <main className='container'>
                        <div className='w-[1200px] max-w-full'>{children}</div>
                    </main>
                    <Footer />
                </AuthContextProvider>
            </body>
        </html>
    );
}
