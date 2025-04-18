import Button from '../Button';
import { PanelInset } from '../Panel';

type BlueprintBookListProps = {
    onClick?: (id: string) => Promise<boolean>;
    selected?: string;
    data: any[]
};

export function BlueprintBookList ({ onClick, selected }: BlueprintBookListProps) {

    const data = [
        {
            
        }
    ]

    return <PanelInset>
        <div>
            <Button green className='w-full shadow-none hover:shadow-none'>this is a test</Button>
            <Button className='shadow-none hover:shadow-none'>this is a test</Button>
            <Button>this is a test</Button>
            <Button>this is a test</Button>
        </div>
    </PanelInset>;
}
