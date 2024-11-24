import React from "react";
import { Link } from "react-router";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    title?: string;
    squareSm?: boolean;
    green?: boolean | string;
    icon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    dropdownItem?: boolean;
    link?: string;
    active?: boolean
}
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    title,
    icon,
    afterIcon,
    green,
    active,
    link,
    className,
    squareSm,
    dropdownItem,
    onClick,
    ...props
}) => {
    let classes = ["button w-full flex justify-between"];
    if (!dropdownItem) {
        classes.push("items-center");
    }
    if (squareSm) {
        classes.push("square-sm");
    }
    if (green) {
        classes = [green == "right" ? "button-green-right" : "button-green"];
        if (icon) {
            classes.push("flex justify-between")
        }
    }
    if (className) classes.push(className)
        
    if (props.disabled) {
        classes.push("disabled")
    }
    if (active) {
        classes.push("active")
    }

    if (link) {
        return (
            <Link to={link} className={classes.join(" ")}>
                {icon}
                {title}
                {afterIcon}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={classes.join(" ")} {...props}>
            {icon}
            {title}
            {afterIcon}
        </button>
    );
};

export default Button;
