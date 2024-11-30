import Accordion, { AccordionItem } from '../Accordion';
import { PanelInset } from '../Panel';
import tags from '@/assets/tags.json';

export default function SearchSideBar () {
    return (
        <PanelInset id='explorer-sidebar' dark className='mr-3 shrink-0  w-1/4'>
            <h2>Mod</h2>

            <h2>Tags</h2>
            {Object.entries(tags).map(([key, value]) => (
                <Accordion title={key} key={key}>
                    {value.map(v => (
                        <AccordionItem title={v} key={v} />
                    ))}
                </Accordion>
            ))}

            <h2>Entities</h2>
            <h2>Recipes</h2>
            <h2>Versions</h2>
            <h2>Blueprint type</h2>
        </PanelInset>
    );
}
