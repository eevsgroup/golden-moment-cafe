import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: "page" | "content" | "narrow";
}

export function Container({
    children,
    size = "content",
    className = "",
    ...props
}: ContainerProps) {
    const sizeClasses = {
        page: "page-container",
        content: "content-container",
        narrow: "narrow-container",
    };

    return (
        <div className={`${sizeClasses[size]} ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}
