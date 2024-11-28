"use client";

import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { Panel, PanelInset } from '../components/Panel';

export default function ContributorsPage () {
    const contributors = [
        "discord", "reddit", "github"
    ];
    return (
        <Panel title='Thank you to our contributors!' className='medium-center'>
            <PanelInset>
                <p>
                   Factorio blueprints is an unofficial fan-made service and is not operated by, affiliated with, or endorsed by Factorio.
                </p>
                <p>
                    <a
                        href='https://www.patreon.com/FactorioBlueprints'
                        target='_blank'
                    >
                        <FaCircleDollarToSlot />
                        www.patreon.com/FactorioBlueprints
                    </a>
                </p>
            </PanelInset>
            <PanelInset>
                <ul>
                    {contributors.map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
                </ul>
            </PanelInset>
        </Panel>
    );
}
