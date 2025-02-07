"use client"
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Dropdown from "../Dropdown";
import { FaFolder, FaGear, FaGithub, FaGoogle, FaHeart, FaRightFromBracket, FaUser } from "react-icons/fa6";
import Button from "../Button";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/auth-context";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/*
 * Choose between multiple google accounts
 * http://stackoverflow.com/a/40551683/23572
 */
googleProvider.setCustomParameters({ prompt: 'consent select_account' });
githubProvider.setCustomParameters({ prompt: 'consent select_account' });

interface HeaderDropdownProps {
    user?: {
        displayName?: string,
        avatar: string
    }
}

export const HeaderDropdown = ({user}: HeaderDropdownProps) => {

    const { authenticate, handleLogout } = useContext(AuthContext);

    const userDropdown = useMemo(() => {
        if (user) {
            return (
                <Dropdown
                    title={user.displayName || 'Engineer'}
                    img={user.avatar}
                    icon={<FaUser />}
                    className='min-w-[128px]'
                >
                    {[
                        {
                            title: 'My Account',
                            icon: <FaGear size={16} />,
                            link: '/account'
                        },
                        {
                            title: 'My Favorites',
                            icon: <FaHeart size={16} />,
                            link: '/account/my-favorites'
                        },
                        {
                            title: 'My Blueprints',
                            icon: <FaFolder size={16} />,
                            link: '/account/my-blueprints'
                        },
                        {
                            title: 'Sign out',
                            icon: <FaRightFromBracket size={16} />,
                            onClick: handleLogout
                        }
                    ].map((v, i) => (
                        <Button
                            key={i}
                            href={v.link}
                            onClick={v.onClick}
                            className='min-w-[128px]'
                        >
                            {v.icon}
                            {v.title}
                        </Button>
                    ))}
                </Dropdown>
            );
        }

        return (
            <Dropdown
                title='Log in'
                icon={<FaUser />}
                className='min-w-[150px]'
            >
                {[
                    {
                        title: 'Google',
                        icon: <FaGoogle size={16} />,
                        onClick: async () => {
                            await authenticate(googleProvider);
                        }
                    },
                    {
                        title: 'Github',
                        icon: <FaGithub size={16} />,
                        onClick: async () => {
                            await authenticate(githubProvider);
                        }
                    }
                ].map((v, i) => (
                    <Button
                        key={i}
                        onClick={v.onClick}
                        className='min-w-[128px]'
                    >
                        {v.icon}
                        {v.title}
                    </Button>
                ))}
            </Dropdown>
        );
    }, [user]);

    return userDropdown
}