'use client';

import { FaDiscord, FaGithub, FaPatreon, FaReddit } from 'react-icons/fa6';
import { Panel, PanelInset } from '../components/Panel';
import Button from '../components/Button';
import { useMemo } from 'react';
import Link from 'next/link';

export default function AboutPage () {
    const contributors = [
        'Pepzi',
        'Earthwalker',
        'wisefish',
        'Tomáš Hubka',
        'Clive Blackledge',
        'Howard F.',
        'faunris',
        'ensoniq2k',
        'MercenaryIII',
        'Joel Beland',
        'Riley',
        'Roger Booth',
        'Thomas'
    ];
    const contacts = useMemo(
        () =>
            [
                {
                    icon: <FaDiscord />,
                    title: 'Discord: ',
                    text: 'Server Invitation',
                    href: 'https://discord.com/invite/uvUUw5a9Qc',
                    tooltip: "Go to Discord server"
                },
                {
                    icon: <FaReddit />,
                    title: 'Reddit User: ',
                    text: '/u/FactorioBlueprints',
                    href: 'https://www.reddit.com/user/FactorioBlueprints/',
                    tooltip: "Go to Reddit user"
                },
                {
                    icon: <FaGithub />,
                    title: 'Github Issues: ',
                    text: 'FactorioBlueprints/factorio-prints',
                    href: 'https://github.com/FactorioBlueprints/factorio-prints/issues',
                    tooltip: "Go to Github Issues"
                }
            ].map((v, i) => (
                <li key={i}>
                    {v.icon} {v.title}{' '}
                    <Link target='_blank' href={v.href} title={v.tooltip}>
                        {v.text}
                    </Link>
                </li>
            )),
        []
    );

    return (
        <Panel title='Thank you to our contributors!' className='medium-center'>
            <PanelInset>
                <p className='mb-3'>
                    Factorio blueprints is an unofficial fan-made service and is
                    not operated by, affiliated with, or endorsed by Factorio.
                </p>
                <div className='max-w-[250px]'>
                    <Button
                        title="Go to Pareon"
                        href='https://www.patreon.com/FactorioBlueprints'
                        target='_blank'
                    >
                        <FaPatreon />
                        Factorio Blueprints's Patreon
                    </Button>
                </div>
            </PanelInset>
            <PanelInset title='Contact'>
                <ul className='contact'>
                    {contacts}
                </ul>
            </PanelInset>
            <PanelInset>
                <ul className='contributors'>
                    {contributors.map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
                </ul>
            </PanelInset>
        </Panel>
    );
}
