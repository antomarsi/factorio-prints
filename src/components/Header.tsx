import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../context/auth-context";
import React, { useContext, useMemo } from "react";
import {
    FaClock,
    FaCog,
    FaFolder,
    FaGithub,
    FaGoogle,
    FaHeart,
    FaSearch,
    FaSignOutAlt,
    FaTrophy,
    FaUser,
} from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import Dropdown from "./Dropdown";
import { Link } from "react-router";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/*
 * Choose between multiple google accounts
 * http://stackoverflow.com/a/40551683/23572
 */
googleProvider.setCustomParameters({ prompt: "consent select_account" });
githubProvider.setCustomParameters({ prompt: "consent select_account" });

const Header: React.FC = () => {
    const { user, authenticate, handleLogout } = useContext(AuthContext);

    const links = useMemo(() => {
        const sizeConfig = { size: 27 };
        const routes = [
            {
                title: import.meta.env.VITE_WEBSITE_TITLE,
                link: "/",
                classname: "sites-current",
            },
            {
                title: "Search",
                link: "/search",
                icon: <FaSearch {...sizeConfig} />,
            },
            {
                title: "Most Recent",
                link: "/blueprints",
                icon: <FaClock {...sizeConfig} />,
            },
            {
                title: "Most Favorited",
                link: "/top-favorites",
                icon: <FaTrophy {...sizeConfig} />,
            },
            {
                title: "Create",
                link: "/create",
                icon: <FaSquarePlus {...sizeConfig} />,
            },
        ];

        return routes.map<React.ReactNode>((v, i) => (
            <Link to={v.link} className={v.classname || ""} key={i}>
                {v.icon}
                {v.title}
            </Link>
        ));
    }, []);

    return (
        <div className="bg-black bg-opacity-50 max-w-full p-4 w-auto top-0 pt-0">
            <div className="max-w-7xl px-4 m-auto flex flex-wrap top-bar justify-between">
                <div className="links self-center">{links}</div>
                <div className="links justify-end header-links mt-1 pt-3 gap-1">
                    {user ? (
                        <Dropdown
                            title={user.displayName || user.email || "Engineer"}
                            img={user.photoURL}
                            icon={<FaUser size={27} />}
                            items={[
                                {
                                    title: "My Favorites",
                                    icon: <FaHeart size={27} />,
                                    link: "/my-favotires",
                                },
                                {
                                    title: "My Blueprints",
                                    icon: <FaFolder size={27} />,
                                    link: "/my-blueprints",
                                },
                                {
                                    title: "My Account",
                                    icon: <FaCog size={27} />,
                                    link: "/account",
                                },
                                {
                                    title: "Sign out",
                                    icon: <FaSignOutAlt size={27} />,
                                    onClick: handleLogout,
                                },
                            ]}
                        />
                    ) : (
                        <Dropdown
                            title="Log in"
                            icon={<FaUser size={20} />}
                            items={[
                                {
                                    title: "Google",
                                    icon: <FaGoogle size={15} />,
                                    onClick: async () =>
                                        await authenticate(googleProvider),
                                },
                                {
                                    title: "Github",
                                    icon: <FaGithub size={15} />,
                                    onClick: async () =>
                                        await authenticate(githubProvider),
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
