'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { FaDiscord, FaPatreon } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';

export default function Footer () {
    const links = useMemo(() => {
        const links = [
            { title: 'About', to: '/about' },
            {
                title: 'Donate',
                link: 'https://www.patreon.com/FactorioBlueprints'
            }
        ].map<React.ReactNode>((v, i) =>
            v.to ? (
                <Link href={v.to} key={i}>
                    {v.title}
                </Link>
            ) : (
                <a href={v.link} target='_blank' key={i}>
                    {v.title}
                </a>
            )
        );
        const flatLinks = links.flatMap(x => [<span className='separator'>|</span>, x]).slice(1);
        return flatLinks.map((v, i) => <React.Fragment key={i}>{v}</React.Fragment>)
    }, []);

    return (
        <footer>
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
