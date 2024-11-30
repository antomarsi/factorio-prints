'use client';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../context/auth-context';
import React, { useContext, useMemo } from 'react';
import {
    FaGear,
    FaFolder,
    FaGithub,
    FaGoogle,
    FaHeart,
    FaRightFromBracket,
    FaUser
} from 'react-icons/fa6';
import Dropdown from './Dropdown';
import Link from 'next/link';
import Button from './Button';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/*
 * Choose between multiple google accounts
 * http://stackoverflow.com/a/40551683/23572
 */
googleProvider.setCustomParameters({ prompt: 'consent select_account' });
githubProvider.setCustomParameters({ prompt: 'consent select_account' });

export default function Header () {
    const { user, authenticate, handleLogout } = useContext(AuthContext);

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
                link: '/create'
            },
            {
                title: 'About',
                link: '/about'
            },
            {
                title: 'Contributors',
                link: '/contributors'
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

    const userDropdown = useMemo(() => {
        if (user) {
            return (
                <Dropdown
                    title={user.displayName || user.email || 'Engineer'}
                    img={user.photoURL}
                    icon={<FaUser size={27} />}
                >
                    {[
                        {
                            title: 'My Favorites',
                            icon: <FaHeart size={16} />,
                            link: '/my-favotires'
                        },
                        {
                            title: 'My Blueprints',
                            icon: <FaFolder size={16} />,
                            link: '/my-blueprints'
                        },
                        {
                            title: 'My Account',
                            icon: <FaGear size={16} />,
                            link: '/account'
                        },
                        {
                            title: 'Sign out',
                            icon: <FaRightFromBracket size={16} />,
                            onClick: handleLogout
                        }
                    ].map((v, i) => (
                        <Button
                            key={i}
                            title={v.title}
                            icon={v.icon}
                            link={v.link}
                            onClick={v.onClick}
                        />
                    ))}
                </Dropdown>
            );
        }
        return (
            <Dropdown title='Log in' icon={<FaUser size={20} />}>
                {[
                    {
                        title: 'Google',
                        icon: <FaGoogle size={16} />,
                        onClick: async () => {
                            await authenticate(googleProvider)
                        }
                    },
                    {
                        title: 'Github',
                        icon: <FaGithub size={16} />,
                        onClick: async () => {
                            await authenticate(githubProvider)
                        }
                    }
                ].map((v, i) => (
                    <Button
                        key={i}
                        title={v.title}
                        icon={v.icon}
                        onClick={v.onClick}
                    />
                ))}
            </Dropdown>
        );
    }, [user]);

    return (
        <div className='top-bar'>
            <div className='top-bar-inner'>
                <div className='sites links flex items-center'>{links}</div>
                <div className='user-controls links flex items-baseline justify-end'>
                    {userDropdown}
                </div>
            </div>
        </div>
    );
}
