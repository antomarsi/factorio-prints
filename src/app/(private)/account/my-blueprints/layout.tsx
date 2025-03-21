import Search from '@/components/Search';
import FilterProvider from '@/context/filter-context';

export default function Layout ({ children }: { children: React.ReactNode }) {
    return (
        <FilterProvider>
            <Search title='My Blueprints'>{children}</Search>
        </FilterProvider>
    );
}
