import Link from 'next/link';
import React, { useMemo } from 'react';

export const HeaderLinks = () => {
    const links = useMemo(() => {
        const routes = [
            {
                title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
                link: '/',
                classname: 'sites-current'
            },
            {
                title: 'Search',
                link: '/search'
            },
            {
                title: 'Create',
                link: '/blueprint/create'
            },
            {
                title: 'About',
                link: '/about'
            }
        ];
        const separateRoutes = routes.map(v => (
            <Link href={v.link} className={v.classname || ''}>
                {v.title}
            </Link>
        ));
        const flattedRoutes = separateRoutes
            .flatMap(x => [<span className='separator blue'>|</span>, x])
            .slice(1);

        return flattedRoutes.map<React.ReactNode>((v, i) => (
            <React.Fragment key={i}>{v}</React.Fragment>
        ));
    }, []);
    return links;
};
