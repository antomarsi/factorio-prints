'use client';

import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { Panel, PanelInset } from '../components/Panel';
import Button from '../components/Button';

export default function ContributorsPage () {
    const contributors = [
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
    return (
        <Panel title='Thank you to our contributors!' className='medium-center'>
            <PanelInset>
                <p className='mb-2'>
                    Their contributions go toward the significant hosting costs,
                    and help keep this site running.
                </p>
                <p>
                    <Button
                        href='https://www.patreon.com/FactorioBlueprints'
                        target='_blank'
                        green
                        title='patreon.com/FactorioBlueprints'
                    />
                </p>
            </PanelInset>
            <PanelInset>
                <ul>
                    {contributors.map((v, i) => (
                        <li key={i} className='mt-2 text-xl'>
                            {v}
                        </li>
                    ))}
                </ul>
            </PanelInset>
        </Panel>
    );
}
