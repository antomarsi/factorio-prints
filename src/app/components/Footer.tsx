'use client';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaPatreon } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';

export default function Footer () {
    const sizeConfig = {
        size: 24
    };
    const links = [
        { title: 'Chat', to: '/chat', icon: <FaDiscord {...sizeConfig} /> },
        {
            title: 'Contributors',
            to: '/contributors',
            icon: <FaPatreon {...sizeConfig} />
        },
        {
            title: 'Donate',
            link: 'https://www.patreon.com/FactorioBlueprints',
            icon: <FaCircleDollarToSlot {...sizeConfig} />
        }
    ].map<React.ReactNode>((v, i) =>
        v.to ? (
            <Link href={v.to} key={i}>
                {v.icon}
                {v.title}
            </Link>
        ) : (
            <a href={v.link} target='_blank' key={i}>
                {v.icon}
                {v.title}
            </a>
        )
    );

    return (
        <footer className='max-w-full w-full px-4 mx-auto mt-auto mb-0'>
            <div className='footer-bar footer-inner panel'>
                <div className='links text-center w-1/2 mr-4 flex flex-wrap justify-center panel-inset m-0'>
                    {links}
                </div>
                <div className='text-center w-1/2 ml-4 panel-inset m-0 justify-center'>
                    Copyright © 2016 - {new Date().getFullYear()} Factorio
                    Prints
                </div>
            </div>
        </footer>
    );
}
