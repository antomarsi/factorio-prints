import { HeaderLinks } from './HeaderLinks';
import { HeaderDropdown } from './HeaderDropdown';
import repository from '@/repository';

export default async function Header () {
    let user:
        | { displayName: string; description: string; avatar: string }
        | undefined;
    try {
        user = await repository.getUserProfile();
    } catch (err) {}

    return (
        <div className='top-bar'>
            <div className='top-bar-inner'>
                <div className='sites links flex items-center'>
                    <HeaderLinks />
                </div>
                <div className='user-controls links flex items-baseline justify-end'>
                    <HeaderDropdown user={user} />
                </div>
            </div>
        </div>
    );
}
